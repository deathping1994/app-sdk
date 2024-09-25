import { gql } from "@apollo/client";

import {
  atcChecckoutFragment,
  checkoutFragment,
  checkoutPriceFragment,
} from "../fragments/checkout";
import { paymentFragment } from "../fragments/payment";
import { orderDetailFragment } from "../fragments/order";
import {
  checkoutErrorFragment,
  paymentErrorFragment,
} from "../fragments/errors";

export const updateCheckoutLineMutation = gql`
  ${checkoutFragment}
  ${checkoutErrorFragment}
  mutation UpdateCheckoutLine($checkoutId: ID!, $lines: [CheckoutLineInput]!) {
    checkoutLinesUpdate(checkoutId: $checkoutId, lines: $lines) {
      checkout {
        ...Checkout
      }
      errors: checkoutErrors {
        ...CheckoutError
      }
    }
  }
`;

export const updateCheckoutAddressType = gql`
  mutation UpdateCheckoutAddressType($addressId: ID!, $type: AddressTypes!) {
    addressTypeUpdate(addressId: $addressId, type: $type) {
      addressLink {
        id
        address {
          id
          firstName
          lastName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          phone
        }
        type
      }
    }
  }
`;

export const createCheckoutMutation = gql`
  ${checkoutFragment}
  ${checkoutErrorFragment}
  mutation CreateCheckout($checkoutInput: CheckoutCreateInput!) {
    checkoutCreate(input: $checkoutInput) {
      errors: checkoutErrors {
        ...CheckoutError
      }
      checkout {
        ...Checkout
      }
    }
  }
`;

export const updateCheckoutBillingAddressWithEmailMutation = gql`
  ${checkoutFragment}
  ${checkoutErrorFragment}
  mutation UpdateCheckoutBillingAddressWithEmail(
    $checkoutId: ID!
    $billingAddress: AddressInput!
    $email: String!
  ) {
    checkoutBillingAddressUpdate(
      checkoutId: $checkoutId
      billingAddress: $billingAddress
    ) {
      errors: checkoutErrors {
        ...CheckoutError
      }
      checkout {
        ...Checkout
      }
    }
    checkoutEmailUpdate(checkoutId: $checkoutId, email: $email) {
      checkout {
        ...Checkout
      }
      errors: checkoutErrors {
        code
        field
        message
      }
    }
  }
`;

export const updateCheckoutBillingAddressMutation = gql`
  ${checkoutFragment}
  ${checkoutErrorFragment}
  mutation UpdateCheckoutBillingAddress(
    $checkoutId: ID!
    $billingAddress: AddressInput!
  ) {
    checkoutBillingAddressUpdate(
      checkoutId: $checkoutId
      billingAddress: $billingAddress
    ) {
      errors: checkoutErrors {
        ...CheckoutError
      }
      checkout {
        ...Checkout
      }
    }
  }
`;

export const updateCheckoutShippingAddressMutation = gql`
  ${checkoutFragment}
  ${checkoutErrorFragment}
  mutation UpdateCheckoutShippingAddress(
    $checkoutId: ID!
    $shippingAddress: AddressInput!
    $email: String!
    $isRecalculate: Boolean
  ) {
    checkoutShippingAddressUpdate(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
      email: $email
      isRecalculate: $isRecalculate
    ) {
      errors: checkoutErrors {
        ...CheckoutError
      }
      checkout {
        ...Checkout
      }
    }
  }
`;

export const updateCheckoutShippingMethodMutation = gql`
  ${checkoutFragment}
  ${checkoutErrorFragment}
  mutation UpdateCheckoutShippingMethod(
    $checkoutId: ID!
    $shippingMethodId: ID!
    $isRecalculate: Boolean
  ) {
    checkoutShippingMethodUpdate(
      checkoutId: $checkoutId
      shippingMethodId: $shippingMethodId
      isRecalculate: $isRecalculate
    ) {
      checkout {
        ...Checkout
      }
      errors: checkoutErrors {
        ...CheckoutError
      }
    }
  }
`;

export const updateCheckoutPaymentMethodMutation = gql`
  ${checkoutFragment}
  ${checkoutErrorFragment}
  mutation CheckoutPaymentMethodUpdate(
    $checkoutId: ID!
    $gatewayId: String!
    $useCashback: Boolean!
    $isRecalculate: Boolean
  ) {
    checkoutPaymentMethodUpdate(
      checkoutId: $checkoutId
      gatewayId: $gatewayId
      useCashback: $useCashback
      isRecalculate: $isRecalculate
    ) {
      checkout {
        ...Checkout
      }
      errors: checkoutErrors {
        ...CheckoutError
      }
    }
  }
`;

export const addCheckoutPromoCode = gql`
  ${checkoutFragment}
  mutation AddCheckoutPromoCode(
    $checkoutId: ID!
    $promoCode: String!
    $isRecalculate: Boolean
  ) {
    checkoutAddPromoCode(
      checkoutId: $checkoutId
      promoCode: $promoCode
      isRecalculate: $isRecalculate
    ) {
      checkout {
        ...Checkout
      }
      errors {
        field
        message
      }
    }
  }
`;

export const removeCheckoutPromoCode = gql`
  ${checkoutFragment}
  mutation RemoveCheckoutPromoCode(
    $checkoutId: ID!
    $promoCode: String!
    $isRecalculate: Boolean
  ) {
    checkoutRemovePromoCode(
      checkoutId: $checkoutId
      promoCode: $promoCode
      isRecalculate: $isRecalculate
    ) {
      checkout {
        ...Checkout
      }
      errors {
        field
        message
      }
    }
  }
`;

export const createCheckoutPaymentMutation = gql`
  ${checkoutFragment}
  ${paymentFragment}
  ${paymentErrorFragment}
  mutation CreateCheckoutPayment(
    $checkoutId: ID!
    $paymentInput: PaymentInput!
  ) {
    checkoutPaymentCreate(checkoutId: $checkoutId, input: $paymentInput) {
      checkout {
        ...Checkout
      }
      payment {
        ...Payment
      }
      errors: paymentErrors {
        ...PaymentError
      }
    }
  }
`;

export const completeCheckoutMutation = gql`
  ${orderDetailFragment}
  ${checkoutErrorFragment}
  mutation CompleteCheckout(
    $checkoutId: ID!
    $paymentData: JSONString
    $redirectUrl: String
    $storeSource: Boolean
  ) {
    checkoutComplete(
      checkoutId: $checkoutId
      paymentData: $paymentData
      redirectUrl: $redirectUrl
      storeSource: $storeSource
    ) {
      errors: checkoutErrors {
        ...CheckoutError
      }
      order {
        ...OrderDetail
      }
      confirmationNeeded
      confirmationData
    }
  }
`;

export const ADD_CHECKOUT_LINE_MUTATION = gql`
  ${atcChecckoutFragment}
  ${checkoutErrorFragment}
  mutation AddCheckoutLine($checkoutId: ID!, $lines: [CheckoutLineInput]!) {
    checkoutLinesAdd(checkoutId: $checkoutId, lines: $lines) {
      checkout {
        ...Checkout
      }
      errors: checkoutErrors {
        ...CheckoutError
      }
    }
  }
`;

export const REMOVE_CHECKOUT_LINE_MUTATION = gql`
  ${atcChecckoutFragment}
  ${checkoutErrorFragment}
  mutation RemoveCheckoutLine($checkoutId: ID!, $lineId: ID) {
    checkoutLineDelete(checkoutId: $checkoutId, lineId: $lineId) {
      checkout {
        ...Checkout
      }
      errors: checkoutErrors {
        ...CheckoutError
      }
    }
  }
`;

export const CHECKOUT_PAYMENTS = gql`
  ${checkoutPriceFragment}
  query CheckoutPayments($token: UUID) {
    checkout(token: $token) {
      id
      token
      totalPrice {
        ...Price
      }
      cashback {
        amount
        willAddOn
      }
      voucherCode
      discount {
        amount
        currency
      }
      shippingPrice {
        currency
        gross {
          currency
          amount
        }
        net {
          currency
          amount
        }
      }
      paymentMethod {
        cashbackDiscountAmount
        couponDiscount
        prepaidDiscountAmount
      }
      subtotalPrice {
        ...Price
      }
    }
  }
`;

export const updateCheckoutMetaData = gql`
  mutation UpdateCheckoutMeta($checkoutId: ID!, $input: [MetadataInput!]!) {
    updateMetadata(id: $checkoutId, input: $input) {
      item {
        metadata {
          key
          value
        }
      }
    }
  }
`;
