"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserAddress = exports.createUserAddress = exports.deleteUserAddress = exports.setCustomerDefaultAddress = void 0;
const client_1 = require("@apollo/client");
const errors_1 = require("../fragments/errors");
const auth_1 = require("../fragments/auth");
exports.setCustomerDefaultAddress = client_1.gql `
  ${auth_1.userFragment}
  ${errors_1.accountErrorFragment}
  mutation SetCustomerDefaultAddress($id: ID!, $type: AddressTypeEnum!) {
    accountSetDefaultAddress(id: $id, type: $type) {
      errors: accountErrors {
        ...AccountError
      }
      user {
        ...User
      }
    }
  }
`;
exports.deleteUserAddress = client_1.gql `
  ${auth_1.userFragment}
  ${errors_1.accountErrorFragment}
  mutation DeleteUserAddress($addressId: ID!) {
    accountAddressDelete(id: $addressId) {
      errors: accountErrors {
        ...AccountError
      }
      user {
        ...User
      }
    }
  }
`;
exports.createUserAddress = client_1.gql `
  ${auth_1.userFragment}
  ${errors_1.accountErrorFragment}
  mutation CreateUserAddress($input: AddressInput!) {
    accountAddressCreate(input: $input) {
      errors: accountErrors {
        ...AccountError
      }
      user {
        ...User
      }
    }
  }
`;
exports.updateUserAddress = client_1.gql `
  ${auth_1.userFragment}
  ${errors_1.accountErrorFragment}
  mutation UpdateUserAddress($input: AddressInput!, $id: ID!) {
    accountAddressUpdate(input: $input, id: $id) {
      errors: accountErrors {
        ...AccountError
      }
      user {
        ...User
      }
    }
  }
`;
//# sourceMappingURL=address.js.map