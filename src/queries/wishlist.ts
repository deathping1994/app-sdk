import gql from "graphql-tag";

export const getWishlist = gql`
  query Wishlist($first: Int!,$warehouseId: ID!) {
    wishlist(warehouseId:$warehouseId) {
      id
      items(first: $first) {
        edges {
          node {
            id
            product{
              id
              isAvailableForPurchase
              slug
            }
						variants(first:$first){
              edges{
                node{
                  id
                  name
                  sku
                  metadata{
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
                quantityAvailableByWarehouse
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
              }
            }
          }
        }
      }
    }
  }
`;
