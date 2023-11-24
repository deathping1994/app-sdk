"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceFragment = void 0;
const client_1 = require("@apollo/client");
exports.invoiceFragment = client_1.gql `
  fragment InvoiceFragment on Invoice {
    id
    number
    createdAt
    url
    status
  }
`;
//# sourceMappingURL=invoice.js.map