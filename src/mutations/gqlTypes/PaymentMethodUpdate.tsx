/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCheckoutPaymentMethod
// ====================================================

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_totalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_totalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_totalPrice_net;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_subtotalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_subtotalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_subtotalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_subtotalPrice_net;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_billingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_billingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default Payment address.
   */
  isDefaultPaymentAddress: boolean | null;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_PaymentAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_PaymentAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_PaymentAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default Payment address.
   */
  isDefaultPaymentAddress: boolean | null;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_availablePaymentMethods_price {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_availablePaymentMethods {
  __typename: "PaymentMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  price: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_availablePaymentMethods_price | null;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_PaymentMethod_price {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_PaymentMethod {
  __typename: "PaymentMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  price: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_PaymentMethod_price | null;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_PaymentPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_PaymentPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_PaymentPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_PaymentPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_PaymentPrice_net;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_totalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_totalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_totalPrice_net;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_pricing_price_net;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_pricing_price | null;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_attributes_values | null)[];
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_product_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  isPaymentRequired: boolean;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_product_thumbnail2x | null;
  productType: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_product_productType;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_attributes[];
  product: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant_product;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines {
  __typename: "CheckoutLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  /**
   * The sum of the checkout line price, taxes and discounts.
   */
  totalPrice: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_totalPrice | null;
  variant: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines_variant;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_discount {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_availablePaymentGateways_config {
  __typename: "GatewayConfigLine";
  /**
   * Gateway config key.
   */
  field: string;
  /**
   * Gateway config value for key.
   */
  value: string | null;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_availablePaymentGateways {
  __typename: "PaymentGateway";
  /**
   * Payment gateway ID.
   */
  id: string;
  /**
   * Payment gateway name.
   */
  name: string;
  /**
   * Payment gateway client configuration.
   */
  config: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_availablePaymentGateways_config[];
  /**
   * Payment gateway supported currencies.
   */
  currencies: (string | null)[];
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout {
  __typename: "Checkout";
  /**
   * The checkout's token.
   */
  token: any;
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The sum of the the checkout line prices, with all the taxes,Payment costs, and discounts included.
   */
  totalPrice: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_totalPrice | null;
  /**
   * The price of the checkout before Payment, with taxes included.
   */
  subtotalPrice: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_subtotalPrice | null;
  billingAddress: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_billingAddress | null;
  PaymentAddress: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_PaymentAddress | null;
  /**
   * Email of a customer.
   */
  email: string;
  /**
   * Payment methods that can be used with this order.
   */
  availablePaymentMethods: (UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_availablePaymentMethods | null)[];
  PaymentMethod: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_PaymentMethod | null;
  /**
   * The price of the Payment, with all the taxes included.
   */
  PaymentPrice: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_PaymentPrice | null;
  /**
   * A list of checkout lines, each containing information about an item in the checkout.
   */
  lines: (UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_lines | null)[] | null;
  /**
   * Returns True, if checkout requires Payment.
   */
  isPaymentRequired: boolean;
  discount: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
  /**
   * List of available payment gateways.
   */
  availablePaymentGateways: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout_availablePaymentGateways[];
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_errors {
  __typename: "CheckoutError";
  /**
   * The error code.
   */
  code: CheckoutErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate {
  __typename: "CheckoutPaymentMethodUpdate";
  /**
   * An updated checkout.
   */
  checkout: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_checkout | null;
  errors: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate_errors[];
}

export interface UpdateCheckoutPaymentMethod {
  /**
   * Updates the Payment address of the checkout.
   */
  checkoutPaymentMethodUpdate: UpdateCheckoutPaymentMethod_checkoutPaymentMethodUpdate | null;
}

export interface UpdateCheckoutPaymnetMethodVariables {
  checkoutId: string;
  gatewayId: string;
  useCashback: boolean
}
