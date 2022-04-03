import type {
  InjectedAccount,
  InjectedAccounts,
  Unsubcall,
} from '@polkadot/extension-inject/types';

// External to class, this.# is not private enough (yet)
let sendRequest: any;

export default class Accounts implements InjectedAccounts {
  constructor(_sendRequest: any) {
    sendRequest = _sendRequest;
  }

  public get(anyType?: boolean): Promise<InjectedAccount[]> {
    return sendRequest('pub(accounts.list)', { anyType });
  }

  public subscribe(cb: (accounts: InjectedAccount[]) => unknown): Unsubcall {
    sendRequest('pub(accounts.subscribe)', null, cb).catch((error: Error) =>
      console.error(error)
    );

    return (): void => {
      // FIXME we need the ability to unsubscribe
    };
  }
}
