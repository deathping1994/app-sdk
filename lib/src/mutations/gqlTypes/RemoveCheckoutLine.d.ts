import { CheckoutErrorCode } from "./../../../gqlTypes/globalTypes";
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_totalPrice_gross {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_totalPrice_net {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_totalPrice {
    __typename: "TaxedMoney";
    /**
     * Amount of money including taxes.
     */
    gross: RemoveCheckoutLine_checkoutLineDelete_checkout_totalPrice_gross;
    /**
     * Amount of money without taxes.
     */
    net: RemoveCheckoutLine_checkoutLineDelete_checkout_totalPrice_net;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_subtotalPrice_gross {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_subtotalPrice_net {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_subtotalPrice {
    __typename: "TaxedMoney";
    /**
     * Amount of money including taxes.
     */
    gross: RemoveCheckoutLine_checkoutLineDelete_checkout_subtotalPrice_gross;
    /**
     * Amount of money without taxes.
     */
    net: RemoveCheckoutLine_checkoutLineDelete_checkout_subtotalPrice_net;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_billingAddress_country {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_billingAddress {
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
    country: RemoveCheckoutLine_checkoutLineDelete_checkout_billingAddress_country;
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_shippingAddress_country {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_shippingAddress {
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
    country: RemoveCheckoutLine_checkoutLineDelete_checkout_shippingAddress_country;
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_availableShippingMethods_price {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_availableShippingMethods {
    __typename: "ShippingMethod";
    /**
     * The ID of the object.
     */
    id: string;
    name: string;
    price: RemoveCheckoutLine_checkoutLineDelete_checkout_availableShippingMethods_price | null;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_shippingMethod_price {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_shippingMethod {
    __typename: "ShippingMethod";
    /**
     * The ID of the object.
     */
    id: string;
    name: string;
    price: RemoveCheckoutLine_checkoutLineDelete_checkout_shippingMethod_price | null;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_shippingPrice_gross {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_shippingPrice_net {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_shippingPrice {
    __typename: "TaxedMoney";
    /**
     * Amount of money including taxes.
     */
    gross: RemoveCheckoutLine_checkoutLineDelete_checkout_shippingPrice_gross;
    /**
     * Amount of money without taxes.
     */
    net: RemoveCheckoutLine_checkoutLineDelete_checkout_shippingPrice_net;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_totalPrice_gross {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_totalPrice_net {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_totalPrice {
    __typename: "TaxedMoney";
    /**
     * Amount of money including taxes.
     */
    gross: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_totalPrice_gross;
    /**
     * Amount of money without taxes.
     */
    net: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_totalPrice_net;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_tags {
    __typename: "TagType";
    /**
     * The name of the tag
     */
    name: string;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_images {
    __typename: "ProductImage";
    /**
     * The ID of the object.
     */
    id: string;
    sortOrder: number | null;
    alt: string;
    /**
     * The URL of the image.
     */
    url: string;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_metadata {
    __typename: "MetadataItem";
    /**
     * Key of a metadata item.
     */
    key: string;
    /**
     * Value of a metadata item.
     */
    value: string;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_pricing_priceUndiscounted_gross {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_pricing_priceUndiscounted_net {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_pricing_priceUndiscounted {
    __typename: "TaxedMoney";
    /**
     * Amount of money including taxes.
     */
    gross: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_pricing_priceUndiscounted_gross;
    /**
     * Amount of money without taxes.
     */
    net: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_pricing_priceUndiscounted_net;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_pricing_price_gross {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_pricing_price_net {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_pricing_price {
    __typename: "TaxedMoney";
    /**
     * Amount of money including taxes.
     */
    gross: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_pricing_price_gross;
    /**
     * Amount of money without taxes.
     */
    net: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_pricing_price_net;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_pricing {
    __typename: "VariantPricingInfo";
    /**
     * Whether it is in sale or not.
     */
    onSale: boolean | null;
    /**
     * The price without any discount.
     */
    priceUndiscounted: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_pricing_priceUndiscounted | null;
    /**
     * The price, with any discount subtracted.
     */
    price: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_pricing_price | null;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_attributes_attribute {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_attributes_values {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_attributes {
    __typename: "SelectedAttribute";
    /**
     * Name of an attribute displayed in the interface.
     */
    attribute: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_attributes_attribute;
    /**
     * Values of an attribute.
     */
    values: (RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_attributes_values | null)[];
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_product_tags {
    __typename: "TagType";
    /**
     * The name of the tag
     */
    name: string;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_product_thumbnail {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_product_thumbnail2x {
    __typename: "Image";
    /**
     * The URL of the image.
     */
    url: string;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_product_productType {
    __typename: "ProductType";
    /**
     * The ID of the object.
     */
    id: string;
    isShippingRequired: boolean;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_product {
    __typename: "Product";
    /**
     * The ID of the object.
     */
    id: string;
    name: string;
    slug: string;
    /**
     * Tags
     */
    tags: (RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_product_tags | null)[] | null;
    /**
     * The main thumbnail for a product.
     */
    thumbnail: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_product_thumbnail | null;
    /**
     * The main thumbnail for a product.
     */
    thumbnail2x: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_product_thumbnail2x | null;
    productType: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_product_productType;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant {
    __typename: "ProductVariant";
    /**
     * The ID of the object.
     */
    id: string;
    name: string;
    sku: string;
    /**
     * List of tags associated with the product variant
     */
    tags: (RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_tags | null)[] | null;
    /**
     * Quantity of a product available for sale in one checkout.
     */
    quantityAvailable: number;
    /**
     * Whether the variant is in stock and visible or not.
     */
    isAvailable: boolean | null;
    /**
     * List of images for the product variant.
     */
    images: (RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_images | null)[] | null;
    /**
     * List of public metadata items. Can be accessed without permissions.
     */
    metadata: (RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_metadata | null)[];
    /**
     * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
     */
    pricing: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_pricing | null;
    /**
     * List of attributes assigned to this variant.
     */
    attributes: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_attributes[];
    product: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant_product;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_lines {
    __typename: "CheckoutLine";
    /**
     * The ID of the object.
     */
    id: string;
    quantity: number;
    /**
     * The sum of the checkout line price, taxes and discounts.
     */
    totalPrice: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_totalPrice | null;
    variant: RemoveCheckoutLine_checkoutLineDelete_checkout_lines_variant;
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_discount {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_availablePaymentGateways_config {
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
export interface RemoveCheckoutLine_checkoutLineDelete_checkout_availablePaymentGateways {
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
    config: RemoveCheckoutLine_checkoutLineDelete_checkout_availablePaymentGateways_config[];
    /**
     * Payment gateway supported currencies.
     */
    currencies: (string | null)[];
}
export interface RemoveCheckoutLine_checkoutLineDelete_checkout {
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
    totalPrice: RemoveCheckoutLine_checkoutLineDelete_checkout_totalPrice | null;
    /**
     * The price of the checkout before shipping, with taxes included.
     */
    subtotalPrice: RemoveCheckoutLine_checkoutLineDelete_checkout_subtotalPrice | null;
    billingAddress: RemoveCheckoutLine_checkoutLineDelete_checkout_billingAddress | null;
    shippingAddress: RemoveCheckoutLine_checkoutLineDelete_checkout_shippingAddress | null;
    /**
     * Email of a customer.
     */
    email: string;
    note: string;
    /**
     * Shipping methods that can be used with this order.
     */
    availableShippingMethods: (RemoveCheckoutLine_checkoutLineDelete_checkout_availableShippingMethods | null)[];
    shippingMethod: RemoveCheckoutLine_checkoutLineDelete_checkout_shippingMethod | null;
    /**
     * The price of the shipping, with all the taxes included.
     */
    shippingPrice: RemoveCheckoutLine_checkoutLineDelete_checkout_shippingPrice | null;
    /**
     * A list of checkout lines, each containing information about an item in the checkout.
     */
    lines: (RemoveCheckoutLine_checkoutLineDelete_checkout_lines | null)[] | null;
    /**
     * Returns True, if checkout requires shipping.
     */
    isShippingRequired: boolean;
    discount: RemoveCheckoutLine_checkoutLineDelete_checkout_discount | null;
    discountName: string | null;
    translatedDiscountName: string | null;
    voucherCode: string | null;
    /**
     * List of available payment gateways.
     */
    availablePaymentGateways: RemoveCheckoutLine_checkoutLineDelete_checkout_availablePaymentGateways[];
}
export interface RemoveCheckoutLine_checkoutLineDelete_errors {
    __typename: "CheckoutError";
    /**
     * The error code.
     */
    code: CheckoutErrorCode;
    /**
     * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
     */
    field: string | null;
    /**
     * The error message.
     */
    message: string | null;
}
export interface RemoveCheckoutLine_checkoutLineDelete {
    __typename: "CheckoutLineDelete";
    /**
     * An updated checkout.
     */
    checkout: RemoveCheckoutLine_checkoutLineDelete_checkout | null;
    errors: RemoveCheckoutLine_checkoutLineDelete_errors[];
}
export interface RemoveCheckoutLine {
    /**
     * (Custom implementation) Deletes a CheckoutLine.
     */
    checkoutLineDelete: RemoveCheckoutLine_checkoutLineDelete | null;
}
export interface RemoveCheckoutLineVariables {
    checkoutId: string;
    lineId?: string | null;
}