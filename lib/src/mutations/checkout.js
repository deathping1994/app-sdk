"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOVE_CHECKOUT_LINE_MUTATION = exports.ADD_CHECKOUT_LINE_MUTATION = exports.completeCheckoutMutation = exports.createCheckoutPaymentMutation = exports.removeCheckoutPromoCode = exports.addCheckoutPromoCode = exports.updateCheckoutPaymentMethodMutation = exports.updateCheckoutShippingMethodMutation = exports.updateCheckoutShippingAddressMutation = exports.updateCheckoutBillingAddressMutation = exports.updateCheckoutBillingAddressWithEmailMutation = exports.createCheckoutMutation = exports.updateCheckoutAddressType = exports.updateCheckoutLineMutation = void 0;
const client_1 = require("@apollo/client");
const checkout_1 = require("../fragments/checkout");
const payment_1 = require("../fragments/payment");
const order_1 = require("../fragments/order");
const errors_1 = require("../fragments/errors");
exports.updateCheckoutLineMutation = client_1.gql `
  ${checkout_1.checkoutFragment}
  ${errors_1.checkoutErrorFragment}
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
exports.updateCheckoutAddressType = client_1.gql `
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
exports.createCheckoutMutation = client_1.gql `
  ${checkout_1.checkoutFragment}
  ${errors_1.checkoutErrorFragment}
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
exports.updateCheckoutBillingAddressWithEmailMutation = client_1.gql `
  ${checkout_1.checkoutFragment}
  ${errors_1.checkoutErrorFragment}
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
exports.updateCheckoutBillingAddressMutation = client_1.gql `
  ${checkout_1.checkoutFragment}
  ${errors_1.checkoutErrorFragment}
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
exports.updateCheckoutShippingAddressMutation = client_1.gql `
  ${checkout_1.checkoutFragment}
  ${errors_1.checkoutErrorFragment}
  mutation UpdateCheckoutShippingAddress(
    $checkoutId: ID!
    $shippingAddress: AddressInput!
    $email: String!
  ) {
    checkoutShippingAddressUpdate(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
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
        ...CheckoutError
      }
    }
  }
`;
exports.updateCheckoutShippingMethodMutation = client_1.gql `
  ${checkout_1.checkoutFragment}
  ${errors_1.checkoutErrorFragment}
  mutation UpdateCheckoutShippingMethod(
    $checkoutId: ID!
    $shippingMethodId: ID!
  ) {
    checkoutShippingMethodUpdate(
      checkoutId: $checkoutId
      shippingMethodId: $shippingMethodId
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
exports.updateCheckoutPaymentMethodMutation = client_1.gql `
  ${checkout_1.checkoutFragment}
  ${errors_1.checkoutErrorFragment}
  mutation CheckoutPaymentMethodUpdate(
    $checkoutId: ID!
    $gatewayId: String!
    $useCashback: Boolean!
  ) {
    checkoutPaymentMethodUpdate(
      checkoutId: $checkoutId
      gatewayId: $gatewayId
      useCashback: $useCashback
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
exports.addCheckoutPromoCode = client_1.gql `
  ${checkout_1.checkoutFragment}
  mutation AddCheckoutPromoCode($checkoutId: ID!, $promoCode: String!) {
    checkoutAddPromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
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
exports.removeCheckoutPromoCode = client_1.gql `
  ${checkout_1.checkoutFragment}
  mutation RemoveCheckoutPromoCode($checkoutId: ID!, $promoCode: String!) {
    checkoutRemovePromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
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
exports.createCheckoutPaymentMutation = client_1.gql `
  ${checkout_1.checkoutFragment}
  ${payment_1.paymentFragment}
  ${errors_1.paymentErrorFragment}
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
exports.completeCheckoutMutation = client_1.gql `
  ${order_1.orderDetailFragment}
  ${errors_1.checkoutErrorFragment}
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
exports.ADD_CHECKOUT_LINE_MUTATION = client_1.gql `
  ${checkout_1.atcChecckoutFragment}
  ${errors_1.checkoutErrorFragment}
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
exports.REMOVE_CHECKOUT_LINE_MUTATION = client_1.gql `
  ${checkout_1.atcChecckoutFragment}
  ${errors_1.checkoutErrorFragment}
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
//# sourceMappingURL=checkout.js.map