"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryFragment = exports.baseCategoryFragment = void 0;
const client_1 = require("@apollo/client");
exports.baseCategoryFragment = client_1.gql `
  fragment BaseCategory on Category {
    id
    name
    slug
    seoDescription
    seoTitle
  }
`;
exports.categoryFragment = client_1.gql `
  ${exports.baseCategoryFragment}
  fragment CategoryDetails on Category {
    ...BaseCategory
    backgroundImage {
      alt
      url
    }
    description
    descriptionJson
  }
`;
//# sourceMappingURL=categories.js.map