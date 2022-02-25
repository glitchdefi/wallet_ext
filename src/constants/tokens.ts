import { WordCount } from '@polkadot/util-crypto/mnemonic/generate';

export const GlitchToken = {
  symbol: 'GLCH',
  decimal: 18,
  min_fee: 1e14,
  wallet_address_length: 43,
  private_key_length: 44,
  mnemonic_length: [12, 24],
  default_mnemonic_length: 12 as WordCount,
  fee: 0.000005,
  existential_deposit: 0.0005,
};
