"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const NamedObservable_1 = require("../NamedObservable");
const types_1 = require("./types");
const utils_1 = require("./utils");
/**
 * Sets or removes data from local storage in one of the specified data format.
 * If data is set to null, then it is removed from local storage.
 * If needed, it stringify data for persistence in local storage or parse such data to be retrieved
 * in desired format.
 */
class LocalStorageHandlerProxy extends NamedObservable_1.NamedObservable {
    /**
     * Stringify object/string and saves it to local storage with expiration date.
     *
     * @param {LocalStorageItems} name
     * @param {string | TItem | null} item
     * @returns {Promise<void>}
     * @protected
     */
    saveItem(name, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wrappedItem = {
                    item,
                    timestamp: Date.now(),
                };
                if (name === types_1.LocalStorageItems.CHECKOUT) {
                    if (item === null || item === void 0 ? void 0 : item._W) {
                        yield async_storage_1.default.setItem(name, JSON.stringify(item._W || {}));
                    }
                    else {
                        yield async_storage_1.default.setItem(name, JSON.stringify(item || {}));
                    }
                }
                else {
                    yield async_storage_1.default.setItem(name, JSON.stringify(wrappedItem));
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
            this.notifyChange(name, item);
        });
    }
    /**
     * Retrieve item from local storage and parse it as object/string.
     *
     * @param {LocalStorageItems} name
     * @returns {Promise<TItem | null>}
     * @protected
     */
    static retrieveItem(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield async_storage_1.default.getItem(name);
                if (!value)
                    return null;
                const item = JSON.parse(value);
                if (utils_1.isExpired(item)) {
                    yield async_storage_1.default.removeItem(name);
                    return null;
                }
                if (name === "data_checkout") {
                    return item;
                }
                else {
                    return item.value;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    /**
     * Remove whole storage data
     *
     * @returns {Promise<void>}
     * @protected
     */
    clearStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield async_storage_1.default.clear();
            }
            catch (error) {
                throw new Error(error.message);
            }
            this.notifyChange(types_1.LocalStorageEvents.CLEAR, undefined);
        });
    }
}
exports.default = LocalStorageHandlerProxy;
//# sourceMappingURL=Proxy.js.map