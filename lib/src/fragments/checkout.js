"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutFragment = exports.atcChecckoutFragment = exports.checkoutLineFragment = exports.checkoutShippingMethodFragment = exports.checkoutProductVariantFragment = exports.checkoutAddressFragment = exports.checkoutPriceFragment = void 0;
const client_1 = require("@apollo/client");
const payment_1 = require("./payment");
exports.checkoutPriceFragment = client_1.gql `
  fragment Price on TaxedMoney {
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
exports.checkoutAddressFragment = client_1.gql `
  fragment Address on Address {
    id
    firstName
    lastName
    companyName
    streetAddress1
    streetAddress2
    city
    postalCode
    country {
      code
      country
    }
    countryArea
    phone
    isDefaultBillingAddress
    isDefaultShippingAddress
  }
`;
exports.checkoutProductVariantFragment = client_1.gql `
  ${exports.checkoutPriceFragment}
  fragment ProductVariant on ProductVariant {
    id
    name
    sku
    tags {
      name
    }
    quantityAvailable
    isAvailable
    images {
      id
      sortOrder
      alt
      url
    }
    metadata {
      key
      value
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
      }
      values {
        id
        name
        value: name
      }
    }
    product {
      id
      name
      slug
      tags {
        name
      }
      thumbnail {
        url
        alt
      }
      thumbnail2x: thumbnail(size: 510) {
        url
      }
      productType {
        id
        isShippingRequired
      }
    }
  }
`;
exports.checkoutShippingMethodFragment = client_1.gql `
  fragment ShippingMethod on ShippingMethod {
    id
    name
    price {
      currency
      amount
    }
  }
`;
exports.checkoutLineFragment = client_1.gql `
  ${exports.checkoutPriceFragment}
  ${exports.checkoutProductVariantFragment}
  fragment CheckoutLine on CheckoutLine {
    id
    quantity
    totalPrice {
      ...Price
    }
    variant {
      ...ProductVariant
    }
  }
`;
exports.atcChecckoutFragment = client_1.gql `
  ${exports.checkoutLineFragment}
  ${exports.checkoutShippingMethodFragment}
  ${payment_1.paymentGatewayFragment}
  fragment Checkout on Checkout {
    id
    availableShippingMethods {
      ...ShippingMethod
    }
    shippingMethod {
      ...ShippingMethod
    }
    lines {
      ...CheckoutLine
    }
    availablePaymentGateways {
      ...PaymentGateway
    }
  }
`;
exports.checkoutFragment = client_1.gql `
  ${exports.checkoutLineFragment}
  ${exports.checkoutAddressFragment}
  ${exports.checkoutPriceFragment}
  ${exports.checkoutShippingMethodFragment}
  ${payment_1.paymentGatewayFragment}
  fragment Checkout on Checkout {
    token
    id
    totalPrice {
      ...Price
    }
    subtotalPrice {
      ...Price
    }
    billingAddress {
      ...Address
    }
    shippingAddress {
      ...Address
    }
    email
    note
    availableShippingMethods {
      ...ShippingMethod
    }
    shippingMethod {
      ...ShippingMethod
    }
    shippingPrice {
      ...Price
    }
    lines {
      ...CheckoutLine
    }
    isShippingRequired
    discount {
      currency
      amount
    }
    discountName
    translatedDiscountName
    voucherCode
    availablePaymentGateways {
      ...PaymentGateway
    }
  }
`;
//# sourceMappingURL=checkout.js.map