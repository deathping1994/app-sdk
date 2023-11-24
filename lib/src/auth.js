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
exports.authLink = exports.invalidTokenLinkWithTokenHandler = exports.setAuthToken = exports.getAuthToken = exports.isJwtError = exports.JWTError = void 0;
const context_1 = require("@apollo/client/link/context");
const error_1 = require("@apollo/client/link/error");
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
var JWTError;
(function (JWTError) {
    JWTError["invalid"] = "InvalidTokenError";
    JWTError["invalidSignature"] = "InvalidSignatureError";
    JWTError["expired"] = "ExpiredSignatureError";
})(JWTError = exports.JWTError || (exports.JWTError = {}));
function isJwtError(error) {
    var _a;
    let jwtError;
    try {
        jwtError = !!utils_1.findValueInEnum((_a = error.extensions) === null || _a === void 0 ? void 0 : _a.exception.code, JWTError);
    }
    catch (_b) {
        jwtError = false;
    }
    return jwtError;
}
exports.isJwtError = isJwtError;
function getAuthToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield async_storage_1.default.getItem(helpers_1.LocalStorageItems.TOKEN);
        }
        catch (error) {
            return null;
        }
    });
}
exports.getAuthToken = getAuthToken;
function setAuthToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield async_storage_1.default.setItem(helpers_1.LocalStorageItems.TOKEN, token);
        }
        catch (error) {
            return false;
        }
    });
}
exports.setAuthToken = setAuthToken;
// possibly remove callback here and use event emitter
function invalidTokenLinkWithTokenHandler(tokenExpirationCallback) {
    return error_1.onError((error) => {
        var _a;
        const isTokenExpired = (_a = error.graphQLErrors) === null || _a === void 0 ? void 0 : _a.some(isJwtError);
        if (isTokenExpired ||
            (error.networkError && error.networkError.statusCode === 401)) {
            tokenExpirationCallback();
        }
    });
}
exports.invalidTokenLinkWithTokenHandler = invalidTokenLinkWithTokenHandler;
exports.authLink = context_1.setContext((_, context) => __awaiter(void 0, void 0, void 0, function* () {
    // get the authentication token from Asyncstorage if it exists
    const authToken = yield getAuthToken();
    if (authToken) {
        return Object.assign(Object.assign({}, context), { 
            // return the headers to the context so httpLink can read them
            headers: Object.assign(Object.assign({}, context.headers), { authorization: authToken ? `JWT ${JSON.parse(authToken).item}` : null }) });
    }
    return context;
}));
//# sourceMappingURL=auth.js.map