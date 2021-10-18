import extension from 'extensionizer';
import { checkForError } from '../lib/utils';

export class ExtensionPlatform {
  reload() {
    extension.runtime.reload();
  }

  openTab(options) {
    return new Promise((resolve, reject) => {
      extension.tabs.create(options, (newTab) => {
        const error = checkForError();
        if (error) {
          return reject(error);
        }
        return resolve(newTab);
      });
    });
  }

  openWindow(options) {
    return new Promise((resolve, reject) => {
      extension.windows.create(options, (newWindow) => {
        const error = checkForError();
        if (error) {
          return reject(error);
        }
        return resolve(newWindow);
      });
    });
  }

  focusWindow(windowId) {
    return new Promise<void>((resolve, reject) => {
      extension.windows.update(windowId, { focused: true }, () => {
        const error = checkForError();
        if (error) {
          return reject(error);
        }
        return resolve();
      });
    });
  }

  updateWindowPosition(windowId, left, top) {
    return new Promise<void>((resolve, reject) => {
      extension.windows.update(windowId, { left, top }, () => {
        const error = checkForError();
        if (error) {
          return reject(error);
        }
        return resolve();
      });
    });
  }

  getLastFocusedWindow() {
    return new Promise((resolve, reject) => {
      extension.windows.getLastFocused((windowObject) => {
        const error = checkForError();
        if (error) {
          return reject(error);
        }
        return resolve(windowObject);
      });
    });
  }

  closeCurrentWindow() {
    return extension.windows.getCurrent((windowDetails) => {
      return extension.windows.remove(windowDetails.id);
    });
  }

  getVersion() {
    return extension.runtime.getManifest().version;
  }

  getPlatformInfo(cb) {
    try {
      extension.runtime.getPlatformInfo((platform) => {
        cb(null, platform);
      });
    } catch (e) {
      cb(e);
      // eslint-disable-next-line no-useless-return
      return;
    }
  }

  getAllWindows() {
    return new Promise((resolve, reject) => {
      extension.windows.getAll((windows) => {
        const error = checkForError();
        if (error) {
          return reject(error);
        }
        return resolve(windows);
      });
    });
  }

  getActiveTabs() {
    return new Promise((resolve, reject) => {
      extension.tabs.query({ active: true }, (tabs) => {
        const error = checkForError();
        if (error) {
          return reject(error);
        }
        return resolve(tabs);
      });
    });
  }

  currentTab() {
    return new Promise((resolve, reject) => {
      extension.tabs.getCurrent((tab) => {
        const err = checkForError();
        if (err) {
          reject(err);
        } else {
          resolve(tab);
        }
      });
    });
  }

  switchToTab(tabId) {
    return new Promise((resolve, reject) => {
      extension.tabs.update(tabId, { highlighted: true }, (tab) => {
        const err = checkForError();
        if (err) {
          reject(err);
        } else {
          resolve(tab);
        }
      });
    });
  }

  closeTab(tabId) {
    return new Promise((resolve, reject) => {
      extension.tabs.remove(tabId, () => {
        const err = checkForError();
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  _showNotification(title, message, url) {
    extension.notifications.create(url, {
      type: 'basic',
      title,
      iconUrl: extension.extension.getURL('../../images/icon-64.png'),
      message,
    });
  }

  _subscribeToNotificationClicked() {
    if (!extension.notifications.onClicked.hasListener(this._viewOnEtherscan)) {
      extension.notifications.onClicked.addListener(this._viewOnEtherscan);
    }
  }

  _viewOnEtherscan(txId) {
    if (txId.startsWith('https://')) {
      extension.tabs.create({ url: txId });
    }
  }
}
