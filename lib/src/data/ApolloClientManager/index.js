"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.ApolloClientManager = void 0;
const globalTypes_1 = require("../../gqlTypes/globalTypes");
const AuthMutations = __importStar(require("../../mutations/auth"));
const UserMutations = __importStar(require("../../mutations/user"));
const CheckoutMutations = __importStar(require("../../mutations/checkout"));
const WishlistMutations = __importStar(require("../../mutations/wishlist"));
const CheckoutQueries = __importStar(require("../../queries/checkout"));
const UserQueries = __importStar(require("../../queries/user"));
const utils_1 = require("../../utils");
const wishlist_1 = require("../../queries/wishlist");
class ApolloClientManager {
    constructor(client) {
        this.subscribeToUserChange = (next, error, complete) => {
            this.client
                .watchQuery({
                fetchPolicy: "cache-and-network",
                query: UserQueries.getUserDetailsQuery,
            })
                .subscribe(value => { var _a; return next((_a = value.data) === null || _a === void 0 ? void 0 : _a.me); }, error, complete);
        };
        this.getWishlistItems = (first) => __awaiter(this, void 0, void 0, function* () {
            const { data, errors } = yield this.client.query({
                query: wishlist_1.getWishlist,
                variables: {
                    first,
                },
                fetchPolicy: "network-only",
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            return {
                data: data.wishlist,
            };
        });
        this.addWishlistItems = (productId) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { data, errors } = yield this.client.mutate({
                mutation: WishlistMutations.WishlistAddProduct,
                variables: {
                    productId,
                },
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            return {
                data: (_a = data === null || data === void 0 ? void 0 : data.WishlistAddProduct) === null || _a === void 0 ? void 0 : _a.wishlist,
            };
        });
        this.removeWishlistItems = (productId) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const { data, errors } = yield this.client.mutate({
                mutation: WishlistMutations.WishlistRemoveProduct,
                variables: {
                    productId,
                },
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            return {
                data: (_b = data === null || data === void 0 ? void 0 : data.WishlistRemoveProduct) === null || _b === void 0 ? void 0 : _b.wishlist,
            };
        });
        this.getUser = () => __awaiter(this, void 0, void 0, function* () {
            const { data, errors } = yield this.client.query({
                fetchPolicy: "network-only",
                query: UserQueries.getUserDetailsQuery,
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            return {
                data: data === null || data === void 0 ? void 0 : data.me,
            };
        });
        this.registerAccount = (email, password, redirectUrl) => __awaiter(this, void 0, void 0, function* () {
            var _c, _d;
            const { data, errors } = yield this.client.mutate({
                fetchPolicy: "no-cache",
                mutation: UserMutations.registerAccount,
                variables: {
                    email,
                    password,
                    redirectUrl,
                },
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            if ((_c = data === null || data === void 0 ? void 0 : data.accountRegister) === null || _c === void 0 ? void 0 : _c.accountErrors.length) {
                return {
                    error: data.accountRegister.accountErrors,
                };
            }
            return {
                data: {
                    requiresConfirmation: (_d = data === null || data === void 0 ? void 0 : data.accountRegister) === null || _d === void 0 ? void 0 : _d.requiresConfirmation,
                },
            };
        });
        this.resetPasswordRequest = (email, redirectUrl) => __awaiter(this, void 0, void 0, function* () {
            var _e;
            const { data, errors } = yield this.client.mutate({
                fetchPolicy: "no-cache",
                mutation: UserMutations.resetPasswordRequest,
                variables: {
                    email,
                    redirectUrl,
                },
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            if ((_e = data === null || data === void 0 ? void 0 : data.requestPasswordReset) === null || _e === void 0 ? void 0 : _e.accountErrors.length) {
                return {
                    error: data.requestPasswordReset.accountErrors,
                };
            }
            return {};
        });
        this.signIn = (email, password) => __awaiter(this, void 0, void 0, function* () {
            var _f, _g, _h, _j;
            const { data, errors } = yield this.client.mutate({
                fetchPolicy: "no-cache",
                mutation: AuthMutations.tokenAuthMutation,
                variables: {
                    email,
                    password,
                },
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            if ((_f = data === null || data === void 0 ? void 0 : data.tokenCreate) === null || _f === void 0 ? void 0 : _f.errors.length) {
                return {
                    error: data.tokenCreate.errors,
                };
            }
            return {
                data: {
                    csrfToken: (_g = data === null || data === void 0 ? void 0 : data.tokenCreate) === null || _g === void 0 ? void 0 : _g.csrfToken,
                    token: (_h = data === null || data === void 0 ? void 0 : data.tokenCreate) === null || _h === void 0 ? void 0 : _h.token,
                    user: (_j = data === null || data === void 0 ? void 0 : data.tokenCreate) === null || _j === void 0 ? void 0 : _j.user,
                },
            };
        });
        this.confirmAccountV2 = (otp, phone) => __awaiter(this, void 0, void 0, function* () {
            var _k, _l, _m, _o, _p, _q;
            const { data, errors } = yield this.client.mutate({
                fetchPolicy: "no-cache",
                mutation: AuthMutations.CONFIRM_ACCOUNT,
                variables: {
                    otp,
                    phone,
                },
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            if ((_k = data === null || data === void 0 ? void 0 : data.confirmAccountV2) === null || _k === void 0 ? void 0 : _k.errors.length) {
                return {
                    error: data.confirmAccountV2.errors,
                };
            }
            if ((_l = data === null || data === void 0 ? void 0 : data.confirmAccountV2) === null || _l === void 0 ? void 0 : _l.accountErrors.length) {
                return {
                    error: data.confirmAccountV2.accountErrors,
                };
            }
            return {
                data: {
                    csrfToken: (_m = data === null || data === void 0 ? void 0 : data.confirmAccountV2) === null || _m === void 0 ? void 0 : _m.csrfToken,
                    token: (_o = data === null || data === void 0 ? void 0 : data.confirmAccountV2) === null || _o === void 0 ? void 0 : _o.token,
                    refreshToken: (_p = data === null || data === void 0 ? void 0 : data.confirmAccountV2) === null || _p === void 0 ? void 0 : _p.refreshToken,
                    user: (_q = data === null || data === void 0 ? void 0 : data.confirmAccountV2) === null || _q === void 0 ? void 0 : _q.user,
                },
            };
        });
        this.signInMobile = (checkoutId, otp, phone) => __awaiter(this, void 0, void 0, function* () {
            var _r, _s, _t, _u, _v;
            const { data, errors } = yield this.client.mutate({
                fetchPolicy: "no-cache",
                mutation: AuthMutations.createOTPTokeMutation,
                variables: {
                    checkoutId,
                    otp,
                    phone,
                },
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            if ((_r = data === null || data === void 0 ? void 0 : data.CreateTokenOTP) === null || _r === void 0 ? void 0 : _r.otpErrors.length) {
                return {
                    error: data.CreateTokenOTP.otpErrors,
                };
            }
            return {
                data: {
                    csrfToken: (_s = data === null || data === void 0 ? void 0 : data.CreateTokenOTP) === null || _s === void 0 ? void 0 : _s.csrfToken,
                    token: (_t = data === null || data === void 0 ? void 0 : data.CreateTokenOTP) === null || _t === void 0 ? void 0 : _t.token,
                    refreshToken: (_u = data === null || data === void 0 ? void 0 : data.CreateTokenOTP) === null || _u === void 0 ? void 0 : _u.refreshToken,
                    user: (_v = data === null || data === void 0 ? void 0 : data.CreateTokenOTP) === null || _v === void 0 ? void 0 : _v.user,
                },
            };
        });
        this.signOut = () => __awaiter(this, void 0, void 0, function* () {
            yield this.client.resetStore();
        });
        this.verifySignInToken = ({ token }) => __awaiter(this, void 0, void 0, function* () {
            var _w, _x, _y, _z;
            const { data, errors } = yield this.client.mutate({
                fetchPolicy: "no-cache",
                mutation: AuthMutations.tokenVeryficationMutation,
                variables: {
                    token,
                },
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            if ((_w = data === null || data === void 0 ? void 0 : data.tokenVerify) === null || _w === void 0 ? void 0 : _w.errors.length) {
                return {
                    error: data.tokenVerify.errors,
                };
            }
            return {
                data: {
                    isValid: (_x = data === null || data === void 0 ? void 0 : data.tokenVerify) === null || _x === void 0 ? void 0 : _x.isValid,
                    payload: (_y = data === null || data === void 0 ? void 0 : data.tokenVerify) === null || _y === void 0 ? void 0 : _y.payload,
                    user: (_z = data === null || data === void 0 ? void 0 : data.tokenVerify) === null || _z === void 0 ? void 0 : _z.user,
                },
            };
        });
        this.refreshSignInToken = ({ csrfToken, refreshToken, }) => __awaiter(this, void 0, void 0, function* () {
            var _0, _1, _2;
            const { data, errors } = yield this.client.mutate({
                fetchPolicy: "no-cache",
                mutation: AuthMutations.tokenRefreshMutation,
                variables: {
                    csrfToken,
                    refreshToken,
                },
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            if ((_0 = data === null || data === void 0 ? void 0 : data.tokenRefresh) === null || _0 === void 0 ? void 0 : _0.errors.length) {
                return {
                    error: data.tokenRefresh.errors,
                };
            }
            return {
                data: {
                    token: (_1 = data === null || data === void 0 ? void 0 : data.tokenRefresh) === null || _1 === void 0 ? void 0 : _1.token,
                    user: (_2 = data === null || data === void 0 ? void 0 : data.tokenRefresh) === null || _2 === void 0 ? void 0 : _2.user,
                },
            };
        });
        this.getCheckout = (isUserSignedIn, checkoutToken) => __awaiter(this, void 0, void 0, function* () {
            let checkout;
            try {
                console.log("in getCheckout");
                checkout = yield new Promise((resolve, reject) => {
                    if (isUserSignedIn) {
                        const observable = this.client.watchQuery({
                            fetchPolicy: "network-only",
                            query: CheckoutQueries.userCheckoutDetails,
                        });
                        observable.subscribe(result => {
                            var _a;
                            const { data, errors } = result;
                            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                                reject(errors);
                            }
                            else {
                                resolve((_a = data.me) === null || _a === void 0 ? void 0 : _a.checkout);
                            }
                        }, error => {
                            reject(error);
                        });
                    }
                    else if (checkoutToken) {
                        const observable = this.client.watchQuery({
                            fetchPolicy: "network-only",
                            query: CheckoutQueries.checkoutDetails,
                            variables: {
                                token: checkoutToken,
                            },
                        });
                        observable.subscribe(result => {
                            const { data, errors } = result;
                            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                                reject(errors);
                            }
                            else {
                                resolve(data.checkout);
                            }
                        }, error => {
                            reject(error);
                        });
                    }
                    else {
                        resolve(null);
                    }
                });
                if (checkout) {
                    return {
                        data: this.constructCheckoutModel(checkout),
                    };
                }
            }
            catch (error) {
                return {
                    error,
                };
            }
            return {};
        });
        this.getRefreshedCheckoutLines = (checkoutlines) => __awaiter(this, void 0, void 0, function* () {
            const idsOfMissingVariants = checkoutlines === null || checkoutlines === void 0 ? void 0 : checkoutlines.filter(line => !line.variant || !line.totalPrice).map(line => line.variant.id);
            const linesWithProperVariant = (checkoutlines === null || checkoutlines === void 0 ? void 0 : checkoutlines.filter(line => line.variant && line.totalPrice)) || [];
            let variants;
            if (idsOfMissingVariants && idsOfMissingVariants.length) {
                try {
                    const observable = this.client.watchQuery({
                        query: CheckoutQueries.checkoutProductVariants,
                        variables: {
                            ids: idsOfMissingVariants,
                        },
                    });
                    variants = yield new Promise((resolve, reject) => {
                        observable.subscribe(result => {
                            const { data, errors } = result;
                            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                                reject(errors);
                            }
                            else {
                                resolve(data.productVariants);
                            }
                        }, error => {
                            reject(error);
                        });
                    });
                }
                catch (error) {
                    return {
                        error,
                    };
                }
            }
            const linesWithMissingVariantUpdated = variants
                ? variants.edges.map(edge => {
                    var _a, _b, _c;
                    const existingLine = checkoutlines === null || checkoutlines === void 0 ? void 0 : checkoutlines.find(line => line.variant.id === edge.node.id);
                    const variantPricing = (_a = edge.node.pricing) === null || _a === void 0 ? void 0 : _a.price;
                    const totalPrice = variantPricing
                        ? {
                            gross: Object.assign(Object.assign({}, variantPricing.gross), { amount: variantPricing.gross.amount * ((existingLine === null || existingLine === void 0 ? void 0 : existingLine.quantity) || 0) }),
                            net: Object.assign(Object.assign({}, variantPricing.net), { amount: variantPricing.net.amount * ((existingLine === null || existingLine === void 0 ? void 0 : existingLine.quantity) || 0) }),
                        }
                        : null;
                    return {
                        id: (_b = existingLine === null || existingLine === void 0 ? void 0 : existingLine.variant) === null || _b === void 0 ? void 0 : _b.id,
                        quantity: (existingLine === null || existingLine === void 0 ? void 0 : existingLine.quantity) || 0,
                        totalPrice,
                        variant: {
                            attributes: edge.node.attributes,
                            id: edge.node.id,
                            isAvailable: edge.node.isAvailable,
                            name: edge.node.name,
                            pricing: edge.node.pricing,
                            product: edge.node.product,
                            quantityAvailable: edge.node.quantityAvailable,
                            metadata: (_c = edge === null || edge === void 0 ? void 0 : edge.node) === null || _c === void 0 ? void 0 : _c.metadata,
                            sku: edge.node.sku,
                        },
                    };
                })
                : [];
            const linesWithProperVariantUpdated = linesWithProperVariant.map(line => {
                var _a;
                const variantPricing = (_a = line.variant.pricing) === null || _a === void 0 ? void 0 : _a.price;
                const totalPrice = variantPricing
                    ? {
                        gross: Object.assign(Object.assign({}, variantPricing.gross), { amount: variantPricing.gross.amount * line.quantity }),
                        net: Object.assign(Object.assign({}, variantPricing.net), { amount: variantPricing.net.amount * line.quantity }),
                    }
                    : null;
                return {
                    id: line.id,
                    quantity: line.quantity,
                    totalPrice,
                    variant: line.variant,
                };
            });
            return {
                data: [
                    ...linesWithMissingVariantUpdated,
                    ...linesWithProperVariantUpdated,
                ],
            };
        });
        this.createCheckout = (email, lines, shippingAddress, billingAddress) => __awaiter(this, void 0, void 0, function* () {
            var _3, _4, _5, _6, _7;
            try {
                const variables = {
                    checkoutInput: {
                        billingAddress: billingAddress && {
                            city: billingAddress.city,
                            companyName: billingAddress.companyName,
                            country: globalTypes_1.CountryCode[(_3 = billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.country) === null || _3 === void 0 ? void 0 : _3.code],
                            countryArea: billingAddress.countryArea,
                            firstName: billingAddress.firstName,
                            lastName: billingAddress.lastName,
                            phone: billingAddress.phone,
                            postalCode: billingAddress.postalCode,
                            streetAddress1: billingAddress.streetAddress1,
                            streetAddress2: billingAddress.streetAddress2,
                        },
                        email,
                        lines,
                        shippingAddress: shippingAddress && {
                            city: shippingAddress.city,
                            companyName: shippingAddress.companyName,
                            country: globalTypes_1.CountryCode[(_4 = shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.country) === null || _4 === void 0 ? void 0 : _4.code],
                            countryArea: shippingAddress.countryArea,
                            firstName: shippingAddress.firstName,
                            lastName: shippingAddress.lastName,
                            phone: shippingAddress.phone,
                            postalCode: shippingAddress.postalCode,
                            streetAddress1: shippingAddress.streetAddress1,
                            streetAddress2: shippingAddress.streetAddress2,
                        },
                    },
                };
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.createCheckoutMutation,
                    variables,
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_5 = data === null || data === void 0 ? void 0 : data.checkoutCreate) === null || _5 === void 0 ? void 0 : _5.errors.length) {
                    return {
                        error: (_6 = data === null || data === void 0 ? void 0 : data.checkoutCreate) === null || _6 === void 0 ? void 0 : _6.errors,
                    };
                }
                if ((_7 = data === null || data === void 0 ? void 0 : data.checkoutCreate) === null || _7 === void 0 ? void 0 : _7.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutCreate.checkout),
                    };
                }
            }
            catch (error) {
                return {
                    error,
                };
            }
            return {};
        });
        this.setCartItem = (checkout) => __awaiter(this, void 0, void 0, function* () {
            var _8, _9, _10;
            const checkoutId = checkout.id;
            const { lines } = checkout;
            if (checkoutId && lines) {
                const alteredLines = lines.map(line => ({
                    quantity: line.quantity,
                    variantId: line.variant.id,
                }));
                try {
                    const { data, errors } = yield this.client.mutate({
                        mutation: CheckoutMutations.updateCheckoutLineMutation,
                        variables: {
                            checkoutId,
                            lines: alteredLines,
                        },
                    });
                    if (errors === null || errors === void 0 ? void 0 : errors.length) {
                        return {
                            error: errors,
                        };
                    }
                    if ((_8 = data === null || data === void 0 ? void 0 : data.checkoutLinesUpdate) === null || _8 === void 0 ? void 0 : _8.errors.length) {
                        return {
                            error: (_9 = data === null || data === void 0 ? void 0 : data.checkoutLinesUpdate) === null || _9 === void 0 ? void 0 : _9.errors,
                        };
                    }
                    if ((_10 = data === null || data === void 0 ? void 0 : data.checkoutLinesUpdate) === null || _10 === void 0 ? void 0 : _10.checkout) {
                        return {
                            data: this.constructCheckoutModel(data.checkoutLinesUpdate.checkout),
                        };
                    }
                }
                catch (error) {
                    return {
                        error,
                    };
                }
            }
            return {};
        });
        this.setCartItemTwo = (variantId, quantity, checkout) => __awaiter(this, void 0, void 0, function* () {
            var _11, _12, _13;
            const checkoutId = checkout.id;
            const lines = [
                {
                    variantId,
                    quantity,
                },
            ];
            if (checkoutId) {
                try {
                    const { data, errors } = yield this.client.mutate({
                        mutation: CheckoutMutations.ADD_CHECKOUT_LINE_MUTATION,
                        variables: {
                            checkoutId,
                            lines,
                        },
                    });
                    if (errors === null || errors === void 0 ? void 0 : errors.length) {
                        return {
                            error: errors,
                        };
                    }
                    if ((_11 = data === null || data === void 0 ? void 0 : data.checkoutLinesAdd) === null || _11 === void 0 ? void 0 : _11.errors.length) {
                        return {
                            error: (_12 = data === null || data === void 0 ? void 0 : data.checkoutLinesAdd) === null || _12 === void 0 ? void 0 : _12.errors,
                        };
                    }
                    if ((_13 = data === null || data === void 0 ? void 0 : data.checkoutLinesAdd) === null || _13 === void 0 ? void 0 : _13.checkout) {
                        return {
                            data: this.constructCheckoutModel(data.checkoutLinesAdd.checkout),
                        };
                    }
                }
                catch (error) {
                    return {
                        error,
                    };
                }
            }
            return {};
        });
        this.removeCartTwo = (variantId, checkout) => __awaiter(this, void 0, void 0, function* () {
            var _14, _15, _16, _17;
            const checkoutId = checkout.id;
            const { lines } = checkout;
            const line = lines === null || lines === void 0 ? void 0 : lines.find(line => line.variant.id === variantId);
            const lineId = line === null || line === void 0 ? void 0 : line.id;
            if (checkoutId && lineId) {
                try {
                    const { data, errors } = yield this.client.mutate({
                        mutation: CheckoutMutations.REMOVE_CHECKOUT_LINE_MUTATION,
                        variables: {
                            checkoutId,
                            lineId,
                        },
                    });
                    if (errors === null || errors === void 0 ? void 0 : errors.length) {
                        return {
                            error: errors,
                        };
                    }
                    if ((_14 = data === null || data === void 0 ? void 0 : data.checkoutLineDelete) === null || _14 === void 0 ? void 0 : _14.errors.length) {
                        return {
                            error: (_15 = data === null || data === void 0 ? void 0 : data.checkoutLineDelete) === null || _15 === void 0 ? void 0 : _15.errors,
                        };
                    }
                    if ((_16 = data === null || data === void 0 ? void 0 : data.checkoutLineDelete) === null || _16 === void 0 ? void 0 : _16.checkout) {
                        return {
                            data: this.constructCheckoutModel((_17 = data === null || data === void 0 ? void 0 : data.checkoutLineDelete) === null || _17 === void 0 ? void 0 : _17.checkout),
                        };
                    }
                }
                catch (error) {
                    return {
                        error,
                    };
                }
            }
            return {};
        });
        this.setShippingAddress = (shippingAddress, email, checkoutId) => __awaiter(this, void 0, void 0, function* () {
            var _18, _19, _20, _21, _22, _23;
            try {
                const variables = {
                    checkoutId,
                    email,
                    shippingAddress: {
                        city: shippingAddress.city,
                        companyName: shippingAddress.companyName,
                        country: globalTypes_1.CountryCode[(_18 = shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.country) === null || _18 === void 0 ? void 0 : _18.code],
                        countryArea: shippingAddress.countryArea,
                        firstName: shippingAddress.firstName,
                        lastName: shippingAddress.lastName,
                        phone: shippingAddress.phone,
                        postalCode: shippingAddress.postalCode,
                        streetAddress1: shippingAddress.streetAddress1,
                        streetAddress2: shippingAddress.streetAddress2,
                    },
                };
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.updateCheckoutShippingAddressMutation,
                    variables,
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_19 = data === null || data === void 0 ? void 0 : data.checkoutEmailUpdate) === null || _19 === void 0 ? void 0 : _19.errors.length) {
                    return {
                        error: (_20 = data === null || data === void 0 ? void 0 : data.checkoutEmailUpdate) === null || _20 === void 0 ? void 0 : _20.errors,
                    };
                }
                if ((_21 = data === null || data === void 0 ? void 0 : data.checkoutShippingAddressUpdate) === null || _21 === void 0 ? void 0 : _21.errors.length) {
                    return {
                        error: (_22 = data === null || data === void 0 ? void 0 : data.checkoutShippingAddressUpdate) === null || _22 === void 0 ? void 0 : _22.errors,
                    };
                }
                if ((_23 = data === null || data === void 0 ? void 0 : data.checkoutShippingAddressUpdate) === null || _23 === void 0 ? void 0 : _23.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutShippingAddressUpdate.checkout),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.setAddressType = (addressId, type) => __awaiter(this, void 0, void 0, function* () {
            var _24, _25, _26, _27;
            try {
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.updateCheckoutAddressType,
                    variables: { addressId, type },
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if (((_25 = (_24 = data === null || data === void 0 ? void 0 : data.addressTypeUpdate) === null || _24 === void 0 ? void 0 : _24.addressLink) === null || _25 === void 0 ? void 0 : _25.id) && ((_27 = (_26 = data === null || data === void 0 ? void 0 : data.addressTypeUpdate) === null || _26 === void 0 ? void 0 : _26.addressLink) === null || _27 === void 0 ? void 0 : _27.type)) {
                    return { data };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.setBillingAddress = (billingAddress, checkoutId) => __awaiter(this, void 0, void 0, function* () {
            var _28, _29, _30, _31;
            try {
                const variables = {
                    billingAddress: {
                        city: billingAddress.city,
                        companyName: billingAddress.companyName,
                        country: globalTypes_1.CountryCode[(_28 = billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.country) === null || _28 === void 0 ? void 0 : _28.code],
                        countryArea: billingAddress.countryArea,
                        firstName: billingAddress.firstName,
                        lastName: billingAddress.lastName,
                        phone: billingAddress.phone,
                        postalCode: billingAddress.postalCode,
                        streetAddress1: billingAddress.streetAddress1,
                        streetAddress2: billingAddress.streetAddress2,
                    },
                    checkoutId,
                };
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.updateCheckoutBillingAddressMutation,
                    variables,
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_29 = data === null || data === void 0 ? void 0 : data.checkoutBillingAddressUpdate) === null || _29 === void 0 ? void 0 : _29.errors.length) {
                    return {
                        error: (_30 = data === null || data === void 0 ? void 0 : data.checkoutBillingAddressUpdate) === null || _30 === void 0 ? void 0 : _30.errors,
                    };
                }
                if ((_31 = data === null || data === void 0 ? void 0 : data.checkoutBillingAddressUpdate) === null || _31 === void 0 ? void 0 : _31.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutBillingAddressUpdate.checkout),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.setBillingAddressWithEmail = (billingAddress, email, checkoutId) => __awaiter(this, void 0, void 0, function* () {
            var _32, _33, _34, _35, _36, _37;
            try {
                const variables = {
                    billingAddress: {
                        city: billingAddress.city,
                        companyName: billingAddress.companyName,
                        country: globalTypes_1.CountryCode[(_32 = billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.country) === null || _32 === void 0 ? void 0 : _32.code],
                        countryArea: billingAddress.countryArea,
                        firstName: billingAddress.firstName,
                        lastName: billingAddress.lastName,
                        phone: billingAddress.phone,
                        postalCode: billingAddress.postalCode,
                        streetAddress1: billingAddress.streetAddress1,
                        streetAddress2: billingAddress.streetAddress2,
                    },
                    checkoutId,
                    email,
                };
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.updateCheckoutBillingAddressWithEmailMutation,
                    variables,
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_33 = data === null || data === void 0 ? void 0 : data.checkoutEmailUpdate) === null || _33 === void 0 ? void 0 : _33.errors.length) {
                    return {
                        error: (_34 = data === null || data === void 0 ? void 0 : data.checkoutEmailUpdate) === null || _34 === void 0 ? void 0 : _34.errors,
                    };
                }
                if ((_35 = data === null || data === void 0 ? void 0 : data.checkoutBillingAddressUpdate) === null || _35 === void 0 ? void 0 : _35.errors.length) {
                    return {
                        error: (_36 = data === null || data === void 0 ? void 0 : data.checkoutBillingAddressUpdate) === null || _36 === void 0 ? void 0 : _36.errors,
                    };
                }
                if ((_37 = data === null || data === void 0 ? void 0 : data.checkoutBillingAddressUpdate) === null || _37 === void 0 ? void 0 : _37.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutBillingAddressUpdate.checkout),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.updateCheckoutPayment = (checkoutId, gatewayId, useCashback) => __awaiter(this, void 0, void 0, function* () {
            var _38, _39, _40;
            try {
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.updateCheckoutPaymentMethodMutation,
                    variables: {
                        checkoutId,
                        gatewayId,
                        useCashback,
                    },
                });
                console.log("dsfbdsfd", data);
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_38 = data === null || data === void 0 ? void 0 : data.checkoutPaymentMethodUpdate) === null || _38 === void 0 ? void 0 : _38.errors.length) {
                    return {
                        error: (_39 = data === null || data === void 0 ? void 0 : data.checkoutPaymentMethodUpdate) === null || _39 === void 0 ? void 0 : _39.errors,
                    };
                }
                if ((_40 = data === null || data === void 0 ? void 0 : data.checkoutPaymentMethodUpdate) === null || _40 === void 0 ? void 0 : _40.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutPaymentMethodUpdate.checkout),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.setShippingMethod = (shippingMethodId, checkoutId) => __awaiter(this, void 0, void 0, function* () {
            var _41, _42, _43;
            try {
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.updateCheckoutShippingMethodMutation,
                    variables: {
                        checkoutId,
                        shippingMethodId,
                    },
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_41 = data === null || data === void 0 ? void 0 : data.checkoutShippingMethodUpdate) === null || _41 === void 0 ? void 0 : _41.errors.length) {
                    return {
                        error: (_42 = data === null || data === void 0 ? void 0 : data.checkoutShippingMethodUpdate) === null || _42 === void 0 ? void 0 : _42.errors,
                    };
                }
                if ((_43 = data === null || data === void 0 ? void 0 : data.checkoutShippingMethodUpdate) === null || _43 === void 0 ? void 0 : _43.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutShippingMethodUpdate.checkout),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.addPromoCode = (promoCode, checkoutId) => __awaiter(this, void 0, void 0, function* () {
            var _44, _45, _46;
            try {
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.addCheckoutPromoCode,
                    variables: { checkoutId, promoCode },
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_44 = data === null || data === void 0 ? void 0 : data.checkoutAddPromoCode) === null || _44 === void 0 ? void 0 : _44.errors.length) {
                    return {
                        error: (_45 = data === null || data === void 0 ? void 0 : data.checkoutAddPromoCode) === null || _45 === void 0 ? void 0 : _45.errors,
                    };
                }
                if ((_46 = data === null || data === void 0 ? void 0 : data.checkoutAddPromoCode) === null || _46 === void 0 ? void 0 : _46.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutAddPromoCode.checkout),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.removePromoCode = (promoCode, checkoutId) => __awaiter(this, void 0, void 0, function* () {
            var _47, _48, _49;
            try {
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.removeCheckoutPromoCode,
                    variables: { checkoutId, promoCode },
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_47 = data === null || data === void 0 ? void 0 : data.checkoutRemovePromoCode) === null || _47 === void 0 ? void 0 : _47.errors.length) {
                    return {
                        error: (_48 = data === null || data === void 0 ? void 0 : data.checkoutRemovePromoCode) === null || _48 === void 0 ? void 0 : _48.errors,
                    };
                }
                if ((_49 = data === null || data === void 0 ? void 0 : data.checkoutRemovePromoCode) === null || _49 === void 0 ? void 0 : _49.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutRemovePromoCode.checkout),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.createPayment = ({ amount, checkoutId, gateway, billingAddress, token, returnUrl, }) => __awaiter(this, void 0, void 0, function* () {
            var _50, _51, _52, _53;
            try {
                const variables = {
                    checkoutId,
                    paymentInput: {
                        amount,
                        billingAddress: {
                            city: billingAddress.city,
                            companyName: billingAddress.companyName,
                            country: globalTypes_1.CountryCode[(_50 = billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.country) === null || _50 === void 0 ? void 0 : _50.code],
                            countryArea: billingAddress.countryArea,
                            firstName: billingAddress.firstName,
                            lastName: billingAddress.lastName,
                            phone: billingAddress.phone,
                            postalCode: billingAddress.postalCode,
                            streetAddress1: billingAddress.streetAddress1,
                            streetAddress2: billingAddress.streetAddress2,
                        },
                        gateway,
                        returnUrl,
                        token,
                    },
                };
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.createCheckoutPaymentMutation,
                    variables,
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_51 = data === null || data === void 0 ? void 0 : data.checkoutPaymentCreate) === null || _51 === void 0 ? void 0 : _51.errors.length) {
                    return {
                        error: (_52 = data === null || data === void 0 ? void 0 : data.checkoutPaymentCreate) === null || _52 === void 0 ? void 0 : _52.errors,
                    };
                }
                if ((_53 = data === null || data === void 0 ? void 0 : data.checkoutPaymentCreate) === null || _53 === void 0 ? void 0 : _53.payment) {
                    return {
                        data: this.constructPaymentModel(data.checkoutPaymentCreate.payment),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.completeCheckout = ({ checkoutId, paymentData, redirectUrl, storeSource, }) => __awaiter(this, void 0, void 0, function* () {
            var _54, _55;
            try {
                const paymentDataString = paymentData && JSON.stringify(paymentData);
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.completeCheckoutMutation,
                    variables: {
                        checkoutId,
                        paymentData: paymentDataString,
                        redirectUrl,
                        storeSource,
                    },
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_54 = data === null || data === void 0 ? void 0 : data.checkoutComplete) === null || _54 === void 0 ? void 0 : _54.errors.length) {
                    return {
                        error: (_55 = data === null || data === void 0 ? void 0 : data.checkoutComplete) === null || _55 === void 0 ? void 0 : _55.errors,
                    };
                }
                if (data === null || data === void 0 ? void 0 : data.checkoutComplete) {
                    return {
                        data: data.checkoutComplete,
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.constructCheckoutModel = ({ id, token, email, shippingAddress, billingAddress, discount, discountName, voucherCode, lines, availablePaymentGateways, availableShippingMethods, shippingMethod, note, }) => ({
            availablePaymentGateways,
            availableShippingMethods: availableShippingMethods
                ? availableShippingMethods.filter(utils_1.filterNotEmptyArrayItems)
                : [],
            billingAddress,
            email,
            id,
            note,
            lines: lines === null || lines === void 0 ? void 0 : lines.filter(item => (item === null || item === void 0 ? void 0 : item.quantity) && item.variant.id).map(item => {
                const itemVariant = item === null || item === void 0 ? void 0 : item.variant;
                return {
                    id: item.id,
                    quantity: item.quantity,
                    totalPrice: item === null || item === void 0 ? void 0 : item.totalPrice,
                    variant: {
                        attributes: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.attributes,
                        id: itemVariant.id,
                        isAvailable: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.isAvailable,
                        metadata: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.metadata,
                        name: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.name,
                        pricing: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.pricing,
                        product: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.product,
                        quantityAvailable: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.quantityAvailable,
                        sku: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.sku,
                        // @ts-ignore
                        images: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.images,
                    },
                };
            }),
            promoCodeDiscount: {
                discount,
                discountName,
                voucherCode,
            },
            shippingAddress,
            shippingMethod,
            token,
        });
        this.constructPaymentModel = ({ id, gateway, token, creditCard, total, }) => ({
            creditCard,
            gateway,
            id,
            token,
            total,
        });
        this.client = client;
    }
}
exports.ApolloClientManager = ApolloClientManager;
//# sourceMappingURL=index.js.map