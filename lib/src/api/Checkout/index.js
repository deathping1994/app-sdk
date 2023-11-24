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
exports.SaleorCheckoutAPI = void 0;
const helpers_1 = require("../../helpers");
const types_1 = require("../../state/types");
const types_2 = require("./types");
class SaleorCheckoutAPI extends helpers_1.ErrorListener {
    constructor(saleorState, jobsManager) {
        super();
        this.createCheckoutNew = (shippingAddress, email, variantId, quantity) => __awaiter(this, void 0, void 0, function* () {
            const alteredLines = [{
                    quantity: quantity,
                    variantId: variantId,
                }];
            console.log('sdfkjndsf', alteredLines);
            const { data, dataError } = yield this.jobsManager.run("checkout", "createCheckout", {
                email,
                lines: alteredLines !== null && alteredLines !== void 0 ? alteredLines : [],
                selectedShippingAddressId: shippingAddress.id,
                shippingAddress,
            });
            return {
                data,
                dataError,
                pending: false,
            };
        });
        this.setShippingAddress = (shippingAddress, email) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const co = ((_a = this.saleorState.checkout) === null || _a === void 0 ? void 0 : _a._W) ? (_b = this.saleorState.checkout) === null || _b === void 0 ? void 0 : _b._W : this.saleorState.checkout;
            const checkoutId = co === null || co === void 0 ? void 0 : co.id;
            const alteredLines = (_c = co === null || co === void 0 ? void 0 : co.lines) === null || _c === void 0 ? void 0 : _c.map(item => {
                var _a;
                return ({
                    quantity: item === null || item === void 0 ? void 0 : item.quantity,
                    variantId: (_a = item === null || item === void 0 ? void 0 : item.variant) === null || _a === void 0 ? void 0 : _a.id,
                });
            });
            if (alteredLines && checkoutId) {
                const { data, dataError } = yield this.jobsManager.run("checkout", "setShippingAddress", {
                    checkoutId,
                    email,
                    selectedShippingAddressId: shippingAddress.id,
                    shippingAddress,
                });
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            const { data, dataError } = yield this.jobsManager.run("checkout", "createCheckout", {
                email,
                lines: alteredLines !== null && alteredLines !== void 0 ? alteredLines : [],
                selectedShippingAddressId: shippingAddress.id,
                shippingAddress,
            });
            return {
                data,
                dataError,
                pending: false,
            };
        });
        this.setAddressType = (addressId, type) => __awaiter(this, void 0, void 0, function* () {
            const { data, dataError } = yield this.jobsManager.run("checkout", "setAddressType", { addressId, type });
            return {
                data,
                dataError,
            };
        });
        this.setBillingAddress = (billingAddress, email) => __awaiter(this, void 0, void 0, function* () {
            var _d, _e, _f, _g, _h;
            const co = ((_d = this.saleorState.checkout) === null || _d === void 0 ? void 0 : _d._W) ? (_e = this.saleorState.checkout) === null || _e === void 0 ? void 0 : _e._W : this.saleorState.checkout;
            const checkoutId = co === null || co === void 0 ? void 0 : co.id;
            const isShippingRequiredForProducts = (_f = co === null || co === void 0 ? void 0 : co.lines) === null || _f === void 0 ? void 0 : _f.filter(line => line.quantity > 0).some(({ variant }) => { var _a; return (_a = variant.product) === null || _a === void 0 ? void 0 : _a.productType.isShippingRequired; });
            const alteredLines = (_g = co === null || co === void 0 ? void 0 : co.lines) === null || _g === void 0 ? void 0 : _g.map(item => ({
                quantity: item.quantity,
                variantId: item === null || item === void 0 ? void 0 : item.variant.id,
            }));
            if (isShippingRequiredForProducts &&
                checkoutId && ((_h = this.checkout) === null || _h === void 0 ? void 0 : _h.shippingAddress)) {
                const { data, dataError } = yield this.jobsManager.run("checkout", "setBillingAddress", {
                    billingAddress,
                    billingAsShipping: false,
                    checkoutId,
                    selectedBillingAddressId: billingAddress.id,
                });
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            if (isShippingRequiredForProducts) {
                return {
                    functionError: {
                        error: new Error("You need to set shipping address before setting billing address."),
                        type: types_2.FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
                    },
                    pending: false,
                };
            }
            if (!isShippingRequiredForProducts && email && checkoutId && alteredLines) {
                const { data, dataError } = yield this.jobsManager.run("checkout", "setBillingAddressWithEmail", {
                    billingAddress,
                    checkoutId,
                    email,
                    selectedBillingAddressId: billingAddress.id,
                });
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            if (!isShippingRequiredForProducts && email && alteredLines) {
                const { data, dataError } = yield this.jobsManager.run("checkout", "createCheckout", {
                    billingAddress,
                    email,
                    lines: alteredLines,
                    selectedBillingAddressId: billingAddress.id,
                });
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            if (!isShippingRequiredForProducts && !email) {
                return {
                    functionError: {
                        error: new Error("You need to provide email when products do not require shipping before setting billing address."),
                        type: types_2.FunctionErrorCheckoutTypes.EMAIL_NOT_SET,
                    },
                    pending: false,
                };
            }
            return {
                functionError: {
                    error: new Error("You need to add items to cart before setting billing address."),
                    type: types_2.FunctionErrorCheckoutTypes.ITEMS_NOT_ADDED_TO_CART,
                },
                pending: false,
            };
        });
        this.setBillingAsShippingAddress = () => __awaiter(this, void 0, void 0, function* () {
            var _j, _k, _l;
            const checkoutId = (_j = this.saleorState.checkout) === null || _j === void 0 ? void 0 : _j.id;
            if (checkoutId && ((_k = this.checkout) === null || _k === void 0 ? void 0 : _k.shippingAddress)) {
                const { data, dataError } = yield this.jobsManager.run("checkout", "setBillingAddress", {
                    billingAddress: this.checkout.shippingAddress,
                    billingAsShipping: true,
                    checkoutId,
                    selectedBillingAddressId: (_l = this.checkout) === null || _l === void 0 ? void 0 : _l.shippingAddress.id,
                });
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            return {
                functionError: {
                    error: new Error("You need to set shipping address before setting billing address."),
                    type: types_2.FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
                },
                pending: false,
            };
        });
        this.updateCheckoutPayment = (gatewayId, useCashback) => __awaiter(this, void 0, void 0, function* () {
            var _m;
            const checkoutId = (_m = this.saleorState.checkout) === null || _m === void 0 ? void 0 : _m.id;
            if (checkoutId) {
                const { data, dataError } = yield this.jobsManager.run("checkout", "updateCheckoutPayment", {
                    checkoutId,
                    gatewayId,
                    useCashback
                });
                console.log('dsfb', checkoutId, gatewayId, data);
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            return {
                functionError: {
                    error: new Error("payment not updated"),
                },
                pending: false,
            };
        });
        this.setShippingMethod = (shippingMethodId) => __awaiter(this, void 0, void 0, function* () {
            var _o;
            const checkoutId = (_o = this.saleorState.checkout) === null || _o === void 0 ? void 0 : _o.id;
            if (checkoutId) {
                const { data, dataError } = yield this.jobsManager.run("checkout", "setShippingMethod", {
                    checkoutId,
                    shippingMethodId,
                });
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            return {
                functionError: {
                    error: new Error("You need to set shipping address before setting shipping method."),
                    type: types_2.FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
                },
                pending: false,
            };
        });
        this.addPromoCode = (promoCode) => __awaiter(this, void 0, void 0, function* () {
            var _p;
            const checkoutId = (_p = this.saleorState.checkout) === null || _p === void 0 ? void 0 : _p.id;
            if (checkoutId) {
                const { data, dataError } = yield this.jobsManager.run("checkout", "addPromoCode", {
                    checkoutId,
                    promoCode,
                });
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            return {
                functionError: {
                    error: new Error("You need to set shipping address before modifying promo code."),
                    type: types_2.FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
                },
                pending: false,
            };
        });
        this.removePromoCode = (promoCode) => __awaiter(this, void 0, void 0, function* () {
            var _q;
            const checkoutId = (_q = this.saleorState.checkout) === null || _q === void 0 ? void 0 : _q.id;
            if (checkoutId) {
                const { data, dataError } = yield this.jobsManager.run("checkout", "removePromoCode", { checkoutId, promoCode });
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            return {
                functionError: {
                    error: new Error("You need to set shipping address before modifying promo code."),
                    type: types_2.FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
                },
                pending: false,
            };
        });
        this.createPayment = (input) => __awaiter(this, void 0, void 0, function* () {
            var _r, _s, _t, _u;
            const checkoutId = (_r = this.saleorState.checkout) === null || _r === void 0 ? void 0 : _r.id;
            const billingAddress = (_s = this.saleorState.checkout) === null || _s === void 0 ? void 0 : _s.billingAddress;
            const amount = (_u = (_t = this.saleorState.summaryPrices) === null || _t === void 0 ? void 0 : _t.totalPrice) === null || _u === void 0 ? void 0 : _u.gross.amount;
            if (checkoutId &&
                billingAddress &&
                amount !== null &&
                amount !== undefined) {
                const { data, dataError } = yield this.jobsManager.run("checkout", "createPayment", Object.assign(Object.assign({}, input), { amount,
                    billingAddress,
                    checkoutId }));
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            return {
                functionError: {
                    error: new Error("You need to set billing address before creating payment."),
                    type: types_2.FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
                },
                pending: false,
            };
        });
        this.completeCheckout = (input) => __awaiter(this, void 0, void 0, function* () {
            var _v, _w;
            const co = ((_v = this.saleorState.checkout) === null || _v === void 0 ? void 0 : _v._W) ? (_w = this.saleorState.checkout) === null || _w === void 0 ? void 0 : _w._W : this.saleorState.checkout;
            const checkoutId = co === null || co === void 0 ? void 0 : co.id;
            if (checkoutId) {
                const { data, dataError } = yield this.jobsManager.run("checkout", "completeCheckout", Object.assign(Object.assign({}, input), { checkoutId }));
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            return {
                functionError: {
                    error: new Error("You need to set shipping address before creating payment."),
                    type: types_2.FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
                },
                pending: false,
            };
        });
        this.saleorState = saleorState;
        this.jobsManager = jobsManager;
        this.loaded = false;
        this.saleorState.subscribeToChange(types_1.StateItems.CHECKOUT, (checkout) => {
            const { id, token, email, shippingAddress, billingAddress, selectedShippingAddressId, selectedBillingAddressId, billingAsShipping, availablePaymentGateways, availableShippingMethods, shippingMethod, promoCodeDiscount, } = checkout || {};
            this.checkout = {
                billingAddress,
                email,
                id,
                shippingAddress,
                shippingMethod,
                token,
            };
            this.selectedShippingAddressId = selectedShippingAddressId;
            this.selectedBillingAddressId = selectedBillingAddressId;
            this.availablePaymentGateways = availablePaymentGateways;
            this.availableShippingMethods = availableShippingMethods;
            this.billingAsShipping = billingAsShipping;
            this.promoCodeDiscount = {
                discount: promoCodeDiscount === null || promoCodeDiscount === void 0 ? void 0 : promoCodeDiscount.discount,
                discountName: promoCodeDiscount === null || promoCodeDiscount === void 0 ? void 0 : promoCodeDiscount.discountName,
                voucherCode: promoCodeDiscount === null || promoCodeDiscount === void 0 ? void 0 : promoCodeDiscount.voucherCode,
            };
        });
        this.saleorState.subscribeToChange(types_1.StateItems.PAYMENT, (payment) => {
            const { id, token, gateway, creditCard, total } = payment || {};
            this.payment = {
                creditCard,
                gateway,
                id,
                token,
                total,
            };
        });
        this.saleorState.subscribeToChange(types_1.StateItems.LOADED, (loaded) => {
            this.loaded = loaded.checkout && loaded.payment;
        });
    }
}
exports.SaleorCheckoutAPI = SaleorCheckoutAPI;
//# sourceMappingURL=index.js.map