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
import Web3Utils from 'web3-utils';
import isNaN from 'lodash/isNaN';
import type { SubjectInfo } from '@polkadot/ui-keyring/observable/types';
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
import keyring from '@polkadot/ui-keyring';
import { accounts as accountsObservable } from '@polkadot/ui-keyring/observable/accounts';
import { assert, isNumber } from '@polkadot/util';

import { GlitchController } from '../../controllers/GlitchController';
import RequestBytesSign from '../RequestBytesSign';
import RequestExtrinsicSign from '../RequestExtrinsicSign';
import State, { AuthUrls, AUTH_URLS_KEY } from './State';
import { createSubscription, unsubscribe } from './subscriptions';
import { PHISHING_PAGE_REDIRECT } from '../../../constants/messages';
import { canDerive } from '../../../utils/canDerive';
import { withErrorLog } from '../../../utils/withErrorLog';
import { ExtensionStore } from '../localStore';
import { toGLCH } from 'utils/number';

function transformAccounts(
  accounts: SubjectInfo,
  anyType = false,
  url: string
): InjectedAccount[] {
  const splitUrl = url?.split('/');
  const dappUrl = splitUrl?.length ? `${splitUrl[2]}` : '';
  const authString = localStorage.getItem(AUTH_URLS_KEY);
  const authUrls = JSON.parse(authString) as AuthUrls;

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

  constructor(state: State) {
    this.state = state;
    this.localStore = new ExtensionStore();
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

  private accountsList(
    url: string,
    { anyType }: RequestAccountList
  ): InjectedAccount[] {
    return transformAccounts(
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
      (accounts: SubjectInfo): void =>
        cb(transformAccounts(accounts, null, url))
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
    });
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
    } else if (method.method === 'second' && method.section === 'democracy') {
      amount = '100';
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
    );
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
    const url = `${chrome.extension.getURL(
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

    if (type !== 'pub(authorize.tab)') {
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

      default:
        throw new Error(`Unable to handle message of type ${type}`);
    }
  }
}
function anyType(
  accounts: any,
  anyType: any,
  url: string,
  localStore: ExtensionStore
) {
  throw new Error('Function not implemented.');
}
