import type { BrowserStorageArea } from '../../types.js';
declare class LocalForage implements BrowserStorageArea {
    namespace: string;
    private storage;
    constructor(namespace: string, drivers?: Array<string>);
    set(items: Record<string, any>): Promise<void>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
    get(key: string): Promise<Record<string, any>>;
    getWholeStorage(): Promise<Record<string, any>>;
}
export default LocalForage;
