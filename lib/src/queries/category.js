"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryDetails = exports.categoryAncestorsList = exports.categoryChildrenList = exports.categoryList = void 0;
const client_1 = require("@apollo/client");
const pageInfo_1 = require("../fragments/pageInfo");
const categories_1 = require("../fragments/categories");
exports.categoryList = client_1.gql `
  ${categories_1.baseCategoryFragment}
  ${pageInfo_1.pageInfo}
  query CategoryList($first: Int!, $after: String) {
    categories(first: $first, after: $after) {
      edges {
        node {
          ...BaseCategory
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;
exports.categoryChildrenList = client_1.gql `
  ${categories_1.baseCategoryFragment}
  ${pageInfo_1.pageInfo}
  query CategoryChildrenList($id: ID!, $first: Int!, $after: String) {
    category(id: $id) {
      id
      children(first: $first, after: $after) {
        edges {
          node {
            ...BaseCategory
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
`;
exports.categoryAncestorsList = client_1.gql `
  ${categories_1.baseCategoryFragment}
  ${pageInfo_1.pageInfo}
  query CategoryAncestorsList($id: ID!, $first: Int!, $after: String) {
    category(id: $id) {
      id
      ancestors(first: $first, after: $after) {
        edges {
          node {
            ...BaseCategory
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
`;
exports.categoryDetails = client_1.gql `
  ${categories_1.categoryFragment}
  query CategoryDetails($id: ID, $slug: String) {
    category(id: $id, slug: $slug) {
      ...CategoryDetails
    }
  }
`;
//# sourceMappingURL=category.js.map