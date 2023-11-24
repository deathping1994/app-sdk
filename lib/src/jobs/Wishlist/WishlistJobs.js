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
exports.WishlistJobs = exports.ErrorCartTypes = void 0;
const JobsHandler_1 = require("../JobsHandler");
var ErrorCartTypes;
(function (ErrorCartTypes) {
    ErrorCartTypes[ErrorCartTypes["SET_CART_ITEM"] = 0] = "SET_CART_ITEM";
})(ErrorCartTypes = exports.ErrorCartTypes || (exports.ErrorCartTypes = {}));
class WishlistJobs extends JobsHandler_1.JobsHandler {
    constructor(localStorageHandler, apolloClientManager) {
        super();
        this.getWishlist = () => __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.apolloClientManager.getWishlistItems(20);
            if (error) {
                return {
                    dataError: {
                        error,
                    },
                };
            }
            if (data) {
                this.localStorageHandler.setWishlist({
                    items: data === null || data === void 0 ? void 0 : data.items.edges.map(edge => edge.node.product),
                });
            }
            return { data };
        });
        this.addItemInWishlist = ({ productId }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { data, error } = yield this.apolloClientManager.addWishlistItems(productId);
            if (error) {
                return {
                    dataError: {
                        error,
                    },
                };
            }
            if (data)
                this.localStorageHandler.setWishlist({
                    items: (_a = data[0]) === null || _a === void 0 ? void 0 : _a.wishlist.items.edges.map(edge => edge.node.product),
                });
            return { data };
        });
        this.localStorageHandler = localStorageHandler;
        this.apolloClientManager = apolloClientManager;
    }
}
exports.WishlistJobs = WishlistJobs;
//# sourceMappingURL=WishlistJobs.js.map