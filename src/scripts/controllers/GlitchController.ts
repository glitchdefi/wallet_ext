import log from 'loglevel';

import { AppStateController } from './AppStateController';
import { GlitchWeb3 } from '../lib/web3/GlitchWeb3';

// Types
import { RootState } from 'types/RootState';
import { Port, PortMessageActions } from 'types/Port';

log.setDefaultLevel('debug');

export class GlitchController {
  glitchWeb3: GlitchWeb3;
  appStateController: AppStateController;
  port: Port;
  memStore: {};

  constructor(otps: { initialState: RootState }) {
    const { initialState } = otps;
    this.glitchWeb3 = new GlitchWeb3();
    this.appStateController = new AppStateController({ initialState });
    this.memStore = {};
  }

  //=============================================================================
  // PORT METHODS
  //=============================================================================

  initPort(port: Port) {
    this.port = port;
    port.onMessage.addListener(this.actionFromUI.bind(this));
  }

  actionFromUI(message: { action?: PortMessageActions; data?: any }) {
    try {
      const { action, data } = message || {};

      if (action === 'createWallet') this.createNewWallet(data);
    } catch (error) {
      log.error('actionFromUI', error);
    }
  }

  //=============================================================================
  // MNEMONIC METHODS
  //=============================================================================

  createNewWallet(password?: string) {
    const wallet = this.glitchWeb3.createNewWallet(password);
    this.port.postMessage({ action: 'createWallet', data: wallet });
  }

  //=============================================================================
  // STORE MANAGEMENT METHODS
  //=============================================================================

  async getAppState() {
    return await this.appStateController.getState();
  }
}
