/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutLineInput, CheckoutErrorCode } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: RefreshCheckoutLine
// ====================================================

export interface RefreshCheckoutLine_checkoutRefresh_checkout_totalPrice_gross {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_totalPrice_net {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RefreshCheckoutLine_checkoutRefresh_checkout_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: RefreshCheckoutLine_checkoutRefresh_checkout_totalPrice_net;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_subtotalPrice_gross {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_subtotalPrice_net {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RefreshCheckoutLine_checkoutRefresh_checkout_subtotalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: RefreshCheckoutLine_checkoutRefresh_checkout_subtotalPrice_net;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_billingAddress_country {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_billingAddress {
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
  country: RefreshCheckoutLine_checkoutRefresh_checkout_billingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_shippingAddress_country {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_shippingAddress {
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
  country: RefreshCheckoutLine_checkoutRefresh_checkout_shippingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_availableShippingMethods_price {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  price: RefreshCheckoutLine_checkoutRefresh_checkout_availableShippingMethods_price | null;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_shippingMethod_price {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  price: RefreshCheckoutLine_checkoutRefresh_checkout_shippingMethod_price | null;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_shippingPrice_gross {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_shippingPrice_net {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RefreshCheckoutLine_checkoutRefresh_checkout_shippingPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: RefreshCheckoutLine_checkoutRefresh_checkout_shippingPrice_net;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_totalPrice_gross {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_totalPrice_net {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RefreshCheckoutLine_checkoutRefresh_checkout_lines_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: RefreshCheckoutLine_checkoutRefresh_checkout_lines_totalPrice_net;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_pricing_priceUndiscounted_gross {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_pricing_priceUndiscounted_net {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_pricing_price_gross {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_pricing_price_net {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_pricing_price_net;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_pricing_price | null;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_attributes_attribute {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_attributes_values {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_attributes_values | null)[];
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_product_thumbnail {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_product_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  isShippingRequired: boolean;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_product_thumbnail2x | null;
  productType: RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_product_productType;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant {
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
  pricing: RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_attributes[];
  product: RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant_product;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_lines {
  __typename: "CheckoutLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  /**
   * The sum of the checkout line price, taxes and discounts.
   */
  totalPrice: RefreshCheckoutLine_checkoutRefresh_checkout_lines_totalPrice | null;
  variant: RefreshCheckoutLine_checkoutRefresh_checkout_lines_variant;
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout_discount {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_availablePaymentGateways_config {
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

export interface RefreshCheckoutLine_checkoutRefresh_checkout_availablePaymentGateways {
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
  config: RefreshCheckoutLine_checkoutRefresh_checkout_availablePaymentGateways_config[];
  /**
   * Payment gateway supported currencies.
   */
  currencies: (string | null)[];
}

export interface RefreshCheckoutLine_checkoutRefresh_checkout {
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
   * The sum of the the checkout line prices, with all the taxes,shipping costs, and discounts included.
   */
  totalPrice: RefreshCheckoutLine_checkoutRefresh_checkout_totalPrice | null;
  /**
   * The price of the checkout before shipping, with taxes included.
   */
  subtotalPrice: RefreshCheckoutLine_checkoutRefresh_checkout_subtotalPrice | null;
  billingAddress: RefreshCheckoutLine_checkoutRefresh_checkout_billingAddress | null;
  shippingAddress: RefreshCheckoutLine_checkoutRefresh_checkout_shippingAddress | null;
  /**
   * Email of a customer.
   */
  email: string;
  note: string;
  /**
   * Shipping methods that can be used with this order.
   */
  availableShippingMethods: (RefreshCheckoutLine_checkoutRefresh_checkout_availableShippingMethods | null)[];
  shippingMethod: RefreshCheckoutLine_checkoutRefresh_checkout_shippingMethod | null;
  /**
   * The price of the shipping, with all the taxes included.
   */
  shippingPrice: RefreshCheckoutLine_checkoutRefresh_checkout_shippingPrice | null;
  /**
   * A list of checkout lines, each containing information about an item in the checkout.
   */
  lines: (RefreshCheckoutLine_checkoutRefresh_checkout_lines | null)[] | null;
  /**
   * Returns True, if checkout requires shipping.
   */
  isShippingRequired: boolean;
  discount: RefreshCheckoutLine_checkoutRefresh_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
  /**
   * List of available payment gateways.
   */
  availablePaymentGateways: RefreshCheckoutLine_checkoutRefresh_checkout_availablePaymentGateways[];
}

export interface RefreshCheckoutLine_checkoutRefresh_errors {
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

export interface RefreshCheckoutLine_checkoutRefresh {
  __typename: "checkoutRefresh";
  /**
   * An Refreshd checkout.
   */
  checkout: RefreshCheckoutLine_checkoutRefresh_checkout | null;
  errors: RefreshCheckoutLine_checkoutRefresh_errors[];
}

export interface RefreshCheckoutLine {
  /**
   * Refreshs checkout line in the existing checkout.
   */
  checkoutRefresh: RefreshCheckoutLine_checkoutRefresh | null;
}

export interface RefreshCheckoutLineVariables {
  checkoutId: string;
}
