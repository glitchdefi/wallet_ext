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
} from '../../types';
import State from './State';
import { GlitchController } from '../../controllers/GlitchController';
import { createSubscription, unsubscribe } from './subscriptions';

export default class Extension {
  readonly state: State;
  controller: GlitchController;

  constructor(state: State) {
    this.state = state;
  }

  public initController(controller: GlitchController) {
    this.controller = controller;
  }

  // FIXME This looks very much like what we have in accounts
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

  private editAccount(request: RequestAccountEdit): Promise<ResponseWallet> {
    return this.controller.editAccount(request);
  }

  private getAccountBalance(): Promise<ResponseWallet> {
    return this.controller.getBalance();
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

  private getTransactions(
    request: RequestTransactionsGet
  ): Promise<ResponseTransactionsGet> {
    return this.controller.getTransactions(request);
  }

  private getEstimateFee(request: RequestEstimateFeeGet): Promise<string> {
    return this.controller.getEstimateFee(request);
  }

  private getTokenPrice(
    request: RequestTokenPriceGet
  ): Promise<string | number> {
    return this.controller.getTokenPrice(request);
  }

  private resetAppState(): Promise<ResponseWallet> {
    return this.controller.setDefaultAppState();
  }

  // Weird thought, the eslint override is not needed in Tabs
  public async handle<TMessageType extends MessageTypes>(
    id: string,
    type: TMessageType,
    request: RequestTypes[TMessageType],
    port: chrome.runtime.Port
  ): Promise<ResponseType<TMessageType>> {
    switch (type) {
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
      case 'pri(settings.autolock.set)':
        return this.setAutoLock(request as RequestAutoLockSet);
      case 'pri(transactions.list.get)':
        return this.getTransactions(request as RequestTransactionsGet);
      case 'pri(estimate.fee.get)':
        return this.getEstimateFee(request as RequestEstimateFeeGet);
      case 'pri(token.price.get)':
        return this.getTokenPrice(request as RequestTokenPriceGet);
      case 'pri(reset.app.state)':
        return this.resetAppState();

      default:
        throw new Error(`Unable to handle message of type ${type}`);
    }
  }
}