import { gql } from "@apollo/client";
import { paymentGatewayFragment } from "./payment";

export const checkoutPriceFragment = gql`
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

export const checkoutAddressFragment = gql`
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

export const checkoutProductVariantFragment = gql`
  ${checkoutPriceFragment}
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
      metadata {
        key
        value
      }
      slug
      category {
        slug
        name
      }
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

export const checkoutShippingMethodFragment = gql`
  fragment ShippingMethod on ShippingMethod {
    id
    name
    price {
      currency
      amount
    }
  }
`;

export const checkoutLineFragment = gql`
  ${checkoutPriceFragment}
  ${checkoutProductVariantFragment}
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

export const atcChecckoutFragment = gql`
  ${checkoutLineFragment}
  ${checkoutShippingMethodFragment}
  ${paymentGatewayFragment}
  fragment Checkout on Checkout {
    id
    availableShippingMethods {
      ...ShippingMethod
    }
    shippingMethod {
      ...ShippingMethod
    }
    metadata {
      key
      value
    }
    lines {
      ...CheckoutLine
    }
    availablePaymentGateways {
      ...PaymentGateway
    }
  }
`;

export const checkoutFragment = gql`
  ${checkoutLineFragment}
  ${checkoutAddressFragment}
  ${checkoutPriceFragment}
  ${checkoutShippingMethodFragment}
  ${paymentGatewayFragment}
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
    metadata {
      key
      value
    }
    cashback {
      amount
      willAddOn
    }
    paymentMethod {
      cashbackDiscountAmount
      couponDiscount
      prepaidDiscountAmount
    }
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
