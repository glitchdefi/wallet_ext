import type { KeyringPair, KeyringPair$Meta } from '@polkadot/keyring/types';
import type {
  SignerPayloadJSON,
  SignerPayloadRaw,
} from '@polkadot/types/types';
import type { HexString } from '@polkadot/util/types';
import { TypeRegistry } from '@polkadot/types';
import { AuthUrls } from '../lib/handler/State';

export interface AccountJson extends KeyringPair$Meta {
  address: string;
  genesisHash?: string | null;
  isExternal?: boolean;
  isHardware?: boolean;
  isHidden?: boolean;
  name?: string;
  parentAddress?: string;
  suri?: string;
  type?: KeypairType;
  whenCreated?: number;
}

export declare type KeypairType = 'ed25519' | 'sr25519' | 'ecdsa' | 'ethereum';

type IsNull<T, K extends keyof T> = {
  [K1 in Exclude<keyof T, K>]: T[K1];
} & T[K] extends null
  ? K
  : never;

type KeysWithDefinedValues<T> = {
  [K in keyof T]: T[K] extends undefined ? never : K;
}[keyof T];

type NoUndefinedValues<T> = {
  [K in KeysWithDefinedValues<T>]: T[K];
};

type NullKeys<T> = { [K in keyof T]: IsNull<T, K> }[keyof T];

export interface RequestSignatures {
  // private/internal requests, i.e. from a popup
  'pri(authorize.approve)': [RequestAuthorizeApprove, boolean];
  'pri(authorize.list)': [null, ResponseAuthorizeList];
  'pri(authorize.reject)': [RequestAuthorizeReject, boolean];
  'pri(authorize.requests)': [
    RequestAuthorizeSubscribe,
    boolean,
    AuthorizeRequest[]
  ];
  'pri(authorize.toggle)': [RequestAuthorizeToggle, ResponseAuthorizeList];
  'pri(authorize.remove)': [string, ResponseAuthorizeList];

  'pri(wallet.create)': [RequestWalletCreate, ResponseWallet];
  'pri(wallet.create.completed)': [null, ResponseWallet];
  'pri(wallet.restore)': [RequestWalletRestore, ResponseWallet];
  'pri(wallet.lock)': [null, ResponseWallet];
  'pri(wallet.unlock)': [null, ResponseWallet];
  'pri(wallet.logout)': [null, ResponseAppStore];
  'pri(wallet.validate)': [RequestWalletValidate, boolean];
  'pri(wallet.seed.show)': [null, string];
  'pri(wallet.backup)': [null, ResponseWallet];
  'pri(wallet.account.create)': [RequestAccountCreate, ResponseWallet];
  'pri(wallet.account.import)': [RequestAccountImport, ResponseWallet];
  'pri(wallet.account.change)': [RequestAccountChange, ResponseWallet];
  'pri(wallet.account.edit)': [RequestAccountEdit, ResponseWallet];
  'pri(wallet.account.forget)': [RequestAccountForget, boolean];
  'pri(wallet.account.transfer)': [
    RequestAccountTransfer,
    ResponseAccountTransfer
  ];
  'pri(wallet.account.balance.get)': [null, ResponseWallet];
  'pri(wallet.account.privatekey.validate)': [
    RequestPrivatekeyValidate,
    boolean
  ];
  'pri(wallet.account.privatekey.show)': [null, string];
  'pri(settings.autolock.set)': [RequestAutoLockSet, ResponseSettings];
  'pri(settings.network.set)': [RequestNetworkSet, ResponseSettings];
  'pri(transactions.list.get)': [
    RequestTransactionsGet,
    ResponseTransactionsGet
  ];
  'pri(estimate.fee.get)': [RequestEstimateFeeGet, string];
  'pri(token.price.get)': [RequestTokenPriceGet, string | number];
  'pri(reset.app.state)': [null, ResponseWallet];
  'pri(update.wallet.storage)': [RequestUpdateWalletStorage, ResponseWallet];
  'pri(window.open)': [AllowedPath, boolean];

  'pri(signing.approve.signature)': [RequestSigningApproveSignature, boolean];
  'pri(signing.approve)': [RequestSigningApprove, boolean];
  'pri(signing.cancel)': [RequestSigningCancel, boolean];
  'pri(signing.requests)': [RequestSigningSubscribe, boolean, SigningRequest[]];

  // public/external requests, i.e. from a page
  'pub(authorize.tab)': [RequestAuthorizeTab, null];
}

export type MessageTypes = keyof RequestSignatures;

export type RequestTypes = {
  [MessageType in keyof RequestSignatures]: RequestSignatures[MessageType][0];
};

export type ResponseType<TMessageType extends keyof RequestSignatures> =
  RequestSignatures[TMessageType][1];

export type SubscriptionMessageTypes = NoUndefinedValues<{
  [MessageType in keyof RequestSignatures]: RequestSignatures[MessageType][2];
}>;

export type MessageTypesWithNullRequest = NullKeys<RequestTypes>;
export type MessageTypesWithSubscriptions = keyof SubscriptionMessageTypes;
export type MessageTypesWithNoSubscriptions = Exclude<
  MessageTypes,
  keyof SubscriptionMessageTypes
>;

export interface RequestWalletCreate {
  seed?: string;
  name?: string;
  password?: string;
}
export interface RequestWalletRestore {
  seed: string;
  name: string;
  password: string;
}
export interface RequestWalletValidate {
  password: string;
}
export interface RequestAccountCreate {
  name: string;
}
export interface RequestAccountChange {
  address: string;
}
export interface RequestAccountImport {
  name: string;
  privateKey: string;
}
export interface RequestAccountEdit {
  name: string;
}
export interface RequestPrivatekeyValidate {
  privateKey: string;
}
export interface RequestAutoLockSet {
  openTime: number;
  duration: number;
}

export interface RequestNetworkSet {
  network: 'testnet' | 'mainnet';
}

export interface RequestTransactionsGet {
  pageIndex: number;
  pageSize: number;
  txStatus: number;
  txType: number;
  startTime: number;
  endTime: number;
}
export interface RequestEstimateFeeGet {
  toAddress: string;
  amount: any;
}

export interface RequestTokenPriceGet {
  name: string;
  currency: string;
}

export interface RequestAccountTransfer {
  toAddress: string;
  amount: any;
}
export interface RequestAuthorizeTab {
  origin: string;
}

export interface AuthorizeRequest {
  id: string;
  request: RequestAuthorizeTab;
  url: string;
}
export interface RequestAuthorizeTab {
  origin: string;
}
export interface RequestAuthorizeApprove {
  id: string;
}
export interface RequestAuthorizeReject {
  id: string;
}
export interface RequestAccountForget {
  address: string;
}

export interface RequestUpdateWalletStorage {
  data: ResponseWallet;
}

export type RequestAuthorizeSubscribe = null;

export type RequestSigningSubscribe = null;

export interface RequestSigningApproveSignature {
  id: string;
  signature: HexString;
}
export interface RequestSigningApprove {
  id: string;
}
export interface RequestSigningCancel {
  id: string;
}

export interface RequestAuthorizeToggle {
  url: string;
  address: string;
}

export type AllowedPath = string;
export interface SigningRequest {
  account: AccountJson;
  id: string;
  request: RequestSign;
  url: string;
}
export interface SignerPayloadJSON2 extends SignerPayloadJSON {
  amount: string | number;
  fee: string | number;
}
export interface RequestSign {
  readonly payload: SignerPayloadJSON2 | SignerPayloadRaw;

  sign(registry: TypeRegistry, pair: KeyringPair): { signature: HexString };
}

export interface ResponseAccountTransfer {
  success: boolean;
  message: string;
}
export interface ResponseTransactionsGet {
  data: any[];
  total: number;
  pagination: number;
}
export interface ResponseWallet {
  isInitialized?: 'none' | 'pending' | 'completed';
  isLocked?: boolean;
  isBackup?: boolean;
  seed?: string;
  parentAddress?: string;
  selectedAddress?: string;
  accounts?: {
    [key: string]: AccountTypes;
  };
}
export interface ResponseSettings {
  autoLock?: {
    duration?: number;
    openTime?: number;
  };
  currency?: string;
  locale?: string;
  network?: 'mainnet' | 'testnet';
}
export interface ResponseAppStore {
  settings: ResponseSettings;
  wallet: ResponseWallet;
}

export interface ResponseAuthorizeList {
  list: AuthUrls;
}
export interface AccountTypes {
  address?: string;
  name?: string;
  avatar?: string;
  whenCreated?: number;
  seed?: { encrypted: string; secret: string };
  isHidden?: boolean;
  allowedUrls?: string[];
  balance?: {
    freeBalance?: any;
    reservedBalance?: any;
  };
}

// Responses
export type ResponseTypes = {
  [MessageType in keyof RequestSignatures]: RequestSignatures[MessageType][1];
};
