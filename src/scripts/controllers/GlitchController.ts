import log from 'loglevel';

import { AppStateController } from './AppStateController';
import { GlitchWeb3 } from '../lib/web3/GlitchWeb3';

// Types
import { RootState } from 'types';

log.setDefaultLevel('debug');
export class GlitchController {
  glitchWeb3: GlitchWeb3;
  appStateController: AppStateController;
  memStore: {};

  constructor(otps: { initialState: RootState }) {
    const { initialState } = otps;
    this.glitchWeb3 = new GlitchWeb3();
    this.appStateController = new AppStateController({ initialState });
    this.memStore = {};
  }

  //=============================================================================
  // WALLET METHODS
  //=============================================================================

  /**
   * 
   * @returns Generate 12 mnemonic phrases
   */
  createSeedWords(): string {
    return this.glitchWeb3.createSeedWords();
  }

  /**
   * 
   * @param password 
   */
  createNewWallet(password?: string) {
    const wallet = this.glitchWeb3.createNewWallet(password);
  }

  //=============================================================================
  // STORE MANAGEMENT METHODS
  //=============================================================================

  async getAppState() {
    return await this.appStateController.getState();
  }
}
