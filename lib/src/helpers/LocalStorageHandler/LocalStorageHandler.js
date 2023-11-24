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
exports.LocalStorageHandler = void 0;
// @ts-nocheck
const types_1 = require("./types");
const Proxy_1 = __importDefault(require("./Proxy"));
class LocalStorageHandler extends Proxy_1.default {
    static getCheckout() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Proxy_1.default.retrieveItem(types_1.LocalStorageItems.CHECKOUT);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getPayment() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Proxy_1.default.retrieveItem(types_1.LocalStorageItems.PAYMENT);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Proxy_1.default.retrieveItem(types_1.LocalStorageItems.JOB_QUEUE_CHECKOUT);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getSignInToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Proxy_1.default.retrieveItem(types_1.LocalStorageItems.TOKEN);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getCsrfToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Proxy_1.default.retrieveItem(types_1.LocalStorageItems.CSRF_TOKEN);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getRefreshToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Proxy_1.default.retrieveItem(types_1.LocalStorageItems.REFRESH_TOKEN);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    setSignInToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.saveItem(types_1.LocalStorageItems.TOKEN, token);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    setCsrfToken(csrfToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.saveItem(types_1.LocalStorageItems.CSRF_TOKEN, csrfToken);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    setRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.saveItem(types_1.LocalStorageItems.REFRESH_TOKEN, refreshToken);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    setCheckout(checkout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.saveItem(types_1.LocalStorageItems.CHECKOUT, checkout);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    setPayment(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.saveItem(types_1.LocalStorageItems.PAYMENT, payment);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    setJobs(jobs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.saveItem(types_1.LocalStorageItems.JOB_QUEUE_CHECKOUT, jobs);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    setWishlist(wishlist) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.saveItem(types_1.LocalStorageItems.WISHLIST, wishlist);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.clearStorage();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.LocalStorageHandler = LocalStorageHandler;
//# sourceMappingURL=LocalStorageHandler.js.map