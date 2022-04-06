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
} from '../types';
import type { Message } from '../types/Message';

import { PORT_EXTENSION } from '../../constants/messages';
import { getId } from '../../utils/getId';

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

export async function subscribeAuthorizeRequests(
  cb: (accounts: AuthorizeRequest[]) => void
): Promise<boolean> {
  return sendMessage('pri(authorize.requests)', null, cb);
}

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

export async function unlockWallet(): Promise<ResponseWallet> {
  return sendMessage('pri(wallet.unlock)');
}

export async function walletValidate(
  request: RequestWalletValidate
): Promise<boolean> {
  return sendMessage('pri(wallet.validate)', request);
}

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

export async function privateKeyValidate(
  request: RequestPrivatekeyValidate
): Promise<boolean> {
  return sendMessage('pri(wallet.account.privatekey.validate)', request);
}

export async function resetAppState(): Promise<ResponseWallet> {
  return sendMessage('pri(reset.app.state)');
}
