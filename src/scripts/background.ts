import log from 'loglevel';
import { ExtensionPlatform } from './platforms/extension';
import { ExtensionStore } from './lib/localStore';
import { getFirstPreferredLangCode } from './lib/getFirstPreferredLangCode';
import { GlitchController } from './controllers/GlitchController';
import { RootState } from 'types/RootState';

log.setDefaultLevel('debug');

const extPlatform = new ExtensionPlatform();
const extStore = new ExtensionStore();

initialize();

/**
 * Initializes the Glitch controller, and sets up all platform configuration.
 * @returns {Promise} Setup complete.
 */
async function initialize(): Promise<any> {
  const initState = await loadStateFromPersistence();

  // Initializes the Glitch Controller with any initial state and default language.
  const controller = new GlitchController({ initialState: initState });

  handleChromeListeners(controller);

  log.info('Glitch initialization complete.');
}

/**
 * Loads any stored data, prioritizing the latest storage strategy.
 * Migrates that data schema in case it was last loaded on an older version.
 * @returns Last data emitted from previous instance of Glitch.
 */
async function loadStateFromPersistence(): Promise<RootState> {
  log.info('background.loadStateFromPersistence');
  // read from disk
  // first from preferred, async API:
  const state = await extStore.getAllStorageData();
  const initLangCode = await getFirstPreferredLangCode();

  const newState = state
    ? {
        ...state,
        settings: {
          locale: initLangCode,
        },
      }
    : {
        settings: {
          locale: initLangCode,
        },
      };

  // write to disk
  if (extStore.isSupported) {
    extStore.set(newState);
  } else {
    // throw in setTimeout so as to not block boot
    setTimeout(() => {
      throw new Error('Glitch - Localstore not supported');
    });
  }

  // return just the data
  return newState;
}

function handleChromeListeners(controller: GlitchController) {
  log.info('background.handleChromeListeners');

  chrome.runtime.onConnect.addListener((port) => {
    if (port.name === 'glitchController') {
      controller.initPort(port);
    }
  });
}
