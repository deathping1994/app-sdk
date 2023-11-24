"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDetailFragment = exports.orderPriceFragment = void 0;
const client_1 = require("@apollo/client");
const checkout_1 = require("./checkout");
exports.orderPriceFragment = client_1.gql `
  fragment OrderPrice on TaxedMoney {
    gross {
      amount
      currency
    }
    net {
      amount
      currency
    }
  }
`;
exports.orderDetailFragment = client_1.gql `
  ${exports.orderPriceFragment}
  ${checkout_1.checkoutAddressFragment}
  ${checkout_1.checkoutProductVariantFragment}
  fragment OrderDetail on Order {
    userEmail
    paymentStatus
    paymentStatusDisplay
    status
    statusDisplay
    id
    token
    number
    metadata {
      key
      value
    }
    shippingAddress {
      ...Address
    }
    lines {
      productName
      quantity
      variant {
        ...ProductVariant
      }
      unitPrice {
        currency
        ...OrderPrice
      }
      totalPrice {
        currency
        ...OrderPrice
      }
    }
    subtotal {
      ...OrderPrice
    }
    total {
      ...OrderPrice
    }
    shippingPrice {
      ...OrderPrice
    }
  }
`;
//# sourceMappingURL=order.js.map