import LocalForage from './local-forage.js';
class ForageStorage {
    constructor(namespace, options) {
        if (!options.storage) {
            options.storage = new LocalForage(namespace);
        }
        this.namespace = namespace;
        this.storage = options.storage;
    }
    async all(fn) {
        const allValues = await this.storage.getWholeStorage();
        const keyringValues = allValues?.keyring;
        if (keyringValues) {
            Object.keys(keyringValues).forEach((key) => {
                fn && fn(key, keyringValues[key]);
            });
        }
    }
    async get(key) {
        const vals = await this.storage.get(this.namespace);
        if (vals[this.namespace] && vals[this.namespace][key]) {
            return vals[this.namespace][key];
        }
        return null;
    }
    async set(key, val) {
        let vals = await this.storage.get(this.namespace);
        vals = vals[this.namespace] ? vals[this.namespace] : {};
        vals[key] = val;
        await this.storage.set({
            [this.namespace]: vals
        });
    }
    async remove(key) {
        let vals = await this.storage.get(this.namespace);
        vals = vals[this.namespace] ? vals[this.namespace] : {};
        console.log('remove', { vals, key });
        delete vals[key];
        console.log('afterRemove', { vals, key });
        return await this.storage.set({
            [this.namespace]: vals
        });
    }
    async clear() {
        await this.storage.remove(this.namespace);
    }
}
export default ForageStorage;