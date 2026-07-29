// TODO: implement SecureStorage to store tokens
import { GraphQLError } from "graphql";

import { ApolloLink, FetchResult } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ErrorResponse, onError } from "@apollo/client/link/error";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LocalStorageItems } from "./helpers";
import { findValueInEnum } from "./utils";
import { Observable } from '@apollo/client';

export enum JWTError {
  invalid = "InvalidTokenError",
  invalidSignature = "InvalidSignatureError",
  expired = "ExpiredSignatureError",
}

interface ResponseError extends ErrorResponse {
  networkError?: Error & {
    statusCode?: number;
    bodyText?: string;
  };
}

export function isJwtError(error: GraphQLError): boolean {
  let jwtError: boolean;

  try {
    jwtError = !!findValueInEnum(error.extensions?.exception.code, JWTError);
  } catch {
    jwtError = false;
  }

  return jwtError;
}

export async function getAuthToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(LocalStorageItems.TOKEN);
  } catch (error) {
    return null;
  }
}

export async function setAuthToken(token: string): Promise<boolean | void> {
  try {
    return await AsyncStorage.setItem(LocalStorageItems.TOKEN, token);
  } catch (error) {
    return false;
  }
}

// possibly remove callback here and use event emitter
export function invalidTokenLinkWithTokenHandler(
  tokenExpirationCallback: () => Promise<boolean>
): ApolloLink {
  return onError(({ graphQLErrors, networkError, operation, forward }: ResponseError) => {
    const isTokenExpired =
      graphQLErrors?.some(isJwtError) ||
      (networkError as any)?.statusCode === 401;

    if (!isTokenExpired) return;

    return new Observable<FetchResult>(observer => {
      tokenExpirationCallback()
        .then(refreshed => {
          if (!refreshed) {
            observer.error(graphQLErrors?.[0] ?? networkError);
            return;
          }
          operation.setContext({
            ...operation.getContext(),
            headers: {
              ...operation.getContext().headers,
              authorization: undefined,
            },
          });
          forward(operation).subscribe(observer);
        })
        .catch(err => observer.error(err));
    });
  });
}

export const authLink = setContext(async (_, context) => {
  // get the authentication token from Asyncstorage if it exists
  const authToken = await getAuthToken();
  if (authToken) {
    return {
      ...context,
      // return the headers to the context so httpLink can read them
      headers: {
        ...context.headers,
        authorization: authToken ? `JWT ${JSON.parse(authToken!).item}` : null,
      },
    };
  }

  return context;
});
