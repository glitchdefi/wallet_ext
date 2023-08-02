import type { InjectedAccount } from '@polkadot/extension-inject/types';
import type { SubjectInfo } from 'packages/glitch-keyring/observable/types';
import type {
  MessageTypes,
  RequestAccountList,
  RequestAuthorizeTab,
  RequestTypes,
  ResponseTypes,
} from '../types';

import { accounts as accountsObservable } from 'packages/glitch-keyring/observable/accounts';

import { GlitchController } from '../../controllers/GlitchController';
import State, { AuthUrls, AUTH_URLS_KEY } from './State';
import { canDerive } from 'utils/canDerive';
import { ExtensionStore } from '../localStore';
import browser from 'webextension-polyfill';

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

  public async handle<TMessageType extends MessageTypes>(
    id: string,
    type: TMessageType,
    request: RequestTypes[TMessageType],
    url: string,
    port: chrome.runtime.Port
  ): Promise<ResponseTypes[keyof ResponseTypes]> {
    switch (type) {
      case 'pub(authorize.tab)':
        return this.authorize(url, request as RequestAuthorizeTab);

      case 'pub(accounts.list)':
        return this.accountsList(url, request as RequestAccountList);

      default:
        throw new Error(`Unable to handle message of type ${type}`);
    }
  }
}
