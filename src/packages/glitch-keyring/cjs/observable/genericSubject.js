"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericSubject = void 0;
const rxjs_1 = require("rxjs");
const util_1 = require("@polkadot/util");
const item_js_1 = require("../options/item.js");
const env_js_1 = require("./env.js");
function callNext(current, subject, withTest) {
    const isDevMode = env_js_1.env.isDevelopment();
    const filtered = {};
    Object.keys(current).forEach((key) => {
        const { json: { meta: { isTesting = false } = {} } = {} } = current[key];
        if (!withTest || isDevMode || isTesting !== true) {
            filtered[key] = current[key];
        }
    });
    subject.next(filtered);
}
function genericSubject(keyCreator, withTest = false) {
    let current = {};
    const subject = new rxjs_1.BehaviorSubject({});
    const next = () => callNext(current, subject, withTest);
    env_js_1.env.subject.subscribe(next);
    return {
        add: async (store, address, json, type) => {
            current = (0, util_1.objectCopy)(current);
            current[address] = {
                json: (0, util_1.objectSpread)({}, json, { address }),
                option: (0, item_js_1.createOptionItem)(address, json.meta.name),
                type
            };
            // we do not store dev or injected accounts (external/transient)
            if (!json.meta.isInjected && (!json.meta.isTesting || env_js_1.env.isDevelopment())) {
                await store.set(keyCreator(address), json);
            }
            next();
            return current[address];
        },
        remove: async (store, address) => {
            current = (0, util_1.objectCopy)(current);
            delete current[address];
            await store.remove(keyCreator(address));
            next();
        },
        subject
    };
}
exports.genericSubject = genericSubject;