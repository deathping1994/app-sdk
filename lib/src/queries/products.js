"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantsProducts = exports.productDetails = exports.productList = void 0;
const client_1 = require("@apollo/client");
const pageInfo_1 = require("../fragments/pageInfo");
const products_1 = require("../fragments/products");
exports.productList = client_1.gql `
  ${products_1.baseProductFragment}
  ${products_1.productPricingFragment}
  ${pageInfo_1.pageInfo}
  query ProductList(
    $after: String
    $first: Int!
    $sortBy: ProductOrder
    $filter: ProductFilterInput
  ) {
    products(after: $after, first: $first, sortBy: $sortBy, filter: $filter) {
      edges {
        node {
          ...BaseProduct
          ...ProductPricingField
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;
exports.productDetails = client_1.gql `
  ${products_1.productFragment}
  query ProductDetails($id: ID, $slug: String, $countryCode: CountryCode) {
    product(id: $id, slug: $slug) {
      ...ProductDetails
    }
  }
`;
exports.variantsProducts = client_1.gql `
  query VariantsProducts($ids: [ID]) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          id
          product {
            id
            productType {
              isShippingRequired
            }
          }
        }
      }
    }
  }
`;
//# sourceMappingURL=products.js.map