import { gql } from "@apollo/client";

import {
  atcChecckoutFragment,
  cartFragment,
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
      message
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
  mutation CheckoutMultipleComplete(
    $cartId: ID!
    $advanceAmount: Decimal
    $advanceAmountMethod: String
  ) {
    checkoutMultipleComplete(
      cartId: $cartId
      advanceAmount: $advanceAmount
      advanceAmountMethod: $advanceAmountMethod
    ) {
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
  mutation AddCheckoutLine($checkoutId: ID!, $lines: [CheckoutLineInput]!, $sublines: [CheckoutLineInput]) {
    checkoutLinesAdd(
      checkoutId: $checkoutId
      lines: $lines
      isRecalculate: true
      sublines: $sublines
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
  mutation AddOnsLineDelete($checkoutId: ID!, $groupId: Int!, $addOns:  [AddOnDetails]!) {
    addOnsLineDelete(input:{checkoutId: $checkoutId, groupId: $groupId, addOns: $addOns}) {
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
    $checkoutId: ID!
    $groupId: ID
    $input: [CheckoutLineExtraDataInput]
  ) {
    checkoutLineAddExtraData(checkoutId:$checkoutId, groupId: $groupId, input: $input) {
      checkout {
      linesByGroup{
        ...CheckoutLineWithAddOn
      }
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
    $checkoutId : ID!
    $checkoutLineGroupId: Int!
    $input: CheckoutLinesUpdateDataInput!
    $variantId: ID
  ) {
    checkoutLineUpdateData(checkoutId:$checkoutId,checkoutLineGroupId: $checkoutLineGroupId, input: $input, variantId:$variantId) {
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
    $checkoutId: ID!
    $groupId: Int,
    $replace: Boolean
    $sublines: [CheckoutLineInput]!
  ) {
    checkoutSublinesUpdate(
      checkoutId: $checkoutId
      replace: $replace
      groupId: $groupId,
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
  ${cartFragment}
  mutation CheckoutExpressAddMutationApp($checkoutIds: [ID]!) {
    checkoutExpressAdd(checkoutIds: $checkoutIds) {
    checkouts{
      cart {
        ...Cart
      }
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
  ${cartFragment}
  mutation CheckoutExpressRemoveMutationApp($checkoutIds: [ID]!) {
    checkoutExpressRemove(checkoutIds: $checkoutIds) {
    checkouts{
      cart {
        ...Cart
      }
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
  ${cartFragment}
  mutation CheckoutLineExpressAddMutationApp(
    $checkoutLineId: ID!
    $price: String!
  ) {
    checkoutLineExpressAdd(checkoutLineId: $checkoutLineId, price: $price) {
      cart {
        ...Cart
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
  ${cartFragment}
  mutation checkoutLineExpressRemoveMutationApp($checkoutLineId: ID!) {
    checkoutLineExpressRemove(checkoutLineId: $checkoutLineId) {
      cart {
        ...Cart
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
  ${cartFragment}
  mutation CartCreateMutationApp($customerId: ID!) {
    cartCreate(customerId: $customerId) {
      cart {
        ...Cart
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

export const cartExpressAddMutation = gql`
  ${cartFragment}
  mutation CheckoutExpressOverallAddMutationApp($cartId: ID!) {
    checkoutExpressOverallAdd(cartId: $cartId) {
      cart {
        ...Cart
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

export const cartExpressRemoveMutation = gql`
  ${cartFragment}
  mutation CheckoutExpressOverallRemoveMutationApp($cartId: ID!) {
    checkoutExpressOverallRemove(cartId: $cartId) {
      cart {
        ...Cart
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

export const addPackageToCartMutation = gql`
  mutation addPackageToCartApp($cartId: ID!, $packageId: ID!) {
    addPackageToCart(cartId: $cartId, packageId: $packageId) {
      packageErrors {
        field
        message
        code
      }
      packageOrders {
        id
      }
    }
  }
`;

export const addPackageToOrderMutation = gql`
  mutation addPackageToOrderApp($orderId: ID!, $packageId: ID!) {
    addPackageToOrder(orderId: $orderId, packageId: $packageId) {
      packageErrors {
        field
        message
        code
      }
      packageOrder {
        id
      }
    }
  }
`;
export const confirmPackageOnCartMutation = gql`
  mutation confirmPackageOnCartApp(
    $otp: String
    $cartId: ID!
    $skipOtp: Boolean
  ) {
    confirmPackageOnCart(otp: $otp, cartId: $cartId, skipOtp: $skipOtp) {
      packageCustomer {
        id
        created
        balanceAmount
        totalSaved
        totalUsage
        utilizedAmount
      }
      packageErrors {
        code
        field
        message
      }
    }
  }
`;

export const confirmPackageOnOrderMutation = gql`
  mutation confirmPackageOnOrderApp(
    $orderId: ID!
    $otp: String
    $skipOtp: Boolean
  ) {
    confirmPackageOnOrder(orderId: $orderId, otp: $otp, skipOtp: $skipOtp) {
      packageCustomer {
        id
        created
        balanceAmount
        totalSaved
        totalUsage
        utilizedAmount
      }
      order {
        id
        invoices {
          url
        }
        invoiceTemplate
      }
      packageErrors {
        code
        field
        message
      }
    }
  }
`;

export const packageCustomerAddAmountApp = gql`
  mutation packageCustomerAddAmountApp($customerId: ID!, $packageId: ID!) {
    packageCustomerAddAmount(customerId: $customerId, packageId: $packageId) {
      packageCustomer {
        id
        balanceAmount
        expiryDate
        package {
          name
          __typename
        }
        validityDays
        utilizedAmount
        __typename
      }
      packageCustomerSubscription {
        id
        __typename
      }
      packageErrors {
        field
        message
        code
        __typename
      }
      __typename
    }
  }
`;

export const packageCustomerCreate = gql`
  mutation packageCustomerCreateApp(
    $customerId: ID!
    $packageId: ID!
  ) {
    packageCustomerCreate(
      customerId: $customerId
      packageId: $packageId
    ) {
      packageCustomer {
        id
      }
      packageCustomerSubscription {
        id
      }
      packageErrors {
        field
        message
        code
      }
    }
  }
`;
