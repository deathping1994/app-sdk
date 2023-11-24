"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleorAPI = void 0;
const config_1 = require("../config");
const data_1 = require("../data");
const ApolloClientManager_1 = require("../data/ApolloClientManager");
const LocalStorageHandler_1 = require("../helpers/LocalStorageHandler");
const jobs_1 = require("../jobs");
const state_1 = require("../state");
const Auth_1 = require("./Auth");
const Cart_1 = require("./Cart");
const Checkout_1 = require("./Checkout");
const collections_1 = require("./collections/collections");
const categories_1 = require("./categories/categories");
const products_1 = require("./products/products");
const Wishlist_1 = require("./Wishlist");
__exportStar(require("./Checkout"), exports);
__exportStar(require("./Cart"), exports);
class SaleorAPI {
    constructor(auth, checkout, cart, wishlist, categories, collections, products, legacyAPIProxy) {
        this.auth = auth;
        this.checkout = checkout;
        this.cart = cart;
        this.categories = categories;
        this.collections = collections;
        this.products = products;
        this.wishlist = wishlist;
        this.legacyAPIProxy = legacyAPIProxy;
    }
    static create(client, apiProxy, config, onStateUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalConfig = Object.assign(Object.assign(Object.assign({}, config_1.defaultConfig), config), { loadOnStart: Object.assign(Object.assign({}, config_1.defaultConfig.loadOnStart), config === null || config === void 0 ? void 0 : config.loadOnStart) });
            const localStorageHandler = new LocalStorageHandler_1.LocalStorageHandler();
            const apolloClientManager = new ApolloClientManager_1.ApolloClientManager(client);
            const jobsManager = yield jobs_1.JobsManager.create(localStorageHandler, apolloClientManager);
            const saleorState = yield state_1.SaleorState.create(finalConfig, localStorageHandler, apolloClientManager, jobsManager);
            const localStorageManager = new data_1.LocalStorageManager(localStorageHandler, saleorState);
            if (onStateUpdate) {
                saleorState.subscribeToNotifiedChanges(onStateUpdate);
            }
            const authApi = yield Auth_1.AuthAPI.create(saleorState, jobsManager, finalConfig);
            return new SaleorAPI(
            // Create properties with async results
            authApi, new Checkout_1.SaleorCheckoutAPI(saleorState, jobsManager), new Cart_1.SaleorCartAPI(localStorageManager, apolloClientManager, saleorState, jobsManager), new Wishlist_1.SaleorWishlistAPI(localStorageManager, apolloClientManager, saleorState, jobsManager), new categories_1.CategoriesAPI(client), new collections_1.CollectionsAPI(client), new products_1.ProductsAPI(client), apiProxy);
        });
    }
}
exports.SaleorAPI = SaleorAPI;
//# sourceMappingURL=index.js.map