import type {
  MessageTypes,
  RequestTypes,
  RequestWalletCreate,
  ResponseWallet,
  ResponseType,
  RequestWalletRestore,
  AuthorizeRequest,
  RequestWalletValidate,
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
    return this.controller.createAccount(request);
  }

  private createWalletCompleted(): Promise<ResponseWallet> {
    return this.controller.createWalletCompleted();
  }

  private restoreWallet(
    request: RequestWalletRestore
  ): Promise<ResponseWallet> {
    return this.controller.restoreWallet(request);
  }

  private unlockWallet(): Promise<ResponseWallet> {
    return this.controller.unlockWallet();
  }

  private walletValidate(request: RequestWalletValidate): Promise<boolean> {
    return this.controller.walletValidate(request);
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
      case 'pri(wallet.unlock)':
        return this.unlockWallet();
      case 'pri(wallet.validate)':
        return this.walletValidate(request as RequestWalletValidate);
      case 'pri(reset.app.state)':
        return this.resetAppState();

      default:
        throw new Error(`Unable to handle message of type ${type}`);
    }
  }
}
