import axios from "axios";
import { MapFn, QueryShape, WatchMapFn } from "./types";
import { REST_API_METHODS_TYPES } from "./consts";
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

  return needle as unknown as TEnum[keyof TEnum];
}

export const parseJson = (value: any) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export async function axiosRequest(
  url: string,
  method: string | undefined = REST_API_METHODS_TYPES.GET,
  data: {} | undefined = {},
  options: any = {}
) {
  let userSpecificHeaders = {};
  const tokenData = await AsyncStorage.getItem("token");
  const userToken =
    tokenData && parseJson(tokenData) ? parseJson(tokenData)?.item : "";
  if (tokenData && userToken) {
    userSpecificHeaders = {
      ...userSpecificHeaders,
      Authorization: `JWT ${userToken}`,
    };
  }

  let customRequestHeaders = {};

  if (options?.headers) {
    customRequestHeaders = {
      ...customRequestHeaders,
      ...options.headers,
    };
  }

  if (url && method) {
    try {
      const response = await axios({
        url,
        method,
        data,
        headers: { ...userSpecificHeaders, ...customRequestHeaders },
        ...options,
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
