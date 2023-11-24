"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attributes = void 0;
const client_1 = require("@apollo/client");
exports.attributes = client_1.gql `
  query Attributes($id: ID!) {
    attributes(filter: { inCategory: $id }, first: 100) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
  }
`;
//# sourceMappingURL=attributes.js.map