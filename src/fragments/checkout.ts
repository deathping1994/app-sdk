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
    cityArea
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

export const checkoutSublineFragment = gql`
  fragment CheckoutSubline on ChildCheckoutLineRelationType {
    id
    childLine {
      id
      quantity
      variant {
        id
        sku
        name
        price {
          amount
        }
        product {
          id
          name
          garment {
            id
            name
            category {
              id
              name
            }
          }
          thumbnail {
            url
          }
        }
      }
    }
  }
`;

export const checkoutLineWithAddOnFragment = gql`
  ${checkoutSublineFragment}
  fragment CheckoutLineWithAddOn on CheckoutLine {
    id
    quantity
    groupId
    totalCount
    service {
      id
      name
      category {
        id
        name
        slug
      }
    }
    isExpress
    totalPrice {
      gross {
        currency
        amount
      }
    }
    extraData {
      id
      key
      value
    }
    addOns {
      id
      childLine {
        variant {
          id
          name
          sku
        }
        totalPrice {
          gross {
            amount
          }
        }
      }
    }
    linePrice {
      amount
      currency
    }
    variant {
      id
      sku
      name
      price {
        currency
        amount
      }
      images {
        id
        alt
        url
      }
      product {
        id
        name
        category {
          id
        }
      }
    }
    length {
      unit
      value
    }
    breadth {
      unit
      value
    }
    numberOfPanels
    pricePerPanel {
      currency
      amount
    }
    sublines {
      ...CheckoutSubline
    }
    areaSquare
    pricePerArea {
      currency
      amount
    }
    subQuantity
    weight {
      unit
      value
    }
    pricePerWeight {
      currency
      amount
    }
  }
`;

export const discountLineFragment = gql`
  fragment DiscountedCheckoutLine on DiscountedCheckoutLine {
    id
    totalPrice {
      currency
      gross {
        currency
        amount
      }
    }
    quantity
    variant
  }
`;

export const atcChecckoutFragment = gql`
  ${checkoutLineFragment}
  ${paymentGatewayFragment}
  fragment Checkout on Checkout {
    id
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
  ${checkoutLineWithAddOnFragment}
  fragment Checkout on Checkout {
    id
    shippingAddress {
      id
    }
    billingAddress {
      id
    }
    discount {
      amount
      currency
    }
    extraData {
      id
      key
      value
    }
    cart {
      id
      orderCreated
    }
    email
    user {
      id
      email
      phone
      defaultBillingAddress {
        id
      }
      defaultShippingAddress {
        id
      }
    }
    shippingAddress {
      cityArea
      phone
      country {
        code
        country
      }
    }
    token
    isExpress
    version
    expressCharge {
      gross {
        amount
        currency
      }
      net {
        amount
        currency
      }
    }
    deliveryDate
    service {
      category {
        id
        name
        slug
      }
      unit{
        id
        name
      }
      id
      name
      serviceCode
      serviceType
      parentService {
        id
        name
        serviceCode
        serviceType
      }
      parentServices {
        id
        name
      }
    }
    lines {
      ...CheckoutLineWithAddOn
    }
    linesByGroup{
      ...CheckoutLineWithAddOn
    }
    totalPrice {
      gross {
        amount
        currency
      }
      net {
        amount
      }
    }
    subtotalPrice {
      gross {
        amount
      }
      net {
        amount
      }
    }
  }
`;

export const cartFragment = gql`
  ${checkoutFragment}
  fragment Cart on Cart {
    id
    orderCreated
    isExpress
    version
    checkouts {
      ...Checkout
    }
    client {
      id
      clientCode
      clientName
    }
  }
`;
