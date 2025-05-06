import { gql } from "@apollo/client";

import {
  atcChecckoutFragment,
  checkoutFragment,
  checkoutLineWithAddOnFragment,
  checkoutPriceFragment,
} from "../fragments/checkout";
import { paymentFragment } from "../fragments/payment";
import { orderDetailFragment } from "../fragments/order";
import {
  checkoutErrorFragment,
  paymentErrorFragment,
} from "../fragments/errors";
import { invoiceFragment } from "../fragments/invoice";

export const updateCheckoutLineMutation = gql`
  ${checkoutFragment}
  ${checkoutErrorFragment}
  mutation UpdateCheckoutLineApp(
    $checkoutId: ID!
    $lines: [CheckoutLineInput]!
  ) {
    checkoutLinesUpdate(
      checkoutId: $checkoutId
      lines: $lines
      isRecalculate: true
    ) {
      checkout {
        ...Checkout
      }
      checkoutErrors {
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
  ${invoiceFragment}
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
        invoices {
          ...InvoiceFragment
        }
      }
      confirmationNeeded
      confirmationData
    }
  }
`;

export const completeCheckoutMultipleMutation = gql`
  ${orderDetailFragment}
  ${checkoutErrorFragment}
  ${invoiceFragment}
  mutation CheckoutMultipleComplete($checkoutIds: [CheckoutCompleteInput]) {
    checkoutMultipleComplete(checkoutIds: $checkoutIds) {
      errors: checkoutErrors {
        ...CheckoutError
      }
      orders {
        ...OrderDetail
        invoices {
          ...InvoiceFragment
        }
      }
    }
  }
`;

export const addCheckoutLineMutation = gql`
  ${checkoutFragment}
  mutation AddCheckoutLine($checkoutId: ID!, $lines: [CheckoutLineInput]!) {
    checkoutLinesAdd(
      checkoutId: $checkoutId
      lines: $lines
      isRecalculate: true
    ) {
      checkout {
        ...Checkout
      }
      checkoutErrors {
        field
        code
        message
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

export const addOnsLineCreateMutation = gql`
  ${checkoutFragment}
  mutation CheckoutLineAddOnCreate($input: AddOnLinesCreateInput) {
    addOnsLineCreate(input: $input) {
      checkout {
        ...Checkout
      }
      addOnsErrors {
        code
        field
        message
      }
    }
  }
`;

export const addOnsLineDelete = gql`
  ${checkoutFragment}
  mutation AddOnsLineDelete($id: ID) {
    addOnsLineDelete(id: $id) {
      checkout {
        ...Checkout
      }
      addOnsErrors {
        code
        field
        message
      }
    }
  }
`;

export const checkoutLineAddExtraData = gql`
  ${checkoutLineWithAddOnFragment}
  mutation CheckoutLineAddExtraData(
    $checkoutLineId: ID!
    $input: [CheckoutLineExtraDataInput]
  ) {
    checkoutLineAddExtraData(checkoutLineId: $checkoutLineId, input: $input) {
      checkoutLine {
        ...CheckoutLineWithAddOn
      }
      checkoutErrors {
        code
        field
        message
      }
    }
  }
`;

export const checkoutLineDeleteExtraData = gql`
  ${checkoutLineWithAddOnFragment}
  mutation CheckoutLineDeleteExtraData(
    $checkoutLineId: ID!
    $key: [ExtraDataEnum]!
  ) {
    checkoutLineDeleteExtraData(checkoutLineId: $checkoutLineId, key: $key) {
      checkoutLine {
        ...CheckoutLineWithAddOn
      }
      checkoutErrors {
        code
        field
        message
      }
    }
  }
`;

export const checkoutUpdateDataMutation = gql`
  ${checkoutFragment}
  mutation CheckoutUpdateDataApp(
    $checkoutId: ID!
    $input: CheckoutUpdateDataInput!
  ) {
    checkoutUpdateData(checkoutId: $checkoutId, input: $input) {
      checkout {
        ...Checkout
      }
      checkoutErrors {
        code
        field
        message
        variants
      }
    }
  }
`;

export const checkoutLineUpdateDataMutation = gql`
  ${checkoutFragment}
  mutation CheckoutLineUpdateDataApp(
    $checkoutLineId: ID!
    $input: CheckoutLinesUpdateDataInput!
  ) {
    checkoutLineUpdateData(checkoutLineId: $checkoutLineId, input: $input) {
      checkout {
        ...Checkout
      }
      checkoutErrors {
        code
        field
        message
        variants
      }
    }
  }
`;

export const checkoutCustomDiscountAddMutation = gql`
  ${checkoutFragment}
  mutation CheckoutCustomDiscountAddMutationApp(
    $input: [CheckoutCustomDiscountAddInput]!
  ) {
    checkoutCustomDiscountAdd(input: $input) {
      checkouts {
        ...Checkout
      }
      checkoutErrors {
        field
        message
        code
        variants
      }
    }
  }
`;

export const checkoutSublineUpdateMutation = gql`
  ${checkoutFragment}
  mutation CheckoutSublineUpdate(
    $checkoutLineId: ID!
    $replace: Boolean
    $sublines: [CheckoutLineInput]!
  ) {
    checkoutSublinesUpdate(
      checkoutLineId: $checkoutLineId
      replace: $replace
      sublines: $sublines
    ) {
      checkout {
        ...Checkout
      }
      checkoutErrors {
        field
        message
        code
        variants
      }
    }
  }
`;

export const checkoutLineImageAudioDeleteMutation = gql`
  ${checkoutLineWithAddOnFragment}
  mutation CheckoutLineImageAudioDelete($extraDataId: ID!) {
    checkoutLineImageAudioDelete(extraDataId: $extraDataId) {
      checkoutLine {
        ...CheckoutLineWithAddOn
      }
      checkoutErrors {
        field
        message
        code
        variants
      }
      message
    }
  }
`;

export const checkoutExtraDataDeleteMutation = gql`
  ${checkoutFragment}
  mutation CheckoutDeleteExtraDataMutationApp($extraDataId: ID!) {
    checkoutDeleteExtraData(extraDataId: $extraDataId) {
      checkout {
        ...Checkout
      }
      checkoutErrors {
        field
        message
        code
        variants
      }
    }
  }
`;

export const checkoutExpressAddMutation = gql`
  ${checkoutFragment}
  mutation CheckoutExpressAddMutationApp($checkoutIds: [ID]!) {
    checkoutExpressAdd(checkoutIds: $checkoutIds) {
      checkouts {
        ...Checkout
      }
      checkoutErrors {
        field
        message
        code
        variants
      }
    }
  }
`;

export const checkoutExpressRemoveMutation = gql`
  ${checkoutFragment}
  mutation CheckoutExpressRemoveMutationApp($checkoutIds: [ID]!) {
    checkoutExpressRemove(checkoutIds: $checkoutIds) {
      checkouts {
        ...Checkout
      }
      checkoutErrors {
        field
        message
        code
        variants
      }
    }
  }
`;

export const checkoutLineExpressAddMutation = gql`
  ${checkoutFragment}
  mutation CheckoutLineExpressAddMutationApp(
    $checkoutLineId: ID!
    $price: String!
    $checkoutIds: [ID]!
  ) {
    checkoutLineExpressAdd(
      checkoutLineId: $checkoutLineId
      price: $price
      checkoutIds: $checkoutIds
    ) {
      checkouts {
        ...Checkout
      }
      checkoutErrors {
        field
        message
        code
        variants
      }
    }
  }
`;

export const checkoutLineExpressRemoveMutation = gql`
  ${checkoutFragment}
  mutation checkoutLineExpressRemoveMutationApp($checkoutLineId: ID!) {
    checkoutLineExpressRemove(checkoutLineId: $checkoutLineId) {
      checkout {
        ...Checkout
      }
      checkoutErrors {
        field
        message
        code
        variants
      }
    }
  }
`;

export const cartCreateMutation = gql`
  ${checkoutFragment}
  mutation CartCreateMutationApp($customerId: ID!) {
    cartCreate(customerId: $customerId) {
      cart {
        checkouts {
          ...Checkout
        }
        client {
          id
          clientCode
          clientName
        }
        id
        orderCreated
      }
      checkoutErrors {
        field
        message
        code
        variants
      }
    }
  }
`;
