import log from 'loglevel';

import { AppStateController } from './AppStateController';
import { RootState } from 'types/RootState';
import { Port, PortMessageActions } from 'types/Port';
// import { GlitchWeb3 } from '@glitchdefi/web3';
// import { glitchWeb3 } from '../lib/web3/GlitchWeb3';

log.setDefaultLevel('debug');

export class GlitchController {
  // glitchWeb3: GlitchWeb3;
  appStateController: AppStateController;
  port: Port;
  memStore: {};

  constructor(otps: { initialState: RootState }) {
    const { initialState } = otps;

    // this.glitchWeb3 = glitchWeb3;

    this.appStateController = new AppStateController({ initialState });
    this.memStore = {};
  }

  //=============================================================================
  // PORT
  //=============================================================================

  initPort(port: Port) {
    this.port = port;
    port.onMessage.addListener(this.actionFromUI);
  }

  actionFromUI(
    message: { action?: PortMessageActions; data?: any },
    port: Port
  ) {
    try {
      const { action, data } = message || {};

      switch (action) {
        case 'createWallet':
          console.log(message)
          port.postMessage({ action: 'createWallet', data: 'success' });
          break;
      }
    } catch (error) {
      log.error('actionFromUI', error);
    }
  }

  //=============================================================================
  // STORE MANAGEMENT
  //=============================================================================

  async getAppState() {
    return await this.appStateController.getState();
  }

  testConnect() {}
}
