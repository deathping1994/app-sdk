"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRemoveProduct = exports.WishlistAddProduct = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.WishlistAddProduct = graphql_tag_1.default `
  mutation wishlistAddProduct($productId: ID!) {
    WishlistAddProduct: wishlistAddProduct(productId: $productId) {
      wishlist {
        id
        wishlist {
          id
          createdAt
          items(first: 20) {
            edges {
              node {
                id
                product {
                  id
                  name
                  isPublished
                  slug
                  isAvailableForPurchase
                  metadata {
                    key
                    value
                  }
                  thumbnail {
                    url
                  }
                  images {
                    id
                    alt
                    url
                  }
                  variants {
                    id
                    sku
                    name
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
                  productType{
                    name
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
              }
            }
          }
        }
      }
    }
  }
`;
exports.WishlistRemoveProduct = graphql_tag_1.default `
  mutation wishlistRemoveProduct($productId: ID!) {
    WishlistRemoveProduct: wishlistRemoveProduct(productId: $productId) {
      wishlist {
        id
        wishlist {
          id
          createdAt
          items(first: 20) {
            edges {
              node {
                id
                product {
                  id
                  name
                  isPublished
                  slug
                  isAvailableForPurchase
                  metadata {
                    key
                    value
                  }
                  thumbnail {
                    url
                  }
                  images {
                    id
                    alt
                    url
                  }
                  variants {
                    id
                    sku
                    name
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
                  productType{
                    name
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
              }
            }
          }
        }
      }
    }
  }
`;
//# sourceMappingURL=wishlist.js.map