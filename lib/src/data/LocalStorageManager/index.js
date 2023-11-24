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
exports.LocalStorageManager = void 0;
class LocalStorageManager {
    constructor(handler, saleorState) {
        this.getHandler = () => {
            return this.handler;
        };
        this.addItemToCart = (variantId, quantity) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const lines = ((_a = this.saleorState.checkout) === null || _a === void 0 ? void 0 : _a.lines) || [];
            let variantInCheckout = lines.find(variant => variant.variant.id === variantId);
            const alteredLines = lines.filter(variant => variant.variant.id !== variantId);
            const newVariantQuantity = variantInCheckout
                ? variantInCheckout.quantity + quantity
                : quantity;
            if (variantInCheckout) {
                variantInCheckout.quantity = newVariantQuantity;
                alteredLines.push(variantInCheckout);
            }
            else {
                variantInCheckout = {
                    quantity,
                    variant: {
                        id: variantId,
                    },
                };
                alteredLines.push(variantInCheckout);
            }
            const alteredCheckout = this.saleorState.checkout
                ? Object.assign(Object.assign({}, (((_b = this.saleorState.checkout) === null || _b === void 0 ? void 0 : _b._W) ? (_c = this.saleorState.checkout) === null || _c === void 0 ? void 0 : _c._W : this.saleorState.checkout)), { lines: alteredLines }) : {
                lines: alteredLines,
            };
            yield this.handler.setCheckout(alteredCheckout);
            return alteredCheckout;
        });
        this.removeItemFromCart = (variantId) => __awaiter(this, void 0, void 0, function* () {
            var _d, _e, _f;
            const lines = ((_d = this.saleorState.checkout) === null || _d === void 0 ? void 0 : _d.lines) || [];
            const variantInCheckout = lines.find(variant => variant.variant.id === variantId);
            const alteredLines = lines.filter(variant => variant.variant.id !== variantId);
            if (variantInCheckout) {
                variantInCheckout.quantity = 0;
                alteredLines.push(variantInCheckout);
            }
            const alteredCheckout = this.saleorState.checkout
                ? Object.assign(Object.assign({}, (((_e = this.saleorState.checkout) === null || _e === void 0 ? void 0 : _e._W) ? (_f = this.saleorState.checkout) === null || _f === void 0 ? void 0 : _f._W : this.saleorState.checkout)), { lines: alteredLines }) : {
                lines: alteredLines,
            };
            yield this.handler.setCheckout(alteredCheckout);
            return alteredCheckout;
        });
        this.subtractItemFromCart = (variantId) => __awaiter(this, void 0, void 0, function* () {
            var _g, _h, _j;
            const lines = ((_g = this.saleorState.checkout) === null || _g === void 0 ? void 0 : _g.lines) || [];
            const variantFromCart = lines.find(variant => variant.variant.id === variantId);
            const alteredLines = lines.filter(variant => variant.variant.id !== variantId);
            const newVariantQuantity = variantFromCart
                ? variantFromCart.quantity - 1
                : 0;
            if (variantFromCart) {
                variantFromCart.quantity = newVariantQuantity;
                alteredLines.push(variantFromCart);
            }
            const alteredCheckout = this.saleorState.checkout
                ? Object.assign(Object.assign({}, (((_h = this.saleorState.checkout) === null || _h === void 0 ? void 0 : _h._W) ? (_j = this.saleorState.checkout) === null || _j === void 0 ? void 0 : _j._W : this.saleorState.checkout)), { lines: alteredLines }) : {
                lines: alteredLines,
            };
            yield this.handler.setCheckout(alteredCheckout);
            return alteredCheckout;
        });
        this.updateItemInCart = (variantId, quantity) => __awaiter(this, void 0, void 0, function* () {
            var _k, _l, _m;
            const lines = ((_k = this.saleorState.checkout) === null || _k === void 0 ? void 0 : _k.lines) || [];
            const variantInCheckout = lines.find(variant => variant.variant.id === variantId);
            const alteredLines = lines.filter(variant => variant.variant.id !== variantId);
            if (variantInCheckout) {
                variantInCheckout.quantity = quantity;
                alteredLines.push(variantInCheckout);
            }
            const alteredCheckout = this.saleorState.checkout
                ? Object.assign(Object.assign({}, (((_l = this.saleorState.checkout) === null || _l === void 0 ? void 0 : _l._W) ? (_m = this.saleorState.checkout) === null || _m === void 0 ? void 0 : _m._W : this.saleorState.checkout)), { lines: alteredLines }) : {
                lines: alteredLines,
            };
            yield this.handler.setCheckout(alteredCheckout);
            return alteredCheckout;
        });
        this.addItemInWishlist = (productList) => {
            // const items = this.saleorState.wishlist?.items;
            // items?.push(product);
            const wishlist = { items: productList };
            this.handler.setWishlist(wishlist);
        };
        this.handler = handler;
        this.saleorState = saleorState;
    }
}
exports.LocalStorageManager = LocalStorageManager;
//# sourceMappingURL=index.js.map