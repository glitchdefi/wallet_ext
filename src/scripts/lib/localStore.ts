import extension from 'extensionizer';
import log from 'loglevel';
import { checkForError } from './utils';

/**
 * A wrapper around the extension's storage local API
 */
export class ExtensionStore {
  isSupported: boolean;

  /**
   * @constructor
   */
  constructor() {
    this.isSupported = Boolean(extension.storage.local);
    if (!this.isSupported) {
      log.error('Storage local API not available.');
    }
  }

  /**
   * Returns all of the keys currently saved
   * @returns {Promise<*>}
   */
  async get(key: string): Promise<any> {
    if (!this.isSupported) {
      return undefined;
    }
    const result = await this._get(key);
    // extension.storage.local always returns an obj
    // if the object is empty, treat it as undefined
    if (isEmpty(result)) {
      return undefined;
    }
    return result[key];
  }

  /**
   * Returns all of the keys currently saved
   * @private
   * @returns the key-value map from local storage
   */
  getAllStorageData(): Promise<any> {
    const { local } = extension.storage;
    return new Promise((resolve, reject) => {
      local.get(null, (result: any) => {
        const err = checkForError();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Sets the key in local state
   * @param {Object} state - The state to set
   * @returns {Promise<object>}
   */
  async set(state: object): Promise<object> {
    return await this._set(state);
  }

  /**
   * Returns all of the keys currently saved
   * @private
   * @returns the key-value map from local storage
   */
  _get(key: string): object {
    const { local } = extension.storage;
    return new Promise((resolve, reject) => {
      local.get(key, (result: any) => {
        const err = checkForError();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Sets the key in local state
   * @param {Object} obj - The key to set
   * @returns {Promise<void>}
   * @private
   */
  _set(obj: object): Promise<object> {
    const { local } = extension.storage;
    return new Promise<object>((resolve, reject) => {
      local.set(obj, () => {
        const err = checkForError();
        if (err) {
          reject(err);
        } else {
          resolve(obj);
        }
      });
    });
  }
}

/**
 * Returns whether or not the given object contains no keys
 * @param {Object} obj - The object to check
 * @returns {boolean}
 */
function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}
