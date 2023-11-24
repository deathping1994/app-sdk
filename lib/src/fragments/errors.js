"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountErrorFragment = exports.paymentErrorFragment = exports.checkoutErrorFragment = void 0;
const client_1 = require("@apollo/client");
exports.checkoutErrorFragment = client_1.gql `
  fragment CheckoutError on CheckoutError {
    code
    field
    message
  }
`;
exports.paymentErrorFragment = client_1.gql `
  fragment PaymentError on PaymentError {
    code
    field
    message
  }
`;
exports.accountErrorFragment = client_1.gql `
  fragment AccountError on AccountError {
    code
    field
    message
  }
`;
//# sourceMappingURL=errors.js.map