import { ProviderError, SignerType } from 'scripts/types';
import type { Provider as InjectedProvider } from '../inject';
import { NodeType } from 'scripts/types/provider';

export interface ProviderMessage {
  method: MessageMethod;
  params: Array<any>;
}

export enum MessageMethod {
  changeChainId = 'changeChainId',
  changeAddress = 'changeAddress',
  changeConnected = 'changeConnected',
  subscription = 'eth_subscription',
}

export enum EmitEvent {
  accountsChanged = 'accountsChanged',
  chainChanged = 'chainChanged',
  connect = 'connect',
  disconnect = 'disconnect',
  message = 'message',
}

export interface JSONError {
  error: ProviderError;
}

export interface EthereumResponse {
  result?: any;
  error?: ProviderError;
}

export type CallbackFunction = (
  err: Error | null,
  res?: JsonRpcResponse
) => void;

export enum ErrorCodes {
  userRejected = 4001,
  unauthorized = 4100,
  unsupportedMethod = 4200,
  disconnected = 4900,
  chainDisconnected = 4901,
}

export interface ProviderConnectInfo {
  readonly chainId: string;
}
export interface EthereumRequest {
  method: string;
  params?: Array<any>;
}

export interface EthereumNodeType extends NodeType {
  signer: [SignerType.secp256k1];
  chainID: `0x${string}`;
}

export interface ERC20TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
}
export interface JsonRpcRequest {
  id: string;
  jsonrpc: '2.0';
  method: string;
  params?: any[];
}

export interface JsonRpcResponse {
  id: string;
  jsonrpc: '2.0';
  result?: unknown;
  error?: Error;
}

export interface DataDecodeResponse {
  decoded: boolean;
  values: string[];
  function?: string;
  tokenValue?: string;
  tokenTo?: string;
  isToken: boolean;
  amountToApprove?: string;
}

export { InjectedProvider };