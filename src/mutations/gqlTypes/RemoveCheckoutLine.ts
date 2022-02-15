/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutLineInput, CheckoutErrorCode } from "../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveCheckoutLine
// ====================================================

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_gross {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_net {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RemoveCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: RemoveCheckoutLine_checkoutLinesUpdate_checkout_totalPrice_net;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_gross {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_net {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RemoveCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: RemoveCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice_net;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_billingRemoveress_country {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_billingRemoveress {
  __typename: "Removeress";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetRemoveress1: string;
  streetRemoveress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: RemoveCheckoutLine_checkoutLinesUpdate_checkout_billingRemoveress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Removeress is user's default billing Removeress.
   */
  isDefaultBillingRemoveress: boolean | null;
  /**
   * Removeress is user's default shipping Removeress.
   */
  isDefaultShippingRemoveress: boolean | null;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_shippingRemoveress_country {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_shippingRemoveress {
  __typename: "Removeress";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetRemoveress1: string;
  streetRemoveress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: RemoveCheckoutLine_checkoutLinesUpdate_checkout_shippingRemoveress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Removeress is user's default billing Removeress.
   */
  isDefaultBillingRemoveress: boolean | null;
  /**
   * Removeress is user's default shipping Removeress.
   */
  isDefaultShippingRemoveress: boolean | null;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods_price {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  price: RemoveCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods_price | null;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod_price {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  price: RemoveCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod_price | null;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_gross {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_net {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RemoveCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: RemoveCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice_net;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_gross {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_net {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice_net;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_net {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted_net;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_gross {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_net {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price_net;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing_price | null;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_attributes_attribute {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_attributes_values {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_attributes_values | null)[];
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  isShippingRequired: boolean;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_thumbnail2x | null;
  productType: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product_productType;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant {
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
  pricing: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_attributes[];
  product: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant_product;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines {
  __typename: "CheckoutLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  /**
   * The sum of the checkout line price, taxes and discounts.
   */
  totalPrice: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_totalPrice | null;
  variant: RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines_variant;
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_discount {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_availablePaymentGateways_config {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout_availablePaymentGateways {
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
  config: RemoveCheckoutLine_checkoutLinesUpdate_checkout_availablePaymentGateways_config[];
  /**
   * Payment gateway supported currencies.
   */
  currencies: (string | null)[];
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_checkout {
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
  totalPrice: RemoveCheckoutLine_checkoutLinesUpdate_checkout_totalPrice | null;
  /**
   * The price of the checkout before shipping, with taxes included.
   */
  subtotalPrice: RemoveCheckoutLine_checkoutLinesUpdate_checkout_subtotalPrice | null;
  billingRemoveress: RemoveCheckoutLine_checkoutLinesUpdate_checkout_billingRemoveress | null;
  shippingRemoveress: RemoveCheckoutLine_checkoutLinesUpdate_checkout_shippingRemoveress | null;
  /**
   * Email of a customer.
   */
  email: string;
  note: string;
  /**
   * Shipping methods that can be used with this order.
   */
  availableShippingMethods: (RemoveCheckoutLine_checkoutLinesUpdate_checkout_availableShippingMethods | null)[];
  shippingMethod: RemoveCheckoutLine_checkoutLinesUpdate_checkout_shippingMethod | null;
  /**
   * The price of the shipping, with all the taxes included.
   */
  shippingPrice: RemoveCheckoutLine_checkoutLinesUpdate_checkout_shippingPrice | null;
  /**
   * A list of checkout lines, each containing information about an item in the checkout.
   */
  lines: (RemoveCheckoutLine_checkoutLinesUpdate_checkout_lines | null)[] | null;
  /**
   * Returns True, if checkout requires shipping.
   */
  isShippingRequired: boolean;
  discount: RemoveCheckoutLine_checkoutLinesUpdate_checkout_discount | null;
  discountName: string | null;
  translatedDiscountName: string | null;
  voucherCode: string | null;
  /**
   * List of available payment gateways.
   */
  availablePaymentGateways: RemoveCheckoutLine_checkoutLinesUpdate_checkout_availablePaymentGateways[];
}

export interface RemoveCheckoutLine_checkoutLinesUpdate_errors {
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

export interface RemoveCheckoutLine_checkoutLinesUpdate {
  __typename: "CheckoutLinesUpdate";
  /**
   * An updated checkout.
   */
  checkout: RemoveCheckoutLine_checkoutLinesUpdate_checkout | null;
  errors: RemoveCheckoutLine_checkoutLinesUpdate_errors[];
}

export interface RemoveCheckoutLine {
  /**
   * Updates checkout line in the existing checkout.
   */
   checkoutLineDelete : RemoveCheckoutLine_checkoutLinesUpdate | null;
}

export interface RemoveCheckoutLineVariables {
    checkoutId: string
    lineId: string
}
