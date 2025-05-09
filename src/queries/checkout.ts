import { gql } from "@apollo/client";

import {
  cartFragment,
  checkoutFragment,
  checkoutProductVariantFragment,
} from "../fragments/checkout";

export const checkoutDetails = gql`
  ${checkoutFragment}
  query CheckoutDetails($token: UUID!) {
    checkout(token: $token) {
      ...Checkout
    }
  }
`;

export const userCheckoutDetails = gql`
  ${checkoutFragment}
  query UserCheckoutDetails {
    me {
      id
      checkout {
        ...Checkout
      }
    }
  }
`;

export const checkoutProductVariants = gql`
  ${checkoutProductVariantFragment}
  query CheckoutProductVariants($ids: [ID]) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          ...ProductVariant
        }
      }
    }
  }
`;

export const customerCheckouts = gql`
  query Customers($first: Int, $filter: CustomerFilterInput) {
    customers(filter: $filter, first: $first) {
      edges {
        node {
          id
          defaultShippingAddress {
            id
          }
          defaultBillingAddress {
            id
          }
          checkout {
            token
            service {
              id
              serviceCode
              name
              parentService {
                serviceCode
                id
                name
              }
            }
          }
        }
        cursor
      }
    }
  }
`;

export const customerCarts = gql`
  ${cartFragment}
  query Customers($first: Int, $filter: CustomerFilterInput) {
    customers(filter: $filter, first: $first) {
      edges {
        node {
          id
          defaultShippingAddress {
            id
          }
          defaultBillingAddress {
            id
          }
          cart {
            ...Cart
          }
        }
        cursor
      }
    }
  }
`;

export const customerCheckoutsWithDetails = gql`
  ${checkoutFragment}
  query Customers($first: Int, $filter: CustomerFilterInput) {
    customers(filter: $filter, first: $first) {
      edges {
        node {
          id
          defaultShippingAddress {
            id
          }
          defaultBillingAddress {
            id
          }
          checkout {
            ...Checkout
          }
        }
        cursor
      }
    }
  }
`;

export const customerCheckoutByToken = gql`
  ${checkoutFragment}
  query CustomerCheckoutByTokenApp($token: UUID) {
    checkout(token: $token) {
      ...Checkout
    }
  }
`;
