const actions = {
  CREATE_WALLET: 'createWallet',
  TEST: 'test',
} as const;

export type PortMessageActions = typeof actions[keyof typeof actions];

/**
 * An object which allows two way communication with other pages.
 * @since Chrome 26.
 */
export interface Port {
  postMessage: (message: { action?: PortMessageActions; data?: any }) => void;
  disconnect: () => void;
  /**
   * Optional.
   * This property will only be present on ports passed to onConnect/onConnectExternal listeners.
   */
  sender?: chrome.runtime.MessageSender;
  /** An object which allows the addition and removal of listeners for a Chrome event. */
  onDisconnect: chrome.runtime.PortDisconnectEvent;
  /** An object which allows the addition and removal of listeners for a Chrome event. */
  onMessage: chrome.runtime.PortMessageEvent;
  name: string;
}
