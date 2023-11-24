"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userOrderDetailsByTokenQuery = exports.orderDetailsByTokenQuery = exports.ordersByUser = void 0;
const client_1 = require("@apollo/client");
const order_1 = require("../fragments/order");
const invoice_1 = require("../fragments/invoice");
exports.ordersByUser = client_1.gql `
  query OrdersByUser($perPage: Int!, $after: String) {
    me {
      id
      orders(first: $perPage, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            token
            number
            statusDisplay
            created
            total {
              gross {
                amount
                currency
              }
              net {
                amount
                currency
              }
            }
            lines {
              id
              variant {
                id
                product {
                  name
                  id
                  pricing{
                    priceRangeUndiscounted{
                      stop{
                        gross{
                          amount
                        }
                      }
                    }
                  }
                }
              }
              thumbnail {
                alt
                url
              }
              thumbnail2x: thumbnail(size: 510) {
                url
              }
            }
          }
        }
      }
    }
  }
`;
exports.orderDetailsByTokenQuery = client_1.gql `
  ${order_1.orderDetailFragment}
  query OrderByToken($token: UUID!) {
    orderByToken(token: $token) {
      ...OrderDetail
    }
  }
`;
exports.userOrderDetailsByTokenQuery = client_1.gql `
  ${order_1.orderDetailFragment}
  ${invoice_1.invoiceFragment}
  query UserOrderByToken($token: UUID!) {
    orderByToken(token: $token) {
      ...OrderDetail
      invoices {
        ...InvoiceFragment
      }
    }
  }
`;
//# sourceMappingURL=orders.js.map