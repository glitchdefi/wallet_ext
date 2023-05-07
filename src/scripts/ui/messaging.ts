import type {
  MessageTypesWithNullRequest,
  MessageTypesWithNoSubscriptions,
  MessageTypesWithSubscriptions,
  SubscriptionMessageTypes,
  MessageTypes,
  RequestTypes,
  ResponseTypes,
  ResponseWallet,
  RequestWalletRestore,
  RequestWalletCreate,
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
  ResponseAccountTransfer,
  ResponseAuthorizeList,
  SigningRequest,
  RequestAccountForget,
  AllowedPath,
  RequestUpdateWalletStorage,
  RequestAuthorizeToggle,
  RequestNetworkSet,
  RequestAccountClaimEvmBalance,
  RequestIsEvmClaimed,
} from '../types';
import type { Message } from '../types/Message';

import { PORT_EXTENSION } from 'constants/messages';
import { getId } from 'utils/getId';
import { HexString } from '@polkadot/util/types';

interface Handler {
  resolve: (data: any) => void;
  reject: (error: Error) => void;
  subscriber?: (data: any) => void;
}

type Handlers = Record<string, Handler>;

const port = chrome.runtime.connect({ name: PORT_EXTENSION });
const handlers: Handlers = {};

// setup a listener for messages, any incoming resolves the promise
port.onMessage.addListener((data: Message['data']): void => {
  const handler = handlers[data.id];

  if (!handler) {
    console.error(`Unknown response: ${JSON.stringify(data)}`);

    return;
  }

  if (!handler.subscriber) {
    delete handlers[data.id];
  }

  if (data.subscription) {
    (handler.subscriber as Function)(data.subscription);
  } else if (data.error) {
    handler.reject(new Error(data.error));
  } else {
    handler.resolve(data.response);
  }
});

function sendMessage<TMessageType extends MessageTypesWithNullRequest>(
  message: TMessageType
): Promise<ResponseTypes[TMessageType]>;

function sendMessage<TMessageType extends MessageTypesWithNoSubscriptions>(
  message: TMessageType,
  request: RequestTypes[TMessageType]
): Promise<ResponseTypes[TMessageType]>;

function sendMessage<TMessageType extends MessageTypesWithSubscriptions>(
  message: TMessageType,
  request: RequestTypes[TMessageType],
  subscriber: (data: SubscriptionMessageTypes[TMessageType]) => void
): Promise<ResponseTypes[TMessageType]>;

function sendMessage<TMessageType extends MessageTypes>(
  message: TMessageType,
  request?: RequestTypes[TMessageType],
  subscriber?: (data: unknown) => void
): Promise<ResponseTypes[TMessageType]> {
  return new Promise((resolve, reject): void => {
    const id = getId();

    handlers[id] = { reject, resolve, subscriber };

    port.postMessage({ id, message, request: request || {} });
  });
}

//Authorize
export async function subscribeAuthorizeRequests(
  cb: (accounts: AuthorizeRequest[]) => void
): Promise<boolean> {
  return sendMessage('pri(authorize.requests)', null, cb);
}

export async function approveAuthRequest(id: string): Promise<boolean> {
  return sendMessage('pri(authorize.approve)', { id });
}

export async function rejectAuthRequest(id: string): Promise<boolean> {
  return sendMessage('pri(authorize.reject)', { id });
}

export async function getAuthList(): Promise<ResponseAuthorizeList> {
  return sendMessage('pri(authorize.list)');
}

export async function toggleAuthorization(
  request: RequestAuthorizeToggle
): Promise<ResponseAuthorizeList> {
  return sendMessage('pri(authorize.toggle)', request);
}

export async function removeAuthorization(
  url: string
): Promise<ResponseAuthorizeList> {
  return sendMessage('pri(authorize.remove)', url);
}

// Signin
export async function subscribeSigningRequests(
  cb: (accounts: SigningRequest[]) => void
): Promise<boolean> {
  return sendMessage('pri(signing.requests)', null, cb);
}

export async function approveSignRequest(id: string): Promise<boolean> {
  return sendMessage('pri(signing.approve)', {
    id,
  });
}

export async function cancelSignRequest(id: string): Promise<boolean> {
  return sendMessage('pri(signing.cancel)', { id });
}

export async function approveSignSignature(
  id: string,
  signature: HexString
): Promise<boolean> {
  return sendMessage('pri(signing.approve.signature)', { id, signature });
}

// Wallet
export async function createWallet(
  request: RequestWalletCreate
): Promise<ResponseWallet> {
  return sendMessage('pri(wallet.create)', request);
}

export async function createWalletCompleted(): Promise<ResponseWallet> {
  return sendMessage('pri(wallet.create.completed)');
}

export async function restoreWallet(
  request: RequestWalletRestore
): Promise<ResponseWallet> {
  return sendMessage('pri(wallet.restore)', request);
}

export async function logoutWallet(): Promise<ResponseAppStore> {
  return sendMessage('pri(wallet.logout)');
}

export async function lockWallet(): Promise<ResponseWallet> {
  return sendMessage('pri(wallet.lock)');
}

export async function unlockWallet(): Promise<ResponseWallet> {
  return sendMessage('pri(wallet.unlock)');
}

export async function backupWallet(): Promise<ResponseWallet> {
  return sendMessage('pri(wallet.backup)');
}

export async function walletValidate(
  request: RequestWalletValidate
): Promise<boolean> {
  return sendMessage('pri(wallet.validate)', request);
}

export async function showWalletSeed(): Promise<string> {
  return sendMessage('pri(wallet.seed.show)');
}

// Account
export async function createAccount(
  request: RequestAccountCreate
): Promise<ResponseWallet> {
  return sendMessage('pri(wallet.account.create)', request);
}

export async function importAccount(
  request: RequestAccountImport
): Promise<ResponseWallet> {
  return sendMessage('pri(wallet.account.import)', request);
}

export async function changeAccount(
  request: RequestAccountChange
): Promise<ResponseWallet> {
  return sendMessage('pri(wallet.account.change)', request);
}

export async function editAccount(
  request: RequestAccountEdit
): Promise<ResponseWallet> {
  return sendMessage('pri(wallet.account.edit)', request);
}

export async function getAccountBalance(): Promise<ResponseWallet> {
  return sendMessage('pri(wallet.account.balance.get)');
}

export async function privateKeyValidate(
  request: RequestPrivatekeyValidate
): Promise<boolean> {
  return sendMessage('pri(wallet.account.privatekey.validate)', request);
}

export async function showAccountPrivateKey(): Promise<string> {
  return sendMessage('pri(wallet.account.privatekey.show)');
}

export async function forgetAccount(
  request: RequestAccountForget
): Promise<boolean> {
  return sendMessage('pri(wallet.account.forget)', request);
}

export async function claimEvmAccountBalance(
  request: RequestAccountClaimEvmBalance
): Promise<boolean> {
  return sendMessage('pri(wallet.account.claimEvmBalance)', request);
}

export async function isEvmClaimed(
  request: RequestIsEvmClaimed
): Promise<boolean> {
  return sendMessage('pri(wallet.account.isEvmClaimed)', request);
}

// Settings
export async function setAutoLock(
  request: RequestAutoLockSet
): Promise<ResponseSettings> {
  return sendMessage('pri(settings.autolock.set)', request);
}

export async function setNetwork(
  request: RequestNetworkSet
): Promise<ResponseSettings> {
  return sendMessage('pri(settings.network.set)', request);
}

export async function getEstimateFee(
  request: RequestEstimateFeeGet
): Promise<string> {
  return sendMessage('pri(estimate.fee.get)', request);
}

export async function transfer(
  request: RequestAccountTransfer
): Promise<ResponseAccountTransfer> {
  return sendMessage('pri(wallet.account.transfer)', request);
}

export async function resetAppState(): Promise<ResponseWallet> {
  return sendMessage('pri(reset.app.state)');
}

export async function updateWalletStorage(
  request: RequestUpdateWalletStorage
): Promise<ResponseWallet> {
  return sendMessage('pri(update.wallet.storage)', request);
}

export async function windowOpen(path: AllowedPath): Promise<boolean> {
  return sendMessage('pri(window.open)', path);
}
