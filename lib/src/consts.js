"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREDENTIAL_API_EXISTS = exports.LOCAL_STORAGE_EXISTS = exports.WINDOW_EXISTS = void 0;
// It's react-native environment
exports.WINDOW_EXISTS = typeof document !== "undefined";
exports.LOCAL_STORAGE_EXISTS = exports.WINDOW_EXISTS && !!window.localStorage;
exports.CREDENTIAL_API_EXISTS = exports.WINDOW_EXISTS && !!window.PasswordCredential;
//# sourceMappingURL=consts.js.map