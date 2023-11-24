"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productFragment = exports.productPricingFragment = exports.productVariantFragment = exports.selectedAttributeFragment = exports.baseProductFragment = void 0;
const client_1 = require("@apollo/client");
const checkout_1 = require("./checkout");
exports.baseProductFragment = client_1.gql `
  fragment BaseProduct on Product {
    id
    name
    slug
    seoDescription
    seoTitle
    thumbnail {
      url
      alt
    }
    thumbnail2x: thumbnail(size: 510) {
      url
    }
  }
`;
exports.selectedAttributeFragment = client_1.gql `
  fragment SelectedAttributeFields on SelectedAttribute {
    attribute {
      id
      name
      slug
    }
    values {
      id
      name
    }
  }
`;
exports.productVariantFragment = client_1.gql `
  ${checkout_1.checkoutPriceFragment}
  fragment ProductVariantFields on ProductVariant {
    id
    sku
    name
    quantityAvailable(countryCode: $countryCode)
    isAvailable
    images {
      id
      url
      alt
    }
    pricing {
      onSale
      priceUndiscounted {
        ...Price
      }
      price {
        ...Price
      }
    }
    attributes {
      attribute {
        id
        name
        slug
      }
      values {
        id
        name
        value: name
      }
    }
  }
`;
exports.productPricingFragment = client_1.gql `
  ${checkout_1.checkoutPriceFragment}
  fragment ProductPricingField on Product {
    pricing {
      onSale
      priceRangeUndiscounted {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
      priceRange {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
    }
  }
`;
exports.productFragment = client_1.gql `
  ${exports.baseProductFragment}
  ${exports.selectedAttributeFragment}
  ${exports.productVariantFragment}
  ${exports.productPricingFragment}
  fragment ProductDetails on Product {
    ...BaseProduct
    ...ProductPricingField
    descriptionJson
    category {
      id
      name
      products(first: 3) {
        edges {
          node {
            ...BaseProduct
            ...ProductPricingField
            category {
              id
              name
            }
          }
        }
      }
    }
    images {
      id
      url
    }
    attributes {
      ...SelectedAttributeFields
    }
    variants {
      ...ProductVariantFields
    }
    isAvailable
  }
`;
//# sourceMappingURL=products.js.map