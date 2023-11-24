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
exports.AuthJobs = exports.AuthJobsEvents = void 0;
const types_1 = require("../../api/Auth/types");
const JobsHandler_1 = require("../JobsHandler");
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
var AuthJobsEvents;
(function (AuthJobsEvents) {
    AuthJobsEvents[AuthJobsEvents["SIGN_IN_TOKEN_REFRESHING"] = 0] = "SIGN_IN_TOKEN_REFRESHING";
})(AuthJobsEvents = exports.AuthJobsEvents || (exports.AuthJobsEvents = {}));
class AuthJobs extends JobsHandler_1.JobsHandler {
    constructor(localStorageHandler, apolloClientManager) {
        super();
        this.provideUser = () => __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.apolloClientManager.getUser();
            if (error) {
                return {
                    dataError: {
                        error,
                        type: types_1.DataErrorAuthTypes.GET_USER,
                    },
                };
            }
            return {
                data,
            };
        });
        this.registerAccount = ({ email, password, redirectUrl, }) => __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.apolloClientManager.registerAccount(email, password, redirectUrl);
            if (error) {
                return {
                    dataError: {
                        error,
                        type: types_1.DataErrorAuthTypes.REGISTER_ACCOUNT,
                    },
                };
            }
            return {
                data,
            };
        });
        this.resetPasswordRequest = ({ email, redirectUrl, }) => __awaiter(this, void 0, void 0, function* () {
            const { error } = yield this.apolloClientManager.resetPasswordRequest(email, redirectUrl);
            if (error) {
                return {
                    dataError: {
                        error,
                        type: types_1.DataErrorAuthTypes.RESET_PASSWORD_REQUEST,
                    },
                };
            }
            return {};
        });
        this.signIn = ({ email, password, }) => __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.apolloClientManager.signIn(email, password);
            if (error) {
                return {
                    dataError: {
                        error,
                        type: types_1.DataErrorAuthTypes.SIGN_IN,
                    },
                };
            }
            yield this.localStorageHandler.setSignInToken((data === null || data === void 0 ? void 0 : data.token) || null);
            yield this.localStorageHandler.setCsrfToken((data === null || data === void 0 ? void 0 : data.csrfToken) || null);
            return {
                data,
            };
        });
        this.signInMobile = ({ checkoutId, otp, phone, }) => __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.apolloClientManager.signInMobile(checkoutId, otp, phone);
            if (error) {
                return {
                    dataError: {
                        error,
                        type: types_1.DataErrorAuthTypes.SIGN_IN,
                    },
                };
            }
            this.localStorageHandler.setSignInToken((data === null || data === void 0 ? void 0 : data.token) || null);
            this.localStorageHandler.setCsrfToken((data === null || data === void 0 ? void 0 : data.csrfToken) || null);
            this.localStorageHandler.setRefreshToken((data === null || data === void 0 ? void 0 : data.refreshToken) || null);
            return {
                data,
            };
        });
        this.confirmAccountV2 = ({ otp, phone, }) => __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.apolloClientManager.confirmAccountV2(otp, phone);
            if (error) {
                return {
                    dataError: {
                        error,
                        type: types_1.DataErrorAuthTypes.SIGN_IN,
                    },
                };
            }
            this.localStorageHandler.setSignInToken((data === null || data === void 0 ? void 0 : data.token) || null);
            this.localStorageHandler.setCsrfToken((data === null || data === void 0 ? void 0 : data.csrfToken) || null);
            this.localStorageHandler.setRefreshToken((data === null || data === void 0 ? void 0 : data.refreshToken) || null);
            return {
                data,
            };
        });
        this.signOut = () => __awaiter(this, void 0, void 0, function* () {
            yield this.localStorageHandler.clear();
            yield this.apolloClientManager.signOut();
            return {};
        });
        this.verifySignInToken = () => __awaiter(this, void 0, void 0, function* () {
            const wrappedToken = yield async_storage_1.default.getItem("token");
            if (!wrappedToken) {
                return {
                    dataError: {
                        error: new Error("Verify sign in token impossible. No token to verify received."),
                        type: types_1.DataErrorAuthTypes.VERIFY_TOKEN,
                    },
                };
            }
            const token = JSON.parse(wrappedToken).item;
            const { data, error } = yield this.apolloClientManager.verifySignInToken({
                token,
            });
            if (error) {
                return {
                    dataError: {
                        error,
                        type: types_1.DataErrorAuthTypes.VERIFY_TOKEN,
                    },
                };
            }
            return {
                data,
            };
        });
        this.refreshSignInToken = ({ refreshToken, }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            this.notifyEvent(AuthJobsEvents.SIGN_IN_TOKEN_REFRESHING, true);
            const wrappedCsrfToken = yield async_storage_1.default.getItem("csrf_token");
            const wrappedRefreshToken = yield async_storage_1.default.getItem("refresh_token");
            if (!wrappedCsrfToken && !wrappedRefreshToken) {
                return {
                    dataError: {
                        error: new Error("Refresh sign in token impossible. No refresh token received."),
                        type: types_1.DataErrorAuthTypes.REFRESH_TOKEN,
                    },
                };
            }
            const csrf = (_a = JSON.parse(wrappedCsrfToken)) === null || _a === void 0 ? void 0 : _a.item;
            const refresh = (_b = JSON.parse(wrappedRefreshToken)) === null || _b === void 0 ? void 0 : _b.item;
            const { data, error } = yield this.apolloClientManager.refreshSignInToken({
                csrfToken: csrf,
                refreshToken: refresh,
            });
            if (error) {
                this.notifyEvent(AuthJobsEvents.SIGN_IN_TOKEN_REFRESHING, false);
                return {
                    dataError: {
                        error,
                        type: types_1.DataErrorAuthTypes.REFRESH_TOKEN,
                    },
                };
            }
            yield this.localStorageHandler.setSignInToken((data === null || data === void 0 ? void 0 : data.token) || null);
            this.notifyEvent(AuthJobsEvents.SIGN_IN_TOKEN_REFRESHING, false);
            return {
                data,
            };
        });
        this.apolloClientManager = apolloClientManager;
        this.localStorageHandler = localStorageHandler;
    }
}
exports.AuthJobs = AuthJobs;
//# sourceMappingURL=AuthJobs.js.map