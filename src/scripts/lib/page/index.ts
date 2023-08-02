import { MESSAGE_ORIGIN_PAGE } from 'constants/messages';
import { getId } from 'utils/getId';
import Injected from './Injected';

// when sending a message from the injector to the extension, we
//  - create an event - this we send to the loader
//  - the loader takes this event and uses port.postMessage to background
//  - on response, the loader creates a reponse event
//  - this injector, listens on the events, maps it to the original
//  - resolves/rejects the promise with the result (or sub data)

export interface Handler {
  resolve: (data?: any) => void;
  reject: (error: Error) => void;
  subscriber?: (data: any) => void;
}

export type Handlers = Record<string, Handler>;

const handlers: Handlers = {};

export function sendMessage(
  message: string,
  request?: any,
  subscriber?: (data: unknown) => void
): Promise<any> {
  return new Promise((resolve, reject): void => {
    const id = getId();
    console.log('enkrypt - sendMessage', { message, request });

    handlers[id] = { reject, resolve, subscriber };

    const transportRequestMessage = {
      id,
      message,
      origin: MESSAGE_ORIGIN_PAGE,
      request: request || null,
    };

    window.postMessage(transportRequestMessage, '*');
  });
}

// the enable function, called by the dapp to allow access
export async function enable(origin: string): Promise<any> {
  await sendMessage('pub(authorize.tab)', { origin });

  return new Injected(sendMessage);
}

// redirect users if this page is considered as phishing, otherwise return false
export async function redirectIfPhishing(): Promise<boolean> {
  return false;
}

export function handleResponse(data: any): void {
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
}
