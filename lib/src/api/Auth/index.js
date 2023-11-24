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
exports.AuthAPI = exports.BROWSER_NO_CREDENTIAL_API_MESSAGE = void 0;
const helpers_1 = require("../../helpers");
const types_1 = require("../../state/types");
const types_2 = require("./types");
exports.BROWSER_NO_CREDENTIAL_API_MESSAGE = "Saleor SDK is unable to use browser Credential Management API.";
class AuthAPI extends helpers_1.ErrorListener {
    constructor(saleorState, jobsManager, config) {
        super();
        /**
         * Tries to register a user account with given email and password.
         * @param email Email used for new account.
         * @param password Password used for new account.
         * @param redirectUrl URL used for redirection.
         */
        this.registerAccount = (email, password, redirectUrl) => __awaiter(this, void 0, void 0, function* () {
            const { data, dataError } = yield this.jobsManager.run("auth", "registerAccount", {
                email,
                password,
                redirectUrl,
            });
            if (dataError === null || dataError === void 0 ? void 0 : dataError.error) {
                this.fireError(dataError.error, types_2.DataErrorAuthTypes.REGISTER_ACCOUNT);
            }
            if (dataError) {
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            return {
                data,
                pending: false,
            };
        });
        /**
         * Requests a password reset for an user account with given email.
         * @param email Email used for account.
         * @param redirectUrl URL used for redirection.
         */
        this.resetPasswordRequest = (email, redirectUrl) => __awaiter(this, void 0, void 0, function* () {
            const { data, dataError } = yield this.jobsManager.run("auth", "resetPasswordRequest", {
                email,
                redirectUrl,
            });
            if (dataError === null || dataError === void 0 ? void 0 : dataError.error) {
                this.fireError(dataError.error, types_2.DataErrorAuthTypes.RESET_PASSWORD_REQUEST);
            }
            if (dataError) {
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            return {
                data,
                pending: false,
            };
        });
        this.signUpMobile = (otp, phone
        // autoSignIn: boolean
        ) => __awaiter(this, void 0, void 0, function* () {
            const { data, dataError } = yield this.jobsManager.run("auth", "confirmAccountV2", {
                otp,
                phone,
            });
            if (dataError) {
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            const { data: userData, dataError: userDataError, } = yield this.jobsManager.run("auth", "provideUser", undefined);
            if (this.config.loadOnStart.checkout) {
                yield this.jobsManager.run("checkout", "provideCheckout", {
                    isUserSignedIn: !!(data === null || data === void 0 ? void 0 : data.user),
                });
            }
            return {
                data: userData,
                dataError: userDataError,
                pending: false,
            };
        });
        /**
         * Tries to authenticate user with given email and password.
         * @param email Email used for authentication.
         * @param password Password used for authentication.
         */
        this.signIn = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const { data, dataError } = yield this.jobsManager.run("auth", "signIn", {
                email,
                password,
            });
            if (dataError) {
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            const { data: userData, dataError: userDataError, } = yield this.jobsManager.run("auth", "provideUser", undefined);
            if (this.config.loadOnStart.checkout) {
                yield this.jobsManager.run("checkout", "provideCheckout", {
                    isUserSignedIn: !!(data === null || data === void 0 ? void 0 : data.user),
                });
            }
            return {
                data: userData,
                dataError: userDataError,
                pending: false,
            };
        });
        this.signInMobile = (checkoutId, otp, phone
        // autoSignIn: boolean
        ) => __awaiter(this, void 0, void 0, function* () {
            const { data, dataError } = yield this.jobsManager.run("auth", "signInMobile", {
                checkoutId,
                otp,
                phone,
            });
            if (dataError) {
                return {
                    data,
                    dataError,
                    pending: false,
                };
            }
            const { data: userData, dataError: userDataError, } = yield this.jobsManager.run("auth", "provideUser", undefined);
            if (this.config.loadOnStart.checkout) {
                yield this.jobsManager.run("checkout", "provideCheckout", {
                    isUserSignedIn: !!(data === null || data === void 0 ? void 0 : data.user),
                });
            }
            // if (this.config.loadOnStart.wishlist) {
            //   await this.jobsManager.run("wishlist", "getWishlist", undefined);
            // }
            return {
                data: userData,
                dataError: userDataError,
                pending: false,
            };
        });
        /**
         * Sign out user by clearing cache, local storage and authentication token.
         */
        this.signOut = () => __awaiter(this, void 0, void 0, function* () {
            yield this.jobsManager.run("auth", "signOut", undefined);
            return {
                pending: false,
            };
        });
        /**
         * Tries to refresh user token to keep previously signed in user authenticated.
         * @param refreshToken Refresh token. Required when refreshToken is not provided as a cookie.
         */
        this.refreshSignInToken = (refreshToken) => __awaiter(this, void 0, void 0, function* () {
            const { data, dataError } = yield this.jobsManager.run("auth", "refreshSignInToken", {
                refreshToken,
            });
            if (dataError) {
                return {
                    data,
                    dataError,
                };
            }
            return {
                data,
            };
        });
        this.autoSignIn = () => __awaiter(this, void 0, void 0, function* () { });
        this.setUserAvatar = (url) => {
            if (this.user) {
                this.user.avatar = {
                    url,
                };
                this.saleorState.loadUser();
            }
        };
        this.refreshUserState = () => {
            this.saleorState.loadUser();
        };
        this.saleorState = saleorState;
        this.jobsManager = jobsManager;
        this.config = config;
        this.loaded = false;
        this.tokenRefreshing = false;
        this.tokenVerifying = !!this.saleorState.signInToken;
        this.saleorState.subscribeToChange(types_1.StateItems.USER, (user) => {
            this.user = user;
            if (this.loaded) {
                this.authenticated = !!this.user;
            }
        });
        this.saleorState.subscribeToChange(types_1.StateItems.SIGN_IN_TOKEN, token => {
            this.token = token;
        });
        this.saleorState.subscribeToChange(types_1.StateItems.SIGN_IN_TOKEN_REFRESHING, tokenRefreshing => {
            this.tokenRefreshing = tokenRefreshing;
        });
        this.saleorState.subscribeToChange(types_1.StateItems.SIGN_IN_TOKEN_VERIFYING, tokenVerifying => {
            this.tokenVerifying = tokenVerifying;
        });
        this.saleorState.subscribeToChange(types_1.StateItems.LOADED, (loaded) => {
            this.loaded = loaded.user && loaded.signInToken;
            if (this.loaded) {
                this.authenticated = !!this.user;
            }
        });
        this.saleorState.loadUser();
    }
    static create(saleorState, jobsManager, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const authApi = new AuthAPI(saleorState, jobsManager, config);
            if (!authApi.saleorState.signInToken) {
                yield authApi.autoSignIn();
            }
            return authApi;
        });
    }
}
exports.AuthAPI = AuthAPI;
//# sourceMappingURL=index.js.map