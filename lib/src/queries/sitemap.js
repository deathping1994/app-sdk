"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionsQuery = exports.getCategoriesQuery = exports.getProductsQuery = void 0;
const client_1 = require("@apollo/client");
exports.getProductsQuery = client_1.gql `
  query GetProducts($cursor: String, $perPage: Int) {
    products(after: $cursor, first: $perPage) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
exports.getCategoriesQuery = client_1.gql `
  query GetCategories($cursor: String, $perPage: Int) {
    categories(after: $cursor, first: $perPage) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
exports.getCollectionsQuery = client_1.gql `
  query GetCollections($cursor: String, $perPage: Int) {
    collections(after: $cursor, first: $perPage) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
//# sourceMappingURL=sitemap.js.map