import { injectExtension } from '@polkadot/extension-inject';

import type { Message } from './lib/page/types';
import { enable, redirectIfPhishing, handleResponse } from './lib/page';
import packageInfo from '../../package.json';
import { MESSAGE_ORIGIN_CONTENT } from '../constants/messages';

function inject() {
  injectExtension(enable, {
    name: packageInfo.name,
    version: packageInfo.version,
  });
}

// setup a response listener (events created by the loader for extension responses)
window.addEventListener('message', ({ data, source }: Message): void => {
  // only allow messages from our window, by the loader
  if (source !== window || data.origin !== MESSAGE_ORIGIN_CONTENT) {
    return;
  }

  if (data.id) {
    handleResponse(data);
  } else {
    console.error('Missing id for response.');
  }
});

redirectIfPhishing()
  .then((gotRedirected) => {
    if (!gotRedirected) {
      inject();
    }
  })
  .catch((e) => {
    console.warn(
      `Unable to determine if the site is in the phishing list: ${
        (e as Error).message
      }`
    );
    inject();
  });
