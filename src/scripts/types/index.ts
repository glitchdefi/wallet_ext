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
  'pri(authorize.requests)': [
    RequestAuthorizeSubscribe,
    boolean,
    AuthorizeRequest[]
  ];
  'pri(wallet.create)': [RequestWalletCreate, ResponseWallet];
  'pri(wallet.create.completed)': [null, ResponseWallet];
  'pri(wallet.restore)': [RequestWalletRestore, ResponseWallet];
  'pri(wallet.lock)': [null, ResponseWallet];
  'pri(wallet.unlock)': [null, ResponseWallet];
  'pri(wallet.validate)': [RequestWalletValidate, boolean];
  'pri(wallet.account.create)': [RequestAccountCreate, ResponseWallet];
  'pri(wallet.account.import)': [RequestAccountImport, ResponseWallet];
  'pri(wallet.account.privatekey.validate)': [
    RequestPrivatekeyValidate,
    boolean
  ];
  'pri(reset.app.state)': [null, ResponseWallet];

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
export interface RequestAccountImport {
  name: string;
  privateKey: string;
}
export interface RequestPrivatekeyValidate {
  privateKey: string;
}
export interface RequestAuthorizeTab {
  origin: string;
}

export interface AuthorizeRequest {
  id: string;
  request: RequestAuthorizeTab;
  url: string;
}

export type RequestAuthorizeSubscribe = null;

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

export interface AccountTypes {
  address?: string;
  name?: string;
  avatar?: string;
  whenCreated?: number;
  seed?: string;
  balance?: {
    freeBalance?: any;
    reservedBalance?: any;
  };
}

// Responses
export type ResponseTypes = {
  [MessageType in keyof RequestSignatures]: RequestSignatures[MessageType][1];
};
