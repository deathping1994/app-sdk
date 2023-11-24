import { ApolloLink } from "@apollo/client";
interface SaleorLinksConfig {
    /**
     * Url of the Saleor GraphQL API.
     */
    apiUrl: string;
    /**
     * Callback called when token expiration error occured in Saleor API response.
     */
    tokenExpirationCallback: () => void;
    appversion?: string;
    appplatform?: string;
}
/**
 * Creates list of links for Apollo client.
 * @param linksConfig Configuration for created links.
 */
export declare const createSaleorLinks: ({ apiUrl, tokenExpirationCallback, appplatform, appversion }: SaleorLinksConfig) => ApolloLink[];
export {};
