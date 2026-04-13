import axios from "axios";
import { MapFn, QueryShape, WatchMapFn } from "./types";
import { REST_API_METHODS_TYPES } from "./consts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";
import queryString from "query-string";
import { Platform } from "react-native";

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

  return needle as unknown as TEnum[keyof TEnum];
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


export async function axiosRequest(
  url: string,
  method: string | undefined = REST_API_METHODS_TYPES.GET,
  data: {} | undefined = {},
  options: any = {}
) {
  let userSpecificHeaders = {};
  const tokenData = await AsyncStorage.getItem("token");
  const ipAddress = await AsyncStorage.getItem("ip");
  const userAgent = `${DeviceInfo.getBrand()}/${DeviceInfo.getModel()} (${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}) AppVersion/${DeviceInfo.getVersion()}`;
  const userToken =
    tokenData && parseJson(tokenData) ? parseJson(tokenData)?.item : "";
  if (tokenData && userToken) {
    userSpecificHeaders = {
      ...userSpecificHeaders,
      Authorization: `JWT ${userToken}`,
    };
  }  

  const finalHeaders = {
    appplatform: Platform.OS,
    "x-client-ip-address": ipAddress || "",
    "x-client-user-agent": userAgent,
    ...userSpecificHeaders,
    ...(options?.headers || {}),
  };

  if (url && method) {
    try {
      const { headers: _, ...restOptions } = options;
      const response = await axios({
        url,
        method,
        data,
        headers: finalHeaders,
        ...restOptions,
      });
     
      return response;
    } catch (error) {
      console.log("Error occurred in axiosRequest", error);
      return {
        axiosError: error,
      };
    }
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

let previousURL: String | null = "";
let pageViewQueue: {
  shopMetaData: any;
  routerAsPath: String | null;
  tags: string;
  pageUrl: string;
}[] = [];

export const pageViewTrack = async (
  shopMetaData: any,
  routerAsPath: String | null,
  tags: string,
  pageUrl: string
) => {
  pageViewQueue.push({
    shopMetaData,
    routerAsPath,
    tags,
    pageUrl,
  });

  const processPageViewQueue = async (
    shopMetaData: any,
    routerAsPath: String | null,
    tags: string,
    pageUrl: string | null
  ) => {
    
    let visitorId, ip, utm;
    const userAgent = `${DeviceInfo.getBrand()}/${DeviceInfo.getModel()} (${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}) AppVersion/${DeviceInfo.getVersion()}`;
    
    if ( await AsyncStorage.getItem("fctrack_visitor_id")) {
      visitorId = await AsyncStorage.getItem("fctrack_visitor_id");
    } else {
      const fp = await DeviceInfo.getUniqueId(); 
      const visitorProps = fp;
      visitorId = visitorProps; 
      await AsyncStorage.setItem("fctrack_visitor_id", visitorId);
      // Cookies.set("fctrack_visitor_id", visitorId);
    }

    ip = await AsyncStorage.getItem("ip");
    if (!ip) {
      try {
        const res = await fetch("https://tr.farziengineer.co/ip");
        const data = await res.json();
        ip = data?.ip;
        await AsyncStorage.setItem("ip", ip);
      } catch (err) {
        console.log("IP Fetch Error:", err);
      }
    }


    try {
      if (await AsyncStorage.getItem("fctrack")) {
        utm =  await AsyncStorage.getItem("fctrack");
      } else if (pageUrl) {
        const queryValue = queryString?.parseUrl(pageUrl);
        
        if (
          queryValue?.query?.utm_source ||
          queryValue?.query?.utm_medium ||
          queryValue?.query?.utm_campaign
        ) {
          utm = `us=${queryValue?.query?.utm_source}; um=${queryValue?.query?.utm_medium}; uc=${queryValue?.query?.utm_campaign}`;
        } else {
          utm = "";
        }
      } else {
        utm = "";
      }
    } catch (error) {
        console.log('error in pageview', error);
    }

    const FC_TRACKING =
      shopMetaData &&
      getMetadataValue(shopMetaData, "fc_session_tracking") &&
      parseJson(getMetadataValue(shopMetaData, "fc_session_tracking"));

    try {
      var clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (err) {
      var clientTimeZone = "Asia/Calcutta";
      console.log("TimeZone error", err);
    }

    fetch(FC_TRACKING?.api_uri || "https://t.farziengineer.co/collect", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pu: previousURL,
        cu: routerAsPath,
        bi: visitorId,
        ui: await AsyncStorage.getItem("user_id"),
        ci: FC_TRACKING?.client_id,
        ua: userAgent, // user agent see chat gpt
        uip: ip,
        utm: utm,
        tz: clientTimeZone,
        tags: tags,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res?.data?.ui) {
          AsyncStorage.setItem("user_id", res?.data?.ui);
        }
      })
      .catch((err) => {
        console.log("t.farziengineer.co/collect error:", err);
      })
      .finally(() => {
        previousURL = routerAsPath;
        const nextItem = pageViewQueue.shift();
        if (nextItem && pageViewQueue?.length > 0) {
          processPageViewQueue(
            nextItem.shopMetaData,
            nextItem.routerAsPath,
            nextItem.tags,
            nextItem.pageUrl
          );
        }
      });
  };

  if (pageViewQueue.length === 1) {
    processPageViewQueue(shopMetaData, routerAsPath, tags, pageUrl);
  }
};