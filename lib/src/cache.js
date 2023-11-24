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
exports.createSaleorCache = void 0;
const client_1 = require("@apollo/client");
const apollo3_cache_persist_1 = require("apollo3-cache-persist");
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
/**
 * Creates cache for Apollo client.
 * @param cacheConfig Configuration for created cache.
 */
exports.createSaleorCache = ({ persistCache = false, }) => __awaiter(void 0, void 0, void 0, function* () {
    const saleorCache = new client_1.InMemoryCache({
        dataIdFromObject: obj => {
            // eslint-disable-next-line no-underscore-dangle
            if (obj.__typename === "Shop") {
                return "shop";
            }
            return client_1.defaultDataIdFromObject(obj);
        },
    });
    if (persistCache) {
        yield apollo3_cache_persist_1.persistCache({
            cache: saleorCache,
            storage: new apollo3_cache_persist_1.AsyncStorageWrapper(async_storage_1.default),
        });
    }
    return saleorCache;
});
//# sourceMappingURL=cache.js.map