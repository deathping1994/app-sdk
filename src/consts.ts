// It's react-native environment
export const WINDOW_EXISTS = typeof document !== "undefined";

export const LOCAL_STORAGE_EXISTS = WINDOW_EXISTS && !!window.localStorage;
export const CREDENTIAL_API_EXISTS =
  WINDOW_EXISTS && !!window.PasswordCredential;

export const BASE_URL_REST = "https://plixlifefcstagehapi.farziengineer.co/rest/";

export enum REST_API_METHODS_TYPES {
  GET = "GET",
  POST = "POST",
}

export const REST_API_ENDPOINTS = {
  ADD_TO_CART: "add_to_cart/",
  UPDATE_CART: "update_cart/",
  CREATE_CHECKOUT: "create_checkout/",
};

export const dummyCheckoutFields = {
  availablePaymentGateways: [
    {
      currencies: ["INR"],
      id: "mirumee.payments.razorpay",
      name: "Razorpay",
      __typename: "PaymentGateway",
      config: [],
    },
  ],
  billingAddress: null,
  cashback: {
    amount: "0.00",
    willAddOn: null,
    __typename: "CashbackType",
  },
  discount: {
    currency: "INR",
    amount: 0,
    __typename: "Money",
  },
  email: "dummy@dummy.com",
  paymentMethod: {
    cashbackDiscountAmount: 0,
    couponDiscount: "0",
    prepaidDiscountAmount: 0,
    __typename: "PaymentMethodType",
  },
  shippingAddress: null,
  shippingMethod: null,
  shippingPrice: {
    gross: {
      amount: 0,
      currency: "INR",
      __typename: "Money",
    },
    net: {
      amount: 0,
      currency: "INR",
      __typename: "Money",
    },
    __typename: "TaxedMoney",
  },
  subtotalPrice: {
    gross: {
      amount: 0,
      currency: "INR",
      __typename: "Money",
    },
    net: {
      amount: 0,
      currency: "INR",
      __typename: "Money",
    },
    __typename: "TaxedMoney",
  },
  totalPrice: {
    gross: {
      amount: 0,
      currency: "INR",
      __typename: "Money",
    },
    net: {
      amount: 0,
      currency: "INR",
      __typename: "Money",
    },
    __typename: "TaxedMoney",
  },
  translatedDiscountName: null,
  voucherCode: null,
};

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const Base64 = {
  atob: (input: string = "") => {
    let str = input.replace(/=+$/, "");
    let output = "";

    if (str.length % 4 == 1) {
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  },
  btoa: (input: string = "") => {
    let str = input;
    let output = "";

    for (
      let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || ((map = "="), i % 1);
      output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
      charCode = str.charCodeAt((i += 3 / 4));

      if (charCode > 0xff) {
        throw new Error(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
        );
      }

      block = (block << 8) | charCode;
    }

    return output;
  },
};

export const getDBIdFromGraphqlId = (
  graphqlId: string,
  schema?: string
): number | void => {
  // This is temporary solution, we will use slugs in the future
  try {
    if (typeof window !== "undefined") {
      const rawId = Base64.atob(graphqlId);
      const regexp = /(\w+):(\d+)/;
      const arr = regexp.exec(rawId);

      if (schema && schema !== arr![1]) {
        throw new Error("Schema is not correct");
      }
      return parseInt(arr![2], 10);
    }
  } catch (error) {
    console.log(error);
  }
};
export const CUSTOM_PRODUCT_METADATA_FIELDS = [
  "product_card_attributes",
  "average_rating",
];

export default Base64;
