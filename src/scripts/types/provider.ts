import type { InjectedProvider as EthereumProvider } from '../providers/ethereum/types';
import EventEmitter from 'eventemitter3';
import { EXTENSION_VERSION } from 'constants/values';
import { NetworkNames } from './networks';
import { SignerType } from '.';

export enum ProviderName {
  ethereum = 'ethereum',
}

export enum ProviderType {
  evm,
}

export type SendMessageHandler = (
  provider: ProviderName,
  message: string
) => Promise<any>;

export interface ProviderOptions {
  name: ProviderName;
  type: ProviderType;
  sendMessageHandler: SendMessageHandler;
}

export interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: `data:image/svg+xml;base64,${string}`;
  walletId: string;
}

export enum EIP6963Events {
  request = 'eip6963:requestProvider',
  announce = 'eip6963:announceProvider',
}

export abstract class ProviderInterface extends EventEmitter {
  name: ProviderName;
  type: ProviderType;
  version: string = EXTENSION_VERSION;
  sendMessageHandler: SendMessageHandler;
  constructor(options: ProviderOptions) {
    super();
    this.name = options.name;
    this.type = options.type;
    this.sendMessageHandler = options.sendMessageHandler;
  }
  abstract handleMessage(msg: string): void;
}

export type handleIncomingMessage = (
  provider: Provider,
  message: string
) => void;

export type handleOutgoingMessage = (
  provider: Provider,
  message: string
) => Promise<any>;

export { EthereumProvider };

export type Provider = EthereumProvider;

export interface ProviderRequestOptions {
  url: string;
  domain: string;
  faviconURL: string;
  title: string;
  tabId: number;
}

interface EthereumRawInfo {
  blockHash: string;
  blockNumber: string;
  contractAddress: string | null;
  effectiveGasPrice: string;
  from: string;
  to: string | null;
  gas: string;
  gasUsed: string;
  status: boolean;
  transactionHash: string;
  data: string;
  nonce: string;
  value: string;
  timestamp: number | undefined;
}

export abstract class ProviderAPIInterface {
  abstract node: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  constructor(node: string, options?: unknown) {}
  abstract init(): Promise<void>;
  abstract getBalance(address: string): Promise<string>;
  abstract getTransactionStatus(hash: string): Promise<EthereumRawInfo>;
}

export interface NodeType {
  name: NetworkNames;
  name_long: string;
  homePage: string;
  blockExplorerTX: string;
  blockExplorerAddr: string;
  isTestNetwork: boolean;
  currencyName: string;
  icon: any;
  signer: SignerType[];
  gradient: string;
  node: string;
  displayAddress: (address: string) => string;
  api?: () => Promise<ProviderAPIInterface>;
  provider: ProviderName;
  coingeckoID?: string;
  // NFTHandler?: (network: NodeType, address: string) => Promise<NFTCollection[]>;
  NFTHandler?: (network: NodeType, address: string) => Promise<any[]>;
  identicon: (address: string, options?: any) => string;
  // assetsHandler?: (network: NodeType, address: string) => Promise<AssetsType[]>;
  assetsHandler?: (network: NodeType, address: string) => Promise<any[]>;
  basePath: string;
}
