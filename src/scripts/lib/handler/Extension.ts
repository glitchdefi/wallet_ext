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
  RequestTransactionsGet,
  ResponseTransactionsGet,
  RequestEstimateFeeGet,
  RequestTokenPriceGet,
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
} from '../../types';
import keyring from '@polkadot/ui-keyring';
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

  private removeAuthorization(url: string): ResponseAuthorizeList {
    return { list: this.state.removeAuthorization(url) };
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

  private accountsForget({ address }: RequestAccountForget): boolean {
    keyring.forgetAccount(address);

    return true;
  }

  private editAccount(request: RequestAccountEdit): Promise<ResponseWallet> {
    return this.controller.editAccount(request);
  }

  private getAccountBalance(): Promise<ResponseWallet> {
    return this.controller.getBalance();
  }

  private claimEvmBalance(
    request: RequestAccountClaimEvmBalance
  ): Promise<ResponseWallet> {
    return this.controller.claimEvmAccount(request);
  }

  private isEvmClaimed(request: RequestIsEvmClaimed): Promise<boolean> {
    return this.controller.isEvmClaimed(request);
  }

  private privateKeyValidate(
    request: RequestPrivatekeyValidate
  ): Promise<boolean> {
    return this.controller.privateKeyValidate(request);
  }

  private showAccountPrivateKey(): Promise<string> {
    return this.controller.showAccountPrivateKey();
  }

  private setAutoLock(request: RequestAutoLockSet): Promise<ResponseSettings> {
    return this.controller.setAutoLockTimer(request);
  }

  private setNetwork(request: RequestNetworkSet): Promise<ResponseSettings> {
    return this.controller.setNetwork(request);
  }

  private getTransactions(
    request: RequestTransactionsGet
  ): Promise<ResponseTransactionsGet> {
    return this.controller.getTransactions(request);
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
    const url = `${chrome.extension.getURL('popup.html')}#${path}`;

    // if (!ALLOWED_PATH.includes(path)) {
    //   console.error('Not allowed to open the url:', url);

    //   return false;
    // }

    withErrorLog(() => chrome.tabs.create({ url }));

    return true;
  }

  private getTokenPrice(
    request: RequestTokenPriceGet
  ): Promise<string | number> {
    return this.controller.getTokenPrice(request);
  }

  private resetAppState(): Promise<ResponseWallet> {
    return this.controller.setDefaultAppState();
  }

  private updateWalletStorage(
    request: RequestUpdateWalletStorage
  ): Promise<ResponseWallet> {
    return this.controller.updateWalletStorage(request);
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

      case 'pri(transactions.list.get)':
        return this.getTransactions(request as RequestTransactionsGet);

      case 'pri(estimate.fee.get)':
        return this.getEstimateFee(request as RequestEstimateFeeGet);

      case 'pri(token.price.get)':
        return this.getTokenPrice(request as RequestTokenPriceGet);

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

      default:
        throw new Error(`Unable to handle message of type ${type}`);
    }
  }
}
