import { chrome } from '@polkadot/extension-inject/chrome';
import {
  PORT_CONTENT,
  MESSAGE_ORIGIN_CONTENT,
  MESSAGE_ORIGIN_PAGE,
} from '../constants/messages';
import { Message } from './lib/page/types';
import browser from 'webextension-polyfill';

// connect to the extension
const port = chrome.runtime.connect({ name: PORT_CONTENT });

// send any messages from the extension back to the page
port.onMessage.addListener((data): void => {
  window.postMessage({ ...data, origin: MESSAGE_ORIGIN_CONTENT }, '*');
});

// all messages from the page, pass them to the extension
window.addEventListener('message', ({ data, source }: Message): void => {
  // only allow messages from our window, by the inject
  if (source !== window || data.origin !== MESSAGE_ORIGIN_PAGE) {
    return;
  }

  port.postMessage(data);
});

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
