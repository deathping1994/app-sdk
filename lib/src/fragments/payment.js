"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentGatewayFragment = exports.paymentFragment = void 0;
const client_1 = require("@apollo/client");
exports.paymentFragment = client_1.gql `
  fragment Payment on Payment {
    id
    gateway
    token
    creditCard {
      brand
      firstDigits
      lastDigits
      expMonth
      expYear
    }
    total {
      amount
      currency
    }
  }
`;
exports.paymentGatewayFragment = client_1.gql `
  fragment PaymentGateway on PaymentGateway {
    id
    name
    config {
      field
      value
    }
    currencies
  }
`;
//# sourceMappingURL=payment.js.map