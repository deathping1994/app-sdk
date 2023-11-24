"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFragment = void 0;
const client_1 = require("@apollo/client");
const checkout_1 = require("./checkout");
exports.userFragment = client_1.gql `
  ${checkout_1.checkoutAddressFragment}
  fragment User on User {
    id
    email
    firstName
    lastName
    isStaff
    phone
    avatar {
      url
    }
    metadata {
      key
      value
    }
    defaultShippingAddress {
      ...Address
    }
    defaultBillingAddress {
      ...Address
    }
    addresses {
      ...Address
    }
  }
`;
//# sourceMappingURL=auth.js.map