import { assert } from '@polkadot/util';
import { GlitchController } from '../../controllers/GlitchController';
import { PORT_EXTENSION } from '../../../constants/messages';
import Extension from './Extension';

import State from './State';
import Tabs from './Tabs';

const state = new State();
const tabs = new Tabs(state);
const extension = new Extension(state);

export default function handler(
  { id, message, request },
  port: chrome.runtime.Port,
  controller: GlitchController
): void {
  const isExtension = port.name === PORT_EXTENSION;
  const sender = port.sender as chrome.runtime.MessageSender;
  const from = isExtension
    ? 'extension'
    : (sender.tab && sender.tab.url) || sender.url || '<unknown>';
  const source = `${from}: ${id}: ${message}`;

  console.log(` [in] ${source}`); // :: ${JSON.stringify(request)}`);

  let promise: Promise<any>;

  if (isExtension) {
    extension.initController(controller);
    promise = extension.handle(id, message, request, port);
  } else {
    promise = tabs.handle(id, message, request, from, port);
  }

  if (promise)
    promise
      .then((response: any): void => {
        console.log('UI received: ', response);
        console.log(`[out] ${source}`); // :: ${JSON.stringify(response)}`);

        // between the start and the end of the promise, the user may have closed
        // the tab, in which case port will be undefined
        assert(port, 'Port has been disconnected');

        port.postMessage({ id, response });
      })
      .catch((error: Error): void => {
        console.log(`[err] ${source}:: ${error.message}`);

        // only send message back to port if it's still connected
        if (port) {
          port.postMessage({ error: error.message, id });
        }
      });
}