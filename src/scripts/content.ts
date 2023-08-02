import { chrome } from '@polkadot/extension-inject/chrome';
import {
  PORT_CONTENT,
  MESSAGE_ORIGIN_CONTENT,
  MESSAGE_ORIGIN_PAGE,
  MESSAGE_ORIGIN_EVM_INJECT,
  PORT_EXTENSION,
} from '../constants/messages';
import browser from 'webextension-polyfill';
import log from 'loglevel';

let port: chrome.runtime.Port = null;
let portExtension: chrome.runtime.Port = null;

init();

function init() {
  // connect to the extension
  port = chrome.runtime.connect({ name: PORT_CONTENT });
  portExtension = chrome.runtime.connect({ name: PORT_EXTENSION });

  port.onDisconnect.addListener(() => {
    port.onMessage.removeListener(windowPostMessage);
    window.removeEventListener('message', portPostMessage);
    init();
  });

  portExtension.onDisconnect.addListener(() => {
    portExtension.onMessage.removeListener(windowPostMessage);
    window.removeEventListener('message', portPostMessage);
    init();
  });

  const windowPostMessage = (data: any): void => {
    window.postMessage({ ...data, origin: MESSAGE_ORIGIN_CONTENT }, '*');
  };

  // send any messages from the extension back to the page
  port.onMessage.addListener(windowPostMessage);
  portExtension.onMessage.addListener(windowPostMessage);

  const portPostMessage = ({ data, source }) => {
    // only allow messages from our window, by the inject
    if (
      source !== window ||
      (data.origin !== MESSAGE_ORIGIN_PAGE &&
        data.origin !== MESSAGE_ORIGIN_EVM_INJECT)
    ) {
      return;
    }

    if (port) port.postMessage(data);
  };

  // all messages from the page, pass them to the extension
  window.addEventListener('message', portPostMessage);
}

function injectEvmScript() {
  try {
    const injectURL = browser.runtime.getURL('evmPage.bundle.js');
    const container = document.head || document.documentElement;
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('async', 'false');
    scriptTag.src = injectURL;
    scriptTag.id = 'glitch-inject';
    scriptTag.onload = function () {
      container.removeChild(scriptTag);
    };
    container.insertBefore(scriptTag, container.children[0]);
  } catch (error) {
    // eslint-disable-next-line no-console
    log.error('Glitch: Provider injection failed.', error);
  }
}

injectEvmScript();

// inject our data injector
const script = document.createElement('script');

script.src = browser.runtime.getURL('page.bundle.js');

script.onload = (): void => {
  // remove the injecting tag when loaded
  if (script.parentNode) {
    script.parentNode.removeChild(script);
  }
};

(document.head || document.documentElement).appendChild(script);
