import gql from "graphql-tag";
export const WishlistAddProduct = gql`
  mutation wishlistAddProduct($productId: ID!) {
  WishlistAddProduct: wishlistAddProduct(productId: $productId) {
    wishlist {
      id
      product {
        id
        name
        slug
        isAvailableForPurchase
        isPublished
        metadata {
          key
          value
        }
        defaultVariant {
          profitMarginPercentage
          id
          sku
          name
          isAvailable
          quantityAvailable(countryCode: IN)
          weight {
            unit
            value
          }
          metadata {
            key
            value
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
          attributes {
            attribute {
              id
              name
              slug
              metadata {
                key
                value
              }
            }
            values {
              id
              name
              value: name
            }
          }
        }
        productType {
          name
        }
        thumbnail {
          url
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
`;
export const WishlistRemoveProduct = gql`
  mutation wishlistRemoveProduct($productId: ID!) {
    WishlistRemoveProduct: wishlistRemoveProduct(productId: $productId) {
      wishlist {
        id
        product {
          id
          name
          slug
          isAvailableForPurchase
          isPublished
          metadata {
            key
            value
          }
          defaultVariant {
            profitMarginPercentage
            id
            sku
            name
            isAvailable
            quantityAvailable(countryCode: IN)
            weight {
              unit
              value
            }
            metadata {
              key
              value
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
            attributes {
              attribute {
                id
                name
                slug
                metadata {
                  key
                  value
                }
              }
              values {
                id
                name
                value: name
              }
            }
          }
          productType {
            name
          }
          thumbnail {
            url
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
`;
