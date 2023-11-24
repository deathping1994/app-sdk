"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageInfo = void 0;
const client_1 = require("@apollo/client");
exports.pageInfo = client_1.gql `
  fragment PageInfo on PageInfo {
    endCursor
    hasNextPage
  }
`;
//# sourceMappingURL=pageInfo.js.map