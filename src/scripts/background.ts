import log from 'loglevel';
import { ExtensionStore } from './lib/localStore';
import { GlitchController } from './controllers/GlitchController';
import handlers from './lib/handler/handlers';
import { withErrorLog } from '../utils/withErrorLog';
import { ResponseAppStore } from './types';

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
async function loadStateFromPersistence(): Promise<ResponseAppStore> {
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
