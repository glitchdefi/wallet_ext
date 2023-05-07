import type {
  MessageTypesWithSubscriptions,
  SubscriptionMessageTypes,
} from '../types';
import { log } from 'utils/log-config';

type Subscriptions = Record<string, chrome.runtime.Port>;

const subscriptions: Subscriptions = {};

// return a subscription callback, that will send the data to the caller via the port
export function createSubscription<
  TMessageType extends MessageTypesWithSubscriptions
>(
  id: string,
  port: chrome.runtime.Port
): (data: SubscriptionMessageTypes[TMessageType]) => void {
  subscriptions[id] = port;

  return (subscription: unknown): void => {
    if (subscriptions[id]) {
      port.postMessage({ id, subscription });
    }
  };
}

// clear a previous subscriber
export function unsubscribe(id: string): void {
  if (subscriptions[id]) {
    log.info(`Unsubscribing from ${id}`);
    delete subscriptions[id];
  } else {
    log.info(`Unable to unsubscribe from ${id}`);
  }
}
