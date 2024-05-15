import { MapFn, QueryShape, WatchMapFn } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// errors are nested in data as it currently stands in the API
// this helper extracts all errors present
export const getErrorsFromData = <T extends { [key: string]: any }>(
  data: T
) => {
  try {
    const error = Object.keys(data).reduce((acc, key) => {
      return {
        ...acc,
        ...(data[key].errors &&
          !!data[key].errors.length && { userInputErrors: data[key].errors }),
      };
    }, {});

    return Object.keys(error).length ? error : null;
  } catch (e) {
    return null;
  }
};

export const isDataEmpty = <T extends { [key: string]: any }>(data: T) =>
  Object.keys(data).reduce((_, key) => !!data[key], true);

export function getMappedData<T extends QueryShape, TResult>(
  mapFn: MapFn<T, TResult> | WatchMapFn<T, TResult>,
  data: any
) {
  if (!data) {
    return null;
  }

  const mappedData = mapFn(data);
  const result =
    mappedData && !!Object.keys(mappedData).length ? mappedData : null;

  return result;
}

export const mergeEdges = (prevEdges: any[], newEdges: any[]) => [
  ...prevEdges,
  ...newEdges.filter(edge => !prevEdges.some(e => e.node.id === edge.node.id)),
];

export function filterNotEmptyArrayItems<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export function findValueInEnum<TEnum extends object>(
  needle: string,
  haystack: TEnum
): TEnum[keyof TEnum] {
  const match = Object.entries(haystack).find(([, value]) => value === needle);

  if (!match) {
    throw new Error(`Value ${needle} not found in enum`);
  }

  return (needle as unknown) as TEnum[keyof TEnum];
}

export const parseJson = (value: any) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export function getMetadataValue<T>(
  metadata: any,
  key: string,
  alternateValue?: string | number
): any {
  if (metadata) {
    const metaValue = metadata?.filter(
      (meta: { key: string }) => meta?.key === key
    )[0]?.value;
    if (!metaValue && alternateValue !== undefined && alternateValue !== null)
      return alternateValue.toString();
    return metaValue;
  }
  return null;
}

// FarziTracker Utility functions

interface addToCartTrackProps {
  product_name: string;
  product_id: string;
  quantity: string | number;
  product_price: string | number;
  currency: string;
  variant: string;
  tags?: string;
}

export const addToCartTrack = async (
  shopMetaData: any,
  {
    product_name,
    product_id,
    quantity,
    product_price,
    currency,
    variant,
    tags,
  }: addToCartTrackProps
) => {
  const FC_TRACKING =
    shopMetaData &&
    getMetadataValue(shopMetaData, "fc_session_tracking") &&
    parseJson(getMetadataValue(shopMetaData, "fc_session_tracking"));

  const userId = await AsyncStorage.getItem("user_id");

  fetch(
    `${
      FC_TRACKING?.api_uri || "https://tr.farziengineer.co/collect"
    }/?evt_type=AddToCart`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ui: userId || "",
        ci: FC_TRACKING?.client_id,
        product_name,
        product_id,
        quantity,
        product_price,
        currency,
        variant,
        tags,
      }),
    }
  )
    .then(response => {
      return response.json();
    })
    .then(res => {
      if (res?.data?.ui) {
        AsyncStorage.setItem("user_id", res?.data?.ui);
      }
    })
    .catch(err => {
      console.log("tr.farziengineer.co/collect error:", err);
    });
};

interface CheckoutItem {
  item_id: string | number;
  item_name: string;
  variant: string;
  currency: string;
  price: string | number;
  quantity: string | number;
}

interface BeginCheckoutProps {
  cart_amount: number;
  currency: string;
  items: CheckoutItem[];
  tags?: string;
}

export const beginCheckout = async (
  shopMetaData: any,
  { cart_amount, currency, items, tags }: BeginCheckoutProps
) => {
  const FC_TRACKING =
    shopMetaData &&
    getMetadataValue(shopMetaData, "fc_session_tracking") &&
    parseJson(getMetadataValue(shopMetaData, "fc_session_tracking"));

  const userId = await AsyncStorage.getItem("user_id");

  fetch(
    `${
      FC_TRACKING?.api_uri || "https://tr.farziengineer.co/collect"
    }/?evt_type=BeginCheckout`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ui: userId || "",
        ci: FC_TRACKING?.client_id,
        cart_amount,
        currency,
        items,
        tags,
      }),
    }
  )
    .then(response => {
      return response.json();
    })
    .then(res => {
      if (res?.data?.ui) {
        AsyncStorage.setItem("user_id", res?.data?.ui);
      }
    })
    .catch(err => {
      console.log("tr.farziengineer.co/collect error:", err);
    });
};

interface CheckoutItem {
  item_id: string | number;
  item_name: string;
  variant: string;
  currency: string;
  price: string | number;
  quantity: string | number;
}

interface purchaseTrackProps {
  transaction_id: string | number;
  order_amount: string | number;
  tax: string | number;
  shipping_charge: string | number;
  currency: string;
  items: CheckoutItem[];
  tags?: string;
}

export const purchaseTrack = async (
  shopMetaData: any,
  {
    transaction_id,
    order_amount,
    tax,
    shipping_charge,
    currency,
    items,
    tags,
  }: purchaseTrackProps
) => {
  const FC_TRACKING =
    shopMetaData &&
    getMetadataValue(shopMetaData, "fc_session_tracking") &&
    parseJson(getMetadataValue(shopMetaData, "fc_session_tracking"));

  const userId = await AsyncStorage.getItem("user_id");

  fetch(
    `${
      FC_TRACKING?.api_uri || "https://tr.farziengineer.co/collect"
    }/?evt_type=Purchase`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ui: userId || "",
        ci: FC_TRACKING?.client_id,
        transaction_id,
        order_amount,
        tax,
        shipping_charge,
        currency,
        items,
        tags,
      }),
    }
  )
    .then(response => {
      return response.json();
    })
    .then(res => {
      if (res?.data?.ui) {
        AsyncStorage.setItem("user_id", res?.data?.ui);
      }
    })
    .catch(err => {
      console.log("tr.farziengineer.co/collect error:", err);
    });
};
