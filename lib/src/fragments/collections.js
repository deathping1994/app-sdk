"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionFragment = exports.baseCollectionFragment = void 0;
const client_1 = require("@apollo/client");
exports.baseCollectionFragment = client_1.gql `
  fragment BaseCollection on Collection {
    id
    name
    slug
    seoDescription
    seoTitle
  }
`;
exports.collectionFragment = client_1.gql `
  ${exports.baseCollectionFragment}
  fragment CollectionDetails on Collection {
    ...BaseCollection
    backgroundImage {
      alt
      url
    }
    description
    descriptionJson
  }
`;
//# sourceMappingURL=collections.js.map