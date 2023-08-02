import { log } from 'utils/log-config';
import { ExtensionStore } from './lib/localStore';
import { GlitchController } from './controllers/GlitchController';
import handlers from './lib/handler/handlers';
import { withErrorLog } from '../utils/withErrorLog';
import { ResponseAppStore } from './types';

// setup the notification (same a FF default background, white text)
withErrorLog(() => chrome.action.setBadgeBackgroundColor({ color: '#d90000' }));

/**
 * Initializes the Glitch controller, and sets up all platform configuration.
 * @returns {Promise} Setup complete.
 */
async function initialize(): Promise<any> {
  const initState = await loadStateFromPersistence();
  //Initializes the Glitch Controller with any initial state and default language.
  const controller = new GlitchController({ initialState: initState });
  handleChromePortListener(controller);
}

const extStore = new ExtensionStore();
/**
 * Loads any stored data, prioritizing the latest storage strategy.
 * Migrates that data schema in case it was last loaded on an older version.
 * @returns Last data emitted from previous instance of Glitch.
 */
async function loadStateFromPersistence(): Promise<ResponseAppStore> {
  const oldState = await extStore.getAllStorageData();
  log.info('background.loadStateFromPersistence');
  return oldState;
}

function handleChromePortListener(controller: GlitchController) {
  // listen to all messages and handle appropriately
  chrome.runtime.onConnect.addListener((port): void => {
    // message and disconnect handlers
    port.onMessage.addListener((data: any) => {
      handlers(data, port, controller);
    });
    port.onDisconnect.addListener(() =>
      log.info(`Disconnected from ${port.name}`)
    );
  });
}

initialize();
