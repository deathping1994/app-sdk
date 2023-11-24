"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionDetails = exports.collections = void 0;
const client_1 = require("@apollo/client");
const collections_1 = require("../fragments/collections");
const pageInfo_1 = require("../fragments/pageInfo");
exports.collections = client_1.gql `
  ${collections_1.baseCollectionFragment}
  ${pageInfo_1.pageInfo}
  query CollectionList(
    $first: Int!
    $after: String
    $sortBy: CollectionSortingInput
    $filter: CollectionFilterInput
  ) {
    collections(
      first: $first
      after: $after
      sortBy: $sortBy
      filter: $filter
    ) {
      edges {
        node {
          ...BaseCollection
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;
exports.collectionDetails = client_1.gql `
  ${collections_1.collectionFragment}
  query CollectionDetails($id: ID, $slug: String) {
    collection(id: $id, slug: $slug) {
      ...CollectionDetails
    }
  }
`;
//# sourceMappingURL=collections.js.map