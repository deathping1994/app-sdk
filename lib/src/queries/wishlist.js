"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishlist = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.getWishlist = graphql_tag_1.default `
  query Wishlist($first: Int!) {
    wishlist {
      id
      items(first: $first) {
        edges {
          node {
            id

            product {
              id
              name
              slug
              isAvailableForPurchase
              metadata {
                key
                value
              }
              productType {
                name
              }
              thumbnail {
                url
              }
              images {
                id
                url
                alt
              }
              variants {
                id
                sku
                name
                metadata {
                  key
                  value
                }
                attributes {
                  attribute {
                    name
                  }
                  values {
                    name
                  }
                }
                quantityAvailable(countryCode: IN)
                images {
                  id
                  url
                  alt
                }
                pricing {
                  onSale
                  priceUndiscounted {
                    gross {
                      amount
                      currency
                    }
                    net {
                      amount
                      currency
                    }
                  }
                  price {
                    gross {
                      amount
                      currency
                    }
                    net {
                      amount
                      currency
                    }
                  }
                }
              }

              pricing {
                priceRangeUndiscounted {
                  start {
                    net {
                      amount
                      currency
                    }
                    gross {
                      amount
                      currency
                    }
                  }
                  stop {
                    net {
                      amount
                      currency
                    }
                    gross {
                      amount
                      currency
                    }
                  }
                }
                priceRange {
                  start {
                    net {
                      amount
                      currency
                    }
                    gross {
                      amount
                      currency
                    }
                  }
                  stop {
                    net {
                      amount
                      currency
                    }
                    gross {
                      amount
                      currency
                    }
                  }
                }
              }
            }
            variants(first: $first) {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
//# sourceMappingURL=wishlist.js.map