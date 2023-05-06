import * as LocalForageLib from 'localforage';
class LocalForage {
    constructor(namespace, drivers = [
        LocalForageLib.INDEXEDDB,
        LocalForageLib.LOCALSTORAGE
    ]) {
        this.namespace = namespace;
        this.storage = LocalForageLib.createInstance({
            name: this.namespace,
            driver: drivers,
            storeName: 'glitch_db'
        });
    }
    async set(items) {
        const promises = Object.keys(items).map((key) => this.storage.setItem(key, items[key]));
        await Promise.all(promises);
    }
    async remove(key) {
        return await this.storage.removeItem(key);
    }
    async clear() {
        return await this.storage.clear();
    }
    async get(key) {
        const item = await this.storage.getItem(key);
        if (!item) {
            return {};
        }
        return {
            [key]: item
        };
    }
    async getWholeStorage() {
        const storeOb = {};
        return await this.storage
            .iterate((value, key) => {
            storeOb[key] = value;
        })
            .then(() => storeOb);
    }
}
export default LocalForage;
