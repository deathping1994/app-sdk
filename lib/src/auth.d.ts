import { GraphQLError } from "graphql";
import { ApolloLink } from "@apollo/client";
export declare enum JWTError {
    invalid = "InvalidTokenError",
    invalidSignature = "InvalidSignatureError",
    expired = "ExpiredSignatureError"
}
export declare function isJwtError(error: GraphQLError): boolean;
export declare function getAuthToken(): Promise<string | null>;
export declare function setAuthToken(token: string): Promise<boolean | void>;
export declare function invalidTokenLinkWithTokenHandler(tokenExpirationCallback: () => void): ApolloLink;
export declare const authLink: ApolloLink;
