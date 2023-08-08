import type {
  MessageTypes,
  RequestTypes,
  RequestWalletCreate,
  ResponseWallet,
  ResponseType,
  RequestWalletRestore,
  AuthorizeRequest,
  RequestWalletValidate,
  RequestAccountCreate,
  RequestAccountImport,
  RequestPrivatekeyValidate,
  RequestAccountChange,
  ResponseAppStore,
  RequestAutoLockSet,
  ResponseSettings,
  RequestAccountEdit,
  RequestEstimateFeeGet,
  RequestAccountTransfer,
  RequestAuthorizeApprove,
  RequestAuthorizeReject,
  ResponseAuthorizeList,
  RequestAccountForget,
  SigningRequest,
  RequestSigningApproveSignature,
  RequestSigningCancel,
  RequestSigningApprove,
  AllowedPath,
  RequestUpdateWalletStorage,
  RequestAuthorizeToggle,
  RequestNetworkSet,
  RequestAccountClaimEvmBalance,
  RequestIsEvmClaimed,
  RequestUpdateAccountAvatar,
  ResponsePrivatekeyGet,
  ResponsePrivatekeyValidate,
  RequestEvmSigningApprove,
  RequestEvmSignTypedData,
} from '../../types';
import keyring from 'packages/glitch-keyring';
import { TypeRegistry } from '@polkadot/types';
import type {
  SignerPayloadJSON,
  SignerPayloadRaw,
} from '@polkadot/types/types';
import State from './State';
import { GlitchController } from '../../controllers/GlitchController';
import { createSubscription, unsubscribe } from './subscriptions';
import { assert } from '@polkadot/util';
import { MetadataDef } from '@polkadot/extension-inject/types';
import { withErrorLog } from 'utils/withErrorLog';
import browser from 'webextension-polyfill';
import Transaction from 'scripts/providers/ethereum/libs/transaction';
import { EthereumTransaction } from 'scripts/providers/ethereum/libs/transaction/types';
import { GasPriceTypes } from 'scripts/providers/common/types';
import { bufferToHex, decryptMessage, hexToBuffer } from 'utils/strings';
import { ecsign, fromRpcSig, toRpcSig } from 'ethereumjs-util';
import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx';
import { getCustomError } from 'scripts/providers/ethereum/libs/getError';
import {
  SignTypedDataVersion,
  TypedDataUtils,
  typedSignatureHash,
} from '@metamask/eth-sig-util';

function isJsonPayload(
  value: SignerPayloadJSON | SignerPayloadRaw
): value is SignerPayloadJSON {
  return (value as SignerPayloadJSON).genesisHash !== undefined;
}

// a global registry to use internally
const registry = new TypeRegistry();

export default class Extension {
  readonly state: State;
  controller: GlitchController;

  constructor(state: State) {
    this.state = state;
  }

  public initController(controller: GlitchController) {
    this.controller = controller;
  }

  private authorizeApprove({ id }: RequestAuthorizeApprove): boolean {
    const queued = this.state.getAuthRequest(id);

    assert(queued, 'Unable to find request');

    const { resolve } = queued;

    resolve(true);

    return true;
  }

  private getAuthList(): ResponseAuthorizeList {
    return { list: this.state.authUrls };
  }

  private authorizeReject({ id }: RequestAuthorizeReject): boolean {
    const queued = this.state.getAuthRequest(id);

    assert(queued, 'Unable to find request');

    const { reject } = queued;

    reject(new Error('Rejected'));

    return true;
  }

  private async toggleAuthorization(
    request: RequestAuthorizeToggle
  ): Promise<ResponseAuthorizeList> {
    return { list: await this.state.toggleAuthorization(request) };
  }

  private async removeAuthorization(
    url: string
  ): Promise<ResponseAuthorizeList> {
    const authUrls = await this.state.removeAuthorization(url);
    return { list: authUrls };
  }

  private authorizeSubscribe(id: string, port: chrome.runtime.Port): boolean {
    const cb = createSubscription<'pri(authorize.requests)'>(id, port);
    const subscription = this.state.authSubject.subscribe(
      (requests: AuthorizeRequest[]): void => cb(requests)
    );

    port.onDisconnect.addListener((): void => {
      unsubscribe(id);
      subscription.unsubscribe();
    });

    return true;
  }

  private signingSubscribe(id: string, port: chrome.runtime.Port): boolean {
    const cb = createSubscription<'pri(signing.requests)'>(id, port);
    const subscription = this.state.signSubject.subscribe(
      (requests: SigningRequest[]): void => cb(requests)
    );

    port.onDisconnect.addListener((): void => {
      unsubscribe(id);
      subscription.unsubscribe();
    });

    return true;
  }

  private signingApprove({ id }: RequestSigningApprove): boolean {
    const queued = this.state.getSignRequest(id);

    assert(queued, 'Unable to find request');

    const { request, resolve } = queued;
    const pair = keyring.getPair(queued.account.address);
    pair?.isLocked && pair.unlock();

    const { payload } = request;

    if (isJsonPayload(payload)) {
      // Get the metadata for the genesisHash
      const currentMetadata = this.state.knownMetadata.find(
        (meta: MetadataDef) => meta.genesisHash === payload.genesisHash
      );

      // set the registry before calling the sign function
      registry.setSignedExtensions(
        payload.signedExtensions,
        currentMetadata?.userExtensions
      );

      if (currentMetadata) {
        registry.register(currentMetadata?.types);
      }
    }

    const result = request.sign(registry, pair);

    resolve({
      id,
      ...result,
    });

    return true;
  }

  private signingApproveSignature({
    id,
    signature,
  }: RequestSigningApproveSignature): boolean {
    const queued = this.state.getSignRequest(id);

    assert(queued, 'Unable to find request');

    const { resolve } = queued;

    resolve({ id, signature });

    return true;
  }

  private signingCancel({ id }: RequestSigningCancel): boolean {
    const queued = this.state.getSignRequest(id);

    assert(queued, 'Unable to find request');

    const { reject } = queued;

    reject(new Error('Cancelled'));

    return true;
  }

  private createWallet(request: RequestWalletCreate): Promise<ResponseWallet> {
    return this.controller.createWallet(request);
  }

  private createWalletCompleted(): Promise<ResponseWallet> {
    return this.controller.createWalletCompleted();
  }

  private restoreWallet(
    request: RequestWalletRestore
  ): Promise<ResponseWallet> {
    return this.controller.restoreWallet(request);
  }

  private lockWallet(): Promise<ResponseWallet> {
    return this.controller.lockWallet();
  }

  private unlockWallet(): Promise<ResponseWallet> {
    return this.controller.unlockWallet();
  }

  private logoutWallet(): Promise<ResponseAppStore> {
    return this.controller.logoutWallet();
  }

  private backupWallet(): Promise<ResponseWallet> {
    return this.controller.backupWallet();
  }

  private walletValidate(request: RequestWalletValidate): Promise<boolean> {
    return this.controller.walletValidate(request);
  }

  private showWalletSeed(): Promise<string> {
    return this.controller.showWalletSeed();
  }

  private createAccount(
    request: RequestAccountCreate
  ): Promise<ResponseWallet> {
    return this.controller.createAccount(request);
  }

  private importAccount(
    request: RequestAccountImport
  ): Promise<ResponseWallet> {
    return this.controller.importAccount(request);
  }

  private changeAccount(
    request: RequestAccountChange
  ): Promise<ResponseWallet> {
    return this.controller.changeAccount(request);
  }

  private async accountsForget({
    address,
  }: RequestAccountForget): Promise<boolean> {
    await keyring.forgetAccount(address);
    return true;
  }

  private editAccount(request: RequestAccountEdit): Promise<ResponseWallet> {
    return this.controller.editAccount(request);
  }

  private updateAccountAvatar(
    request: RequestUpdateAccountAvatar
  ): Promise<ResponseWallet> {
    return this.controller.updateAccountAvatar(request);
  }

  private getAccountBalance(): Promise<ResponseWallet> {
    return this.controller.getBalance();
  }

  private claimEvmBalance(
    request: RequestAccountClaimEvmBalance
  ): Promise<boolean> {
    return this.controller.claimEvmAccount(request);
  }

  private isEvmClaimed(request: RequestIsEvmClaimed): Promise<boolean> {
    return this.controller.isEvmClaimed(request);
  }

  private privateKeyValidate(
    request: RequestPrivatekeyValidate
  ): Promise<ResponsePrivatekeyValidate> {
    return this.controller.privateKeyValidate(request);
  }

  private showAccountPrivateKey(): Promise<ResponsePrivatekeyGet> {
    return this.controller.showAccountPrivateKey();
  }

  private setAutoLock(request: RequestAutoLockSet): Promise<ResponseSettings> {
    return this.controller.setAutoLockTimer(request);
  }

  private setNetwork(request: RequestNetworkSet): Promise<ResponseSettings> {
    return this.controller.setNetwork(request);
  }

  private getEstimateFee(request: RequestEstimateFeeGet): Promise<string> {
    return this.controller.getEstimateFee(request);
  }

  private async transfer(
    request: RequestAccountTransfer,
    id: string,
    port: chrome.runtime.Port
  ): Promise<any> {
    await this.controller.transfer(
      request,
      // Failed
      (msg: string) => {
        port.postMessage({ id, response: { success: false, message: msg } });
      },
      // Success
      () => {
        port.postMessage({ id, response: { success: true, message: null } });
      }
    );

    return Promise.resolve('pending');
  }

  private windowOpen(path: AllowedPath): boolean {
    const url = `${browser.runtime.getURL('popup.html')}#${path}`;

    // if (!ALLOWED_PATH.includes(path)) {
    //   console.error('Not allowed to open the url:', url);

    //   return false;
    // }

    withErrorLog(() => chrome.tabs.create({ url }));

    return true;
  }

  private resetAppState(): Promise<ResponseWallet> {
    return this.controller.setDefaultAppState();
  }

  private updateWalletStorage(
    request: RequestUpdateWalletStorage
  ): Promise<ResponseWallet> {
    return this.controller.updateWalletStorage(request);
  }

  // EVM
  private async evmSigningApprove({
    id,
  }: RequestEvmSigningApprove): Promise<boolean> {
    const queued = this.state.getSignRequest(id);

    assert(queued, 'Unable to find request');

    const { request, resolve, reject } = queued;
    const pair = keyring.getPair(queued.account.address);
    pair?.isLocked && pair.unlock();

    let privateKey: string = null;
    const oldAccounts = await this.controller.appStateController.getAccounts();
    const currentAccount = oldAccounts[pair.address];

    const { seed, encryptedEvmPk, encryptedSubstratePk, evmAddress } =
      currentAccount;

    if (seed) {
      const decryptSeed = (await decryptMessage(
        seed.encrypted,
        seed.secret
      )) as string;

      privateKey =
        this.controller.glitchWeb3.getPrivateKeyFromSeed(decryptSeed)?.evm;
    }

    if (encryptedEvmPk && encryptedSubstratePk) {
      privateKey = this.controller.glitchWeb3.web3.accounts.decrypt(
        JSON.parse(encryptedEvmPk),
        evmAddress
      )?.privateKey;
    }

    const { payload } = request;

    const tx = new Transaction(
      payload as unknown as EthereumTransaction,
      this.controller.glitchWeb3.web3
    );

    const finalizedTx = await tx.getFinalizedTransaction({
      gasPriceType: GasPriceTypes.REGULAR,
    });

    const msgHash = bufferToHex(finalizedTx.getMessageToSign(true));
    const msgHashBuffer = hexToBuffer(msgHash);
    const privateKeyBuffer = hexToBuffer(privateKey);
    const signature = ecsign(msgHashBuffer, privateKeyBuffer);
    const rpcSig = fromRpcSig(toRpcSig(signature.v, signature.r, signature.s));
    const signedTx = (
      finalizedTx as FeeMarketEIP1559Transaction
    )._processSignature(BigInt(rpcSig.v), rpcSig.r, rpcSig.s);

    const signedTxToHex = '0x' + signedTx.serialize().toString('hex');

    return new Promise<boolean>(async (_resolve, _reject) => {
      await this.controller.glitchWeb3.web3
        .sendSignedTransaction(signedTxToHex)
        .on('transactionHash', (hash) => {
          resolve(hash as string);
          _resolve(true);
        })
        .on('error', (error) => {
          _reject(false);
          reject(getCustomError(error.message) as any);
        });
    });
  }

  private async evmSignTypedData({
    id,
  }: RequestEvmSignTypedData): Promise<any> {
    const queued = this.state.getSignRequest(id);

    assert(queued, 'Unable to find request');

    const { request, resolve, reject } = queued;
    const pair = keyring.getPair(queued.account.address);
    pair?.isLocked && pair.unlock();

    let privateKey: string = null;
    const oldAccounts = await this.controller.appStateController.getAccounts();
    const currentAccount = oldAccounts[pair.address];

    const { seed, encryptedEvmPk, encryptedSubstratePk, evmAddress } =
      currentAccount;

    if (seed) {
      const decryptSeed = (await decryptMessage(
        seed.encrypted,
        seed.secret
      )) as string;

      privateKey =
        this.controller.glitchWeb3.getPrivateKeyFromSeed(decryptSeed)?.evm;
    }

    if (encryptedEvmPk && encryptedSubstratePk) {
      privateKey = this.controller.glitchWeb3.web3.accounts.decrypt(
        JSON.parse(encryptedEvmPk),
        evmAddress
      )?.privateKey;
    }

    const {
      payload: { typedDataJSON, version },
    } = request as any;

    let msgHash: string = '';

    if (version === SignTypedDataVersion.V1) {
      msgHash = typedSignatureHash(typedDataJSON);
    } else {
      msgHash = bufferToHex(TypedDataUtils.eip712Hash(typedDataJSON, version));
    }

    const msgHashBuffer = hexToBuffer(msgHash);
    const privateKeyBuffer = hexToBuffer(privateKey);
    const signature = ecsign(msgHashBuffer, privateKeyBuffer);
    const rpcSig = toRpcSig(signature.v, signature.r, signature.s);

    return new Promise<boolean>(async (_resolve, _reject) => {
      resolve(rpcSig as string);
      _resolve(true);
    });
  }

  // Weird thought, the eslint override is not needed in Tabs
  public async handle<TMessageType extends MessageTypes>(
    id: string,
    type: TMessageType,
    request: RequestTypes[TMessageType],
    port: chrome.runtime.Port
  ): Promise<ResponseType<TMessageType>> {
    switch (type) {
      case 'pri(authorize.approve)':
        return this.authorizeApprove(request as RequestAuthorizeApprove);

      case 'pri(authorize.list)':
        return this.getAuthList();

      case 'pri(authorize.reject)':
        return this.authorizeReject(request as RequestAuthorizeReject);

      case 'pri(authorize.toggle)':
        return this.toggleAuthorization(request as RequestAuthorizeToggle);

      case 'pri(authorize.remove)':
        return this.removeAuthorization(request as string);

      case 'pri(authorize.requests)':
        return this.authorizeSubscribe(id, port);

      case 'pri(wallet.create)':
        return this.createWallet(request as RequestWalletCreate);

      case 'pri(wallet.create.completed)':
        return this.createWalletCompleted();

      case 'pri(wallet.restore)':
        return this.restoreWallet(request as RequestWalletRestore);

      case 'pri(wallet.lock)':
        return this.lockWallet();

      case 'pri(wallet.unlock)':
        return this.unlockWallet();

      case 'pri(wallet.logout)':
        return this.logoutWallet();

      case 'pri(wallet.backup)':
        return this.backupWallet();

      case 'pri(wallet.validate)':
        return this.walletValidate(request as RequestWalletValidate);

      case 'pri(wallet.seed.show)':
        return this.showWalletSeed();

      case 'pri(wallet.account.create)':
        return this.createAccount(request as RequestAccountCreate);

      case 'pri(wallet.account.import)':
        return this.importAccount(request as RequestAccountImport);

      case 'pri(wallet.account.change)':
        return this.changeAccount(request as RequestAccountChange);

      case 'pri(wallet.account.edit)':
        return this.editAccount(request as RequestAccountEdit);

      case 'pri(wallet.account.updateAvatar)':
        return this.updateAccountAvatar(request as RequestUpdateAccountAvatar);

      case 'pri(wallet.account.balance.get)':
        return this.getAccountBalance();

      case 'pri(wallet.account.privatekey.validate)':
        return this.privateKeyValidate(request as RequestPrivatekeyValidate);

      case 'pri(wallet.account.privatekey.show)':
        return this.showAccountPrivateKey();

      case 'pri(wallet.account.transfer)':
        return this.transfer(request as RequestAccountTransfer, id, port);

      case 'pri(wallet.account.forget)':
        return this.accountsForget(request as RequestAccountForget);

      case 'pri(wallet.account.claimEvmBalance)':
        return this.claimEvmBalance(request as RequestAccountClaimEvmBalance);

      case 'pri(wallet.account.isEvmClaimed)':
        return this.isEvmClaimed(request as RequestIsEvmClaimed);

      case 'pri(settings.autolock.set)':
        return this.setAutoLock(request as RequestAutoLockSet);

      case 'pri(settings.network.set)':
        return this.setNetwork(request as RequestNetworkSet);

      case 'pri(estimate.fee.get)':
        return this.getEstimateFee(request as RequestEstimateFeeGet);

      case 'pri(reset.app.state)':
        return this.resetAppState();

      case 'pri(update.wallet.storage)':
        return this.updateWalletStorage(request as RequestUpdateWalletStorage);

      case 'pri(signing.requests)':
        return this.signingSubscribe(id, port);

      case 'pri(signing.approve.signature)':
        return this.signingApproveSignature(
          request as RequestSigningApproveSignature
        );

      case 'pri(signing.approve)':
        return this.signingApprove(request as RequestSigningApprove);

      case 'pri(signing.cancel)':
        return this.signingCancel(request as RequestSigningCancel);

      case 'pri(window.open)':
        return this.windowOpen(request as AllowedPath);

      case 'pri(evm.signing.approve)':
        return this.evmSigningApprove(request as RequestEvmSigningApprove);

      case 'pri(evm.sign.typedData)':
        return this.evmSignTypedData(request as RequestEvmSignTypedData);

      default:
        throw new Error(`Unable to handle message of type ${type}`);
    }
  }
}
