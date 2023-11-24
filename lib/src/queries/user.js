"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetailsQuery = void 0;
const client_1 = require("@apollo/client");
const auth_1 = require("../fragments/auth");
exports.getUserDetailsQuery = client_1.gql `
  ${auth_1.userFragment}
  query UserDetails {
    me {
      ...User
    }
  }
`;
//# sourceMappingURL=user.js.map