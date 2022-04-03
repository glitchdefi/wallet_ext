import log from 'loglevel';
import { Handler } from './lib/handler';
import { ExtensionStore } from './lib/localStore';
import { GlitchController } from './controllers/GlitchController';
import { RootState, MessageTypes } from 'types';
import handlers from './lib/handler/handlers';
import { withErrorLog } from '../utils/withErrorLog';

log.setDefaultLevel('debug');

// setup the notification (same a FF default background, white text)
withErrorLog(() =>
  chrome.browserAction.setBadgeBackgroundColor({ color: '#d90000' })
);

/**
 * Initializes the Glitch controller, and sets up all platform configuration.
 * @returns {Promise} Setup complete.
 */
async function initialize(): Promise<any> {
  const initState = await loadStateFromPersistence();
  // Initializes the Glitch Controller with any initial state and default language.
  const controller = new GlitchController({ initialState: initState });
  // handleChromeListeners(controller);
  handleChromePortListener(controller);
}

const extStore = new ExtensionStore();
/**
 * Loads any stored data, prioritizing the latest storage strategy.
 * Migrates that data schema in case it was last loaded on an older version.
 * @returns Last data emitted from previous instance of Glitch.
 */
async function loadStateFromPersistence(): Promise<RootState> {
  log.info('background.loadStateFromPersistence');
  // read from disk
  // first from preferred, async API:
  const oldState = await extStore.getAllStorageData();

  // return just the data
  return oldState;
}

function handleChromePortListener(controller: GlitchController) {
  // listen to all messages and handle appropriately
  chrome.runtime.onConnect.addListener((port): void => {
    // message and disconnect handlers
    port.onMessage.addListener((data: any) => handlers(data, port, controller));
    port.onDisconnect.addListener(() =>
      console.log(`Disconnected from ${port.name}`)
    );
  });
}

initialize();

function handleChromeListeners(controller: GlitchController) {
  log.info('background.handleChromeListeners');

  chrome.runtime.onMessage.addListener(
    (request: { type: string; payload?: object }, sender, sendResponse) => {
      const senderURL = sender.url;
      const popupURL = chrome.runtime.getURL('popup.html');
      const windowURL = chrome.runtime.getURL('window.html');
      const senderId = sender.id;
      const extensionId = chrome.runtime.id;
      const { type, payload } = request || {};

      log.info('BG Received: ', request);

      if (senderId === extensionId) {
        if (senderURL === popupURL || senderURL === windowURL) {
          try {
            switch (type) {
              // Wallet
              case MessageTypes.BG_WALLET_CREATE_WALLET_COMPLETED:
                Handler.createWalletCompleted(controller, sendResponse);
                break;

              case MessageTypes.BG_WALLET_RESTORE_WALLET:
                Handler.restoreWallet(payload, controller, sendResponse);
                break;

              case MessageTypes.BG_WALLET_LOCK_WALLET:
                Handler.lockWallet(controller, sendResponse);
                break;

              case MessageTypes.BG_WALLET_UNLOCK_WALLET:
                Handler.unlockWallet(payload, controller, sendResponse);
                break;

              case MessageTypes.BG_WALLET_LOGOUT_WALLET:
                Handler.logoutWallet(payload, controller, sendResponse);
                break;

              case MessageTypes.BG_WALLET_SHOW_SEED_PHARES:
                Handler.showSeedPhrase(payload, controller, sendResponse);
                break;

              case MessageTypes.BG_WALLET_BACK_UP_WALLET:
                Handler.backupWallet(controller, sendResponse);
                break;

              case MessageTypes.BG_WALLET_GET_BALANCE:
                Handler.getBalance(controller, sendResponse);
                break;

              case MessageTypes.BG_WALLET_GET_TOKEN_PRICE:
                Handler.getTokenPrice(payload, controller, sendResponse);
                break;

              case MessageTypes.BG_WALLET_TRANSFER_TOKEN:
                Handler.transfer(payload, controller, sendResponse);
                break;

              case MessageTypes.BG_WALLET_GET_ESTIMATE_FEE:
                Handler.getEstimateFee(payload, controller, sendResponse);
                break;

              case MessageTypes.BG_WALLET_RESET_STATE:
                Handler.resetState(controller, sendResponse);
                break;

              // Account
              case MessageTypes.BG_WALLET_CREATE_ACCOUNT:
                Handler.createAccount(payload, controller, sendResponse);
                break;

              case MessageTypes.BG_ACCOUNT_ADD_ACCOUNT:
                Handler.addNewAccount(payload, controller, sendResponse);
                break;

              case MessageTypes.BG_ACCOUNT_CHANGE_ACCOUNT:
                Handler.changeAccount(payload, controller, sendResponse);
                break;

              case MessageTypes.BG_ACCOUNT_IMPORT_ACCOUNT:
                Handler.importAccount(payload, controller, sendResponse);
                break;

              case MessageTypes.BG_ACCOUNT_SHOW_PRIVATE_KEYS:
                Handler.showPrivateKeys(payload, controller, sendResponse);
                break;

              case MessageTypes.BG_ACCOUNT_CHANGE_ACCOUNT_NAME:
                Handler.changeAccountName(payload, controller, sendResponse);
                break;

              // Transactions
              case MessageTypes.BG_TRANSACTION_GET_TX_LIST:
                Handler.fetchTransactions(payload, controller, sendResponse);
                break;

              // Settings
              case MessageTypes.BG_SETTINGS_SET_AUTO_LOCK_TIMER:
                Handler.setAutoLockTimer(payload, controller, sendResponse);
                break;

              default:
                Handler.handleDefault(request, sendResponse);
            }
          } catch (err) {
            Handler.handleError(request, sendResponse);
          }
        }
      }
      // This logic require to be open message port between popup.js and background.js till not get responses by sendMessage.
      // Don't remove return true.
      return true;
    }
  );
}
