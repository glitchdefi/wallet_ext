export const GlitchNetwork = [
  {
    key: 'mainnet',
    label: 'Glitch Mainnet',
    wsProvider: 'wss://wss-fullnodes-mainnet.glitch.finance',
    evmProvider: 'http://fullnodes-testnet-1.glitch.finance:9933',
    baseApiUrl: 'https://api-mainnet.glitch.finance',
    explorerUrl: 'https://explorer.glitch.finance',
    genesisHash:
      '0x0c17cb8f797ae1b27358e5ab7c6ddc55210124d3a2791dbffd25e2f3b2d9156a',
  },
  {
    key: 'testnet',
    label: 'Glitch Testnet',
    wsProvider: 'wss://wss-fullnodes-testnet.glitch.finance',
    evmProvider: 'http://fullnodes-testnet-1.glitch.finance:9933',
    baseApiUrl: 'https://api-testnet-v2.glitch.finance',
    explorerUrl: 'https://testnet-explorer.glitch.finance',
    genesisHash:
      '0xb28dec049c43f44c535d6ba37384c8b31149cb62384b9e89e76f48e0527ac418',
  },
  {
    key: 'uat',
    label: 'Glitch UAT',
    wsProvider: 'wss://wss-uat.glitch.finance',
    baseApiUrl: 'https://api-uat-explorer.glitch.finance',
    explorerUrl: 'https://api-uat-explorer.glitch.finance',
    genesisHash:
      '0x0d25f2cd4d5692442623e9f947b408e703c15a3849dbb97a75e6f00468a981e7',
  },
];

export const GLITCH_EVM_TYPES = {
  AccountInfo: {
    nonce: 'Index',
    consumers: 'RefCount',
    providers: 'RefCount',
    data: 'AccountData',
  },
  Amount: 'i128',
  Keys: 'SessionKeys4',
  AmountOf: 'Amount',
  Balance: 'u128',
  Rate: 'FixedU128',
  Ratio: 'FixedU128',
  EcdsaSignature: '[u8; 65]',
  EvmAddress: 'H160',
  EthereumTxHash: 'H256',
  BridgeNetworks: {
    _enum: ['BSC', 'Ethereum'],
  },
};
