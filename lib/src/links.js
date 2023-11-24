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
exports.createSaleorLinks = void 0;
const client_1 = require("@apollo/client");
const batch_http_1 = require("@apollo/client/link/batch-http");
const retry_1 = require("@apollo/client/link/retry");
const extract_files_1 = require("extract-files");
const apollo_upload_client_1 = require("apollo-upload-client");
const auth_1 = require("./auth");
const context_1 = require("@apollo/client/link/context");
/**
 * Creates list of links for Apollo client.
 * @param linksConfig Configuration for created links.
 */
exports.createSaleorLinks = ({ apiUrl, tokenExpirationCallback, appplatform, appversion }) => {
    const invalidTokenLink = auth_1.invalidTokenLinkWithTokenHandler(tokenExpirationCallback);
    const batchAndUploadLink = client_1.ApolloLink.split(operation => extract_files_1.extractFiles(operation).files.size > 0, apollo_upload_client_1.createUploadLink({
        credentials: "include",
        uri: apiUrl,
    }), new batch_http_1.BatchHttpLink({ credentials: "include", uri: apiUrl }));
    const appVersionAndPlatformLink = context_1.setContext((_, context) => __awaiter(void 0, void 0, void 0, function* () {
        return Object.assign(Object.assign({}, context), { headers: Object.assign(Object.assign({}, context.headers), { appVersion: appversion, appPlatform: appplatform }) });
    }));
    return [
        invalidTokenLink,
        auth_1.authLink,
        appVersionAndPlatformLink,
        new retry_1.RetryLink(),
        batchAndUploadLink
    ];
};
//# sourceMappingURL=links.js.map