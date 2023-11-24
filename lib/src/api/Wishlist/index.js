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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleorWishlistAPI = void 0;
const helpers_1 = require("../../helpers");
const types_1 = require("../../state/types");
class SaleorWishlistAPI extends helpers_1.ErrorListener {
    constructor(localStorageManager, apolloClientManager, saleorState, jobsManager) {
        super();
        this.getWishlist = () => __awaiter(this, void 0, void 0, function* () {
            const { data, dataError } = yield this.jobsManager.run("wishlist", "getWishlist", undefined);
            return {
                data,
                dataError,
            };
        });
        this.addItemInWishlist = (productId) => __awaiter(this, void 0, void 0, function* () {
            const { data, dataError } = yield this.jobsManager.run("wishlist", "addItemInWishlist", { productId });
            return {
                data,
                dataError,
            };
        });
        this.removeItemInWishlist = (productId) => __awaiter(this, void 0, void 0, function* () {
            // 1. save in local storage
            var _a;
            // 2. save online if possible (if checkout id available)
            const { data } = yield this.apolloClientManager.removeWishlistItems(productId);
            this.localStorageManager.addItemInWishlist(data ? (_a = data[0]) === null || _a === void 0 ? void 0 : _a.wishlist.items.edges.map(edge => edge.node.product) : []);
        });
        this.saleorState = saleorState;
        this.localStorageManager = localStorageManager;
        this.apolloClientManager = apolloClientManager;
        this.jobsManager = jobsManager;
        this.loaded = false;
        this.jobsManager.attachErrorListener("cart", this.fireError);
        this.saleorState.subscribeToChange(types_1.StateItems.WISHLIST, (wishlist) => {
            this.items = wishlist === null || wishlist === void 0 ? void 0 : wishlist.items;
        });
        this.saleorState.subscribeToChange(types_1.StateItems.LOADED, (loaded) => {
            this.loaded = loaded.checkout && loaded.summaryPrices;
        });
        this.saleorState.loadWishlist();
    }
}
exports.SaleorWishlistAPI = SaleorWishlistAPI;
//# sourceMappingURL=index.js.map