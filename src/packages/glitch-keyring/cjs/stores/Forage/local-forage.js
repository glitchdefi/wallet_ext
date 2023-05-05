"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const LocalForageLib = tslib_1.__importStar(require("localforage"));
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
        const promises = [];
        Object.keys(items).forEach((key) => {
            promises.push(this.storage.setItem(key, items[key]));
        });
        await Promise.all(promises);
    }
    remove(key) {
        return this.storage.removeItem(key);
    }
    clear() {
        return this.storage.clear();
    }
    get(key) {
        return this.storage.getItem(key).then((item) => {
            if (!item) {
                return {};
            }
            return {
                [key]: item
            };
        });
    }
    async getWholeStorage() {
        const storeOb = {};
        return this.storage
            .iterate((value, key) => {
            storeOb[key] = value;
        })
            .then(() => storeOb);
    }
}
exports.default = LocalForage;
