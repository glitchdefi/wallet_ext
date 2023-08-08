import type {
  InjectedAccount,
  InjectedMetadataKnown,
  MetadataDef,
  ProviderMeta,
} from '@polkadot/extension-inject/types';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { JsonRpcResponse } from '@polkadot/rpc-provider/types';
import type {
  SignerPayloadJSON,
  SignerPayloadRaw,
} from '@polkadot/types/types';
import { ApiPromise } from '@polkadot/api';
import Web3Utils, { numberToHex, toBN } from 'web3-utils';
import isNaN from 'lodash/isNaN';
import type { SubjectInfo } from 'packages/glitch-keyring/observable/types';
import type {
  MessageTypes,
  RequestAccountList,
  RequestAuthorizeTab,
  RequestRpcSend,
  RequestRpcSubscribe,
  RequestRpcUnsubscribe,
  RequestTypes,
  ResponseRpcListProviders,
  ResponseSigning,
  ResponseTypes,
  SubscriptionMessageTypes,
} from '../types';

import { checkIfDenied } from '@polkadot/phishing';
import keyring from 'packages/glitch-keyring';
import { accounts as accountsObservable } from 'packages/glitch-keyring/observable/accounts';
import { assert, isNumber } from '@polkadot/util';

import { GlitchController } from '../../controllers/GlitchController';
import RequestBytesSign from '../RequestBytesSign';
import RequestExtrinsicSign from '../RequestExtrinsicSign';
import State, { AuthUrls, AUTH_URLS_KEY } from './State';
import { createSubscription, unsubscribe } from './subscriptions';
import { PHISHING_PAGE_REDIRECT } from 'constants/messages';
import { canDerive } from 'utils/canDerive';
import { withErrorLog } from 'utils/withErrorLog';
import { ExtensionStore } from '../localStore';
import { toGLCH } from 'utils/number';
import browser from 'webextension-polyfill';
import { ResponseWallet } from 'scripts/types';
import { decodeData } from 'utils/decodeData';
import Transaction from 'scripts/providers/ethereum/libs/transaction';
import { EthereumTransaction } from 'scripts/providers/ethereum/libs/transaction/types';
import { fromBase } from 'utils/strings';
import { GasPriceTypes } from 'scripts/providers/common/types';
import { JSONRPCClient } from 'json-rpc-2.0';

async function transformAccounts(
  accounts: SubjectInfo,
  anyType = false,
  url: string
): Promise<InjectedAccount[]> {
  const splitUrl = url?.split('/');
  const dappUrl = splitUrl?.length ? `${splitUrl[2]}` : '';
  const authString = await browser.storage.local.get([AUTH_URLS_KEY]);
  const authUrls = authString?.[AUTH_URLS_KEY]
    ? (JSON.parse(authString[AUTH_URLS_KEY]) as AuthUrls)
    : {};

  return Object.values(accounts)
    .filter(
      ({ json: { address } }) => authUrls[dappUrl].isAllowed[address] === true
    )
    .filter(({ type }) => (anyType ? true : canDerive(type)))
    .sort(
      (a, b) => (a.json.meta.whenCreated || 0) - (b.json.meta.whenCreated || 0)
    )
    .map(
      ({
        json: {
          address,
          meta: { genesisHash, name },
        },
        type,
      }): InjectedAccount => ({
        address,
        genesisHash,
        name,
        type,
      })
    );
}

export default class Tabs {
  readonly state: State;
  readonly localStore: ExtensionStore;
  controller: GlitchController;
  client: JSONRPCClient;

  constructor(state: State) {
    this.state = state;
    this.localStore = new ExtensionStore();
    this.client = new JSONRPCClient((jsonRPCRequest) =>
      fetch(this.controller.glitchWeb3.networkInfo.evmProvider, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(jsonRPCRequest),
      }).then((response) => {
        if (response.status === 200) {
          return response
            .json()
            .then((jsonRPCResponse) => this.client.receive(jsonRPCResponse));
        }
        if (jsonRPCRequest.id !== undefined) {
          return Promise.reject(new Error(response.statusText));
        }
        return Promise.reject(new Error(`unknown error: ${response.status}`));
      })
    );
  }

  public initController(controller: GlitchController) {
    this.controller = controller;
  }

  private authorize(
    url: string,
    request: RequestAuthorizeTab
  ): Promise<boolean> {
    return this.state.authorizeUrl(url, request);
  }

  private async accountsList(
    url: string,
    { anyType }: RequestAccountList
  ): Promise<InjectedAccount[]> {
    return await transformAccounts(
      accountsObservable.subject.getValue(),
      anyType,
      url
    );
  }

  private accountsSubscribe(
    url: string,
    id: string,
    port: chrome.runtime.Port
  ): boolean {
    const cb = createSubscription<'pub(accounts.subscribe)'>(id, port);
    const subscription = accountsObservable.subject.subscribe(
      async (accounts: SubjectInfo): Promise<void> =>
        cb(await transformAccounts(accounts, null, url))
    );

    port.onDisconnect.addListener((): void => {
      unsubscribe(id);
      subscription.unsubscribe();
    });

    return true;
  }

  private getSigningPair(address: string): KeyringPair {
    const pair = keyring.getPair(address);

    assert(pair, 'Unable to find keypair');

    return pair;
  }

  private bytesSign(
    url: string,
    request: SignerPayloadRaw
  ): Promise<ResponseSigning> {
    const address = request.address;
    const pair = this.getSigningPair(address);

    return this.state.sign(url, new RequestBytesSign(request), {
      address,
      ...pair.meta,
    }) as Promise<ResponseSigning>;
  }

  private async extrinsicSign(
    url: string,
    request: SignerPayloadJSON
  ): Promise<ResponseSigning> {
    const address = request.address;
    const pair = this.getSigningPair(address);
    const api: ApiPromise = this.controller.glitchWeb3.api;

    const { block } = await api.rpc.chain.getBlock(request.blockHash);

    const call = block.registry.createType('Call', request.method);
    const method: any = call.toHuman();
    const args = call.args.map((a) => a.toString());

    let amount: string | number = '0';
    let partialFee: number = 0;

    if (method.method === 'batchAll') {
      const _args = method.args[0][0]?.args;
      amount = toGLCH(_args[1]);
    } else if (
      method.method === 'proposeSpend' ||
      method.method === 'proposeBounty'
    ) {
      amount = Web3Utils.fromWei(args[0]);
    } else if (
      method.method === 'notePreimage' ||
      method.method === 'withdrawUnbonded'
    ) {
      amount = 0;
    } else if (method.method === 'propose' && method.section === 'council') {
      method.args?.map((o: any) => {
        o.args?.map((arg: any) => {
          if (typeof arg === 'string' && arg?.includes('GLCH')) {
            amount = toGLCH(arg);
          }
        });
      });
    } else if (
      (method.method === 'second' && method.section === 'democracy') ||
      (method.method === 'submitCandidacy' &&
        method.section === 'electionsPhragmen')
    ) {
      amount = '100';
    } else if (
      method.method === 'transferAll' &&
      method.section === 'balances'
    ) {
      amount = 'allBalances';
    } else {
      if (args?.length >= 2) {
        amount = !isNaN(Number(args[1])) ? Web3Utils.fromWei(args[1]) : '0';
      } else {
        amount = !isNaN(Number(args[0])) ? Web3Utils.fromWei(args[0]) : '0';
      }
    }

    // Get fees
    const txArgs = call.args.map((a) => a);

    const tx = api.tx[method.section][method.method](...txArgs);
    const paymentInfo = (await tx.paymentInfo(address)).toHuman();
    partialFee = toGLCH(paymentInfo?.partialFee?.toString());

    return this.state.sign(
      url,
      new RequestExtrinsicSign({
        ...request,
        amount,
        fee: partialFee?.toFixed(9),
      }),
      {
        address,
        ...pair.meta,
      }
    ) as Promise<ResponseSigning>;
  }

  private metadataProvide(url: string, request: MetadataDef): Promise<boolean> {
    return this.state.injectMetadata(url, request);
  }

  private metadataList(url: string): InjectedMetadataKnown[] {
    return this.state.knownMetadata.map(({ genesisHash, specVersion }) => ({
      genesisHash,
      specVersion,
    }));
  }

  private rpcListProviders(): Promise<ResponseRpcListProviders> {
    return this.state.rpcListProviders();
  }

  private rpcSend(
    request: RequestRpcSend,
    port: chrome.runtime.Port
  ): Promise<JsonRpcResponse> {
    return this.state.rpcSend(request, port);
  }

  private rpcStartProvider(
    key: string,
    port: chrome.runtime.Port
  ): Promise<ProviderMeta> {
    return this.state.rpcStartProvider(key, port);
  }

  private async rpcSubscribe(
    request: RequestRpcSubscribe,
    id: string,
    port: chrome.runtime.Port
  ): Promise<boolean> {
    const innerCb = createSubscription<'pub(rpc.subscribe)'>(id, port);
    const cb = (
      _error: Error | null,
      data: SubscriptionMessageTypes['pub(rpc.subscribe)']
    ): void => innerCb(data);
    const subscriptionId = await this.state.rpcSubscribe(request, cb, port);

    port.onDisconnect.addListener((): void => {
      unsubscribe(id);
      withErrorLog(() =>
        this.rpcUnsubscribe({ ...request, subscriptionId }, port)
      );
    });

    return true;
  }

  private rpcSubscribeConnected(
    request: null,
    id: string,
    port: chrome.runtime.Port
  ): Promise<boolean> {
    const innerCb = createSubscription<'pub(rpc.subscribeConnected)'>(id, port);
    const cb = (
      _error: Error | null,
      data: SubscriptionMessageTypes['pub(rpc.subscribeConnected)']
    ): void => innerCb(data);

    this.state.rpcSubscribeConnected(request, cb, port);

    port.onDisconnect.addListener((): void => {
      unsubscribe(id);
    });

    return Promise.resolve(true);
  }

  private async rpcUnsubscribe(
    request: RequestRpcUnsubscribe,
    port: chrome.runtime.Port
  ): Promise<boolean> {
    return this.state.rpcUnsubscribe(request, port);
  }

  private redirectPhishingLanding(phishingWebsite: string): void {
    const nonFragment = phishingWebsite.split('#')[0];
    const encodedWebsite = encodeURIComponent(nonFragment);
    const url = `${browser.runtime.getURL(
      'index.html'
    )}#${PHISHING_PAGE_REDIRECT}/${encodedWebsite}`;

    chrome.tabs.query({ url: nonFragment }, (tabs) => {
      tabs
        .map(({ id }) => id)
        .filter((id): id is number => isNumber(id))
        .forEach((id) => withErrorLog(() => chrome.tabs.update(id, { url })));
    });
  }

  private async redirectIfPhishing(url: string): Promise<boolean> {
    const isInDenyList = await checkIfDenied(url);

    if (isInDenyList) {
      this.redirectPhishingLanding(url);

      return true;
    }

    return false;
  }

  private async evmClientRequest(request): Promise<number> {
    const { method, params } = request || {};
    return new Promise((resolve, reject) => {
      try {
        this.client.request(method, params).then(resolve, resolve);
      } catch (error) {
        // TODO
      }
    });
  }

  private async getEthAccounts(url: string): Promise<string[]> {
    const origin = this.state.stripUrl(url);

    await this.authorize(url, { origin });

    const { accounts, selectedAddress }: ResponseWallet =
      await this.localStore.get('wallet');

    if (!accounts[selectedAddress].allowedUrls?.includes(origin)) {
      throw new Error('Current account is not allowed');
    }

    return [accounts[selectedAddress].evmAddress];
  }

  private async requestEthAccounts(url: string): Promise<string[]> {
    const origin = this.state.stripUrl(url);

    await this.authorize(url, {
      origin,
    });

    const { accounts, selectedAddress }: ResponseWallet =
      await this.localStore.get('wallet');

    if (!accounts[selectedAddress].allowedUrls?.includes(origin)) {
      throw new Error('Current account is not allowed');
    }

    return [accounts[selectedAddress].evmAddress];
  }

  private async evmSignTransaction(url: string, request: any): Promise<string> {
    const { params } = request || {};

    if (!params?.length) {
      throw new Error('An error has occurred');
    }

    const { selectedAddress }: ResponseWallet = await this.localStore.get(
      'wallet'
    );

    const pair = this.getSigningPair(selectedAddress);
    const decodedData = decodeData(
      this.controller.glitchWeb3.web3,
      params[0].data
    );
    const tx = new Transaction(
      params[0] as EthereumTransaction,
      this.controller.glitchWeb3.web3
    );

    const gasVals = await tx.getGasCosts();
    const estimatedFee = fromBase(gasVals[GasPriceTypes.REGULAR], 18);

    return this.state.sign(
      url,
      new RequestExtrinsicSign({
        ...params[0],
        chainId: numberToHex(2160),
        decodedData,
        estimatedFee,
      }),
      {
        address: selectedAddress,
        ...pair.meta,
      }
    ) as Promise<string>;
  }

  private async evmSignTypedData(url: string, request: any): Promise<string> {
    const { method, params } = request || {};

    const supportedMethods: Record<string, string> = {
      eth_signTypedData: 'V1',
      eth_signTypedData_v1: 'V1',
      eth_signTypedData_v3: 'V3',
      eth_signTypedData_v4: 'V4',
    };

    if (!Object.keys(supportedMethods).includes(method)) return;

    if (!params || params.length < 2) {
      throw new Error('eth_signTypedData: invalid params');
    }

    const version = supportedMethods[method as string];
    const typedData = version === 'V1' ? params[0] : params[1];
    const address = version === 'V1' ? params[1] : params[0];
    const typedDataJSON = version !== 'V1' ? JSON.parse(typedData) : typedData;

    if (
      typedDataJSON.domain &&
      typedDataJSON.domain.chainId &&
      !toBN(typedDataJSON.domain.chainId).eq(toBN(2160))
    )
      throw new Error(
        `eth_signTypedData: Provided chainId ${
          typedDataJSON.domain.chainId
        } must match the active chainId ${toBN(2160).toString()}`
      );

    const { selectedAddress }: ResponseWallet = await this.localStore.get(
      'wallet'
    );

    const pair = this.getSigningPair(selectedAddress);

    return this.state.sign(
      url,
      new RequestExtrinsicSign({
        typedDataJSON,
        version,
      } as any),
      {
        address: pair.address,
        ...pair.meta,
      }
    ) as Promise<string>;
  }

  public async handle<TMessageType extends MessageTypes>(
    id: string,
    type: TMessageType,
    request: RequestTypes[TMessageType],
    url: string,
    port: chrome.runtime.Port
  ): Promise<ResponseTypes[keyof ResponseTypes]> {
    if (type === 'pub(phishing.redirectIfDenied)') {
      return this.redirectIfPhishing(url);
    }

    if (type !== 'pub(authorize.tab)' && !type.includes('evm')) {
      this.state.ensureUrlAuthorized(url, request as { address?: string });
    }

    switch (type) {
      case 'pub(authorize.tab)':
        return this.authorize(url, request as RequestAuthorizeTab);

      case 'pub(accounts.list)':
        return this.accountsList(url, request as RequestAccountList);

      case 'pub(accounts.subscribe)':
        return this.accountsSubscribe(url, id, port);

      case 'pub(bytes.sign)':
        return this.bytesSign(url, request as SignerPayloadRaw);

      case 'pub(extrinsic.sign)':
        return await this.extrinsicSign(url, request as SignerPayloadJSON);

      case 'pub(metadata.list)':
        return this.metadataList(url);

      case 'pub(metadata.provide)':
        return this.metadataProvide(url, request as MetadataDef);

      case 'pub(rpc.listProviders)':
        return this.rpcListProviders();

      case 'pub(rpc.send)':
        return this.rpcSend(request as RequestRpcSend, port);

      case 'pub(rpc.startProvider)':
        return this.rpcStartProvider(request as string, port);

      case 'pub(rpc.subscribe)':
        return this.rpcSubscribe(request as RequestRpcSubscribe, id, port);

      case 'pub(rpc.subscribeConnected)':
        return this.rpcSubscribeConnected(request as null, id, port);

      case 'pub(rpc.unsubscribe)':
        return this.rpcUnsubscribe(request as RequestRpcUnsubscribe, port);

      // Evm

      case 'pub(evm.eth_accounts)':
        return this.getEthAccounts(url);

      case 'pub(evm.eth_requestAccounts)':
        return this.requestEthAccounts(url);

      case 'pub(evm.eth_sendTransaction)':
        return this.evmSignTransaction(url, request);

      case 'pub(evm.eth_signTypedData)':
        return this.evmSignTypedData(url, request);

      case 'pub(evm.eth_clientRequest)':
        return this.evmClientRequest(request);

      default:
        throw new Error(`Unable to handle message of type ${type}`);
    }
  }
}
