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
exports.SaleorCartAPI = void 0;
const helpers_1 = require("../../helpers");
const types_1 = require("../../state/types");
class SaleorCartAPI extends helpers_1.ErrorListener {
    constructor(localStorageManager, apolloClientManager, saleorState, jobsManager) {
        super();
        this.addItem = (variantId, quantity) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            // 1. save in local storage
            // await this.localStorageManager.addItemToCart(variantId, quantity);
            // 2. save online if possible (if checkout id available)
            // if (this.saleorState.checkout?.lines) {
            //   const {
            //     data,
            //     error,
            //   } = await this.apolloClientManager.getRefreshedCheckoutLines(
            //     this.saleorState.checkout?.lines
            //   );
            //   if (error) {
            //     this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
            //   } else {
            //     const uls = this.saleorState?.checkout?.lines?.map(l => {
            //       const fd = data?.find(d => d?.id === l?.id);
            //       if(fd){
            //         return {
            //           ...fd
            //         };
            //       } else {
            //         return l;
            //       }
            //     });
            //     console.log("flick debug", this.saleorState?.checkout?.lines, data, uls);
            //     await this.localStorageManager.getHandler().setCheckout({
            //       ...(this.saleorState.checkout?._W? this.saleorState.checkout?._W: this.saleorState.checkout),
            //       lines: uls,
            //     });
            //   }
            // }
            console.log("in additem");
            if (((_b = (_a = this.saleorState.checkout) === null || _a === void 0 ? void 0 : _a._W) === null || _b === void 0 ? void 0 : _b.id) || ((_c = this.saleorState.checkout) === null || _c === void 0 ? void 0 : _c.id)) {
                console.log("in additem if");
                const { data, error } = yield this.jobsManager.run("cart", "setCartItemTwo", { variantId, quantity });
                console.log("addItem", data, error);
                if (error) {
                    console.log("in error addItem", error);
                    return {
                        error,
                    };
                }
                console.log("in data addItem", data);
                return {
                    data,
                    pending: true,
                };
            }
            return {
                pending: false,
            };
        });
        this.setCartItem = () => __awaiter(this, void 0, void 0, function* () {
            console.log("in empty setCartItem");
            return {};
            // if (this.saleorState.checkout?._W?.id || this.saleorState.checkout?.id) {
            //   const { data, error } = await this.jobsManager.addToQueue("cart", "setCartItem");
            //   if (error) {
            //     console.log("in error setCartItem",error)
            //     return { 
            //       error,
            //     };
            //   }
            //   console.log("in data setCartItem",data)
            //   return { 
            //     data,
            //     pending: true,
            //   };
            // }
            // return {
            //   pending: false,
            // };
        });
        this.removeItem = (variantId) => __awaiter(this, void 0, void 0, function* () {
            var _d, _e, _f;
            // 1. save in local storage
            // this.localStorageManager.removeItemFromCart(variantId);
            // 2. save online if possible (if checkout id available)
            // if (this.saleorState.checkout?.lines) {
            //   const {
            //     data,
            //     error,
            //   } = await this.apolloClientManager.getRefreshedCheckoutLines(
            //     this.saleorState.checkout?.lines
            //   );
            //   if (error) {
            //     this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
            //   } else {
            //     const ll = data?.filter(line => this?.saleorState?.checkout?.lines?.find(l => l?.variant?.id === line?.variant?.id));
            //     await this.localStorageManager.getHandler().setCheckout({
            //       ...this.saleorState.checkout,
            //       lines: ll,
            //     });
            //   }
            // }
            if (((_e = (_d = this.saleorState.checkout) === null || _d === void 0 ? void 0 : _d._W) === null || _e === void 0 ? void 0 : _e.id) || ((_f = this.saleorState.checkout) === null || _f === void 0 ? void 0 : _f.id)) {
                console.log("in removeItem if");
                const { data, error } = yield this.jobsManager.run("cart", "removeCartTwo", { variantId });
                console.log("removeItem", data, error);
                if (error) {
                    console.log("in error removeItem", error);
                    return {
                        error,
                    };
                }
                console.log("in data removeItem", data);
                return {
                    data,
                    pending: true,
                };
            }
            return {
                pending: false,
            };
        });
        this.subtractItem = (variantId) => __awaiter(this, void 0, void 0, function* () {
            var _g, _h, _j;
            // 1. save in local storage
            this.localStorageManager.subtractItemFromCart(variantId);
            // 2. save online if possible (if checkout id available)
            // if (this.saleorState.checkout?.lines) {
            //   const {
            //     data,
            //     error,
            //   } = await this.apolloClientManager.getRefreshedCheckoutLines(
            //     this.saleorState.checkout?.lines
            //   );
            //   if (error) {
            //     this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
            //   } else {
            //     await this.localStorageManager.getHandler().setCheckout({
            //       ...(this.saleorState.checkout?._W? this.saleorState.checkout?._W: this.saleorState.checkout),
            //       lines: data,
            //     });
            //   }
            // }
            if (((_h = (_g = this.saleorState.checkout) === null || _g === void 0 ? void 0 : _g._W) === null || _h === void 0 ? void 0 : _h.id) || ((_j = this.saleorState.checkout) === null || _j === void 0 ? void 0 : _j.id)) {
                console.log("in subtractItem if");
                const { data, error } = yield this.jobsManager.run("cart", "setCartItem");
                console.log("subtractItem", data, error);
                if (error) {
                    console.log("in error subtractItem", error);
                    return {
                        error,
                    };
                }
                console.log("in data subtractItem", data);
                return {
                    data,
                    pending: true,
                };
            }
            return {
                pending: false,
            };
        });
        this.updateItem = (variantId, quantity) => __awaiter(this, void 0, void 0, function* () {
            var _k, _l, _m;
            // 1. save in local storage
            this.localStorageManager.updateItemInCart(variantId, quantity);
            // 2. save online if possible (if checkout id available)
            // if (this.saleorState.checkout?.lines) {
            //   const {
            //     data,
            //     error,
            //   } = await this.apolloClientManager.getRefreshedCheckoutLines(
            //     this.saleorState.checkout?.lines
            //   );
            //   if (error) {
            //     this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
            //   } else {
            //     await this.localStorageManager.getHandler().setCheckout({
            //       ...(this.saleorState.checkout?._W? this.saleorState.checkout?._W: this.saleorState.checkout),
            //       lines: data,
            //     });
            //   }
            // }
            if (((_l = (_k = this.saleorState.checkout) === null || _k === void 0 ? void 0 : _k._W) === null || _l === void 0 ? void 0 : _l.id) || ((_m = this.saleorState.checkout) === null || _m === void 0 ? void 0 : _m.id)) {
                console.log("in updateItem if");
                const { data, error } = yield this.jobsManager.run("cart", "setCartItem");
                console.log("updateItem", data, error);
                if (error) {
                    this.localStorageManager.updateItemInCart(variantId, quantity - 1);
                    console.log("in error updateItem", error);
                    return {
                        error,
                    };
                }
                console.log("in data updateItem", data);
                return {
                    data,
                    pending: true,
                };
            }
            return {
                pending: false,
            };
        });
        //method to update cart with latest checkout
        this.updateCart = () => __awaiter(this, void 0, void 0, function* () {
            if (this.saleorState.checkout) {
                this.jobsManager.addToQueue("cart", "setCartItem");
            }
        });
        this.saleorState = saleorState;
        this.localStorageManager = localStorageManager;
        this.apolloClientManager = apolloClientManager;
        this.jobsManager = jobsManager;
        this.loaded = false;
        this.jobsManager.attachErrorListener("cart", this.fireError);
        this.saleorState.subscribeToChange(types_1.StateItems.CHECKOUT, (checkout) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            console.log("flick stc", checkout === null || checkout === void 0 ? void 0 : checkout.lines);
            const checkUndefined = (lines) => {
                return lines === null || lines === void 0 ? void 0 : lines.find((line) => line.id === undefined);
            };
            if (checkout === null || checkout === void 0 ? void 0 : checkout._W) {
                if (((_a = this.items) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = checkout === null || checkout === void 0 ? void 0 : checkout._W) === null || _b === void 0 ? void 0 : _b.lines.length) || checkUndefined(this.items)) {
                    this.items = (_d = (_c = checkout === null || checkout === void 0 ? void 0 : checkout._W) === null || _c === void 0 ? void 0 : _c.lines) === null || _d === void 0 ? void 0 : _d.filter(line => line.quantity > 0);
                }
                else {
                    this.items = (_e = this.items) === null || _e === void 0 ? void 0 : _e.filter(line => line.quantity > 0);
                }
                // .sort(sortCheckoutLines);
            }
            else {
                if (((_f = this.items) === null || _f === void 0 ? void 0 : _f.length) !== ((_g = checkout === null || checkout === void 0 ? void 0 : checkout.lines) === null || _g === void 0 ? void 0 : _g.length) || checkUndefined(this.items)) {
                    this.items = (_h = checkout === null || checkout === void 0 ? void 0 : checkout.lines) === null || _h === void 0 ? void 0 : _h.filter(line => line.quantity > 0);
                }
                else {
                    this.items = (_j = this.items) === null || _j === void 0 ? void 0 : _j.filter(line => line.quantity > 0);
                }
                // .sort(sortCheckoutLines);
            }
        });
        this.saleorState.subscribeToChange(types_1.StateItems.SUMMARY_PRICES, (summaryPrices) => {
            const { totalPrice, subtotalPrice, shippingPrice, discount } = summaryPrices || {};
            this.totalPrice = totalPrice;
            this.subtotalPrice = subtotalPrice;
            this.shippingPrice = shippingPrice;
            this.discount = discount;
        });
        this.saleorState.subscribeToChange(types_1.StateItems.LOADED, (loaded) => {
            this.loaded = loaded.checkout && loaded.summaryPrices;
        });
    }
}
exports.SaleorCartAPI = SaleorCartAPI;
//# sourceMappingURL=index.js.map