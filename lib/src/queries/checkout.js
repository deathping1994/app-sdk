"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutProductVariants = exports.userCheckoutDetails = exports.checkoutDetails = void 0;
const client_1 = require("@apollo/client");
const checkout_1 = require("../fragments/checkout");
exports.checkoutDetails = client_1.gql `
  ${checkout_1.checkoutFragment}
  query CheckoutDetails($token: UUID!) {
    checkout(token: $token) {
      ...Checkout
    }
  }
`;
exports.userCheckoutDetails = client_1.gql `
  ${checkout_1.checkoutFragment}
  query UserCheckoutDetails {
    me {
      id
      checkout {
        ...Checkout
      }
    }
  }
`;
exports.checkoutProductVariants = client_1.gql `
  ${checkout_1.checkoutProductVariantFragment}
  query CheckoutProductVariants($ids: [ID]) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          ...ProductVariant
        }
      }
    }
  }
`;
//# sourceMappingURL=checkout.js.map