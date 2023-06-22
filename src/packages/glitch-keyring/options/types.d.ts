import type { KeyringItemType, KeyringStruct } from '../types.js';
export interface KeyringSectionOption {
    key: string | null;
    name: string;
    value: string | null;
}
export type KeyringSectionOptions = KeyringSectionOption[];
export type KeyringOptions = {
    [type in KeyringItemType | 'all' | 'allPlus' | 'recent' | 'testing']: KeyringSectionOptions;
};
export type KeyringOption$Type = keyof KeyringOptions;
export interface KeyringOptionInstance {
    createOptionHeader: (name: string) => KeyringSectionOption;
    init: (keyring: KeyringStruct) => void;
}
