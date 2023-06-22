import type { KeyringJson, StorageOptions } from '../../types.js';
declare class ForageStorage {
    namespace: string;
    private storage;
    constructor(namespace: string, options: StorageOptions);
    all(fn: (key: string, value: KeyringJson) => void): Promise<void>;
    get(key: string): Promise<any>;
    set(key: string, val: Record<string, any>): Promise<void>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
}
export default ForageStorage;
