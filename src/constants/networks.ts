export const GlitchNetwork = [
  {
    key: 'mainnet',
    label: 'Glitch Mainnet',
    wsProvider: 'wss://wss-fullnodes-mainnet.glitch.finance',
    evmProvider: 'http://fullnodes-testnet-1.glitch.finance:9933',
    baseApiUrl: 'https://api-mainnet.glitch.finance',
    explorerUrl: 'https://explorer.glitch.finance',
    genesisHash:
      '0xef807eb7ebbfe8f4ef15fba22857ea0c06fa05b5595b577523cec1c3a36fec6c',
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
    wsProvider: 'ws://13.212.197.46:9944',
    baseApiUrl: 'https://api-uat-explorer.glitch.finance',
    explorerUrl: 'https://api-uat-explorer.glitch.finance',
    genesisHash:
      '0xb6bda70739e7d87f358fcdaadc85682e27cb8d73ac31f2f3855f273a27de5e0f',
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
