export const GlitchNetwork = [
  {
    key: 'testnet',
    label: 'Glitch Testnet',
    wsProvider: 'wss://wss-fullnodes-testnet.glitch.finance',
    baseApiUrl: 'https://api-testnet-v2.glitch.finance',
    explorerUrl: 'https://testnet-explorer.glitch.finance',
    genesisHash:
      '0xb28dec049c43f44c535d6ba37384c8b31149cb62384b9e89e76f48e0527ac418',
  },
  // {
  //   key: 'mainnet',
  //   label: 'Glitch Mainnet',
  //   wsProvider: 'wss://wss-fullnodes-mainnet.glitch.finance',
  //   baseApiUrl: 'https://api-mainnet.glitch.finance',
  //   explorerUrl: 'https://explorer.glitch.finance',
  // },
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
