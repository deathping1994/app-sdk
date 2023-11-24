import { ApolloClient } from "@apollo/client";
import { SaleorAPI } from "./api";
import { ConfigInput, ApolloConfigInput } from "./types";
interface ConnectResult {
    /**
     * Saleor API.
     */
    api: SaleorAPI;
    /**
     * Apollo client used by Saleor API.
     */
    apolloClient: ApolloClient<any>;
}
export declare class SaleorManager {
    private readonly config;
    private readonly apolloConfig;
    private apiProxy?;
    private api?;
    private apolloClient?;
    private tokenRefreshing;
    private apiChangeListener?;
    private appversion?;
    private appplatform?;
    constructor(config: ConfigInput, apolloConfig?: ApolloConfigInput, appversion?: string, appplatform?: string);
    /**
     * Use this method to obtain current API and optionally listen to its update on occurred changes within it.
     * @param apiChangeListener Function called to get an API and called on every API update.
     */
    connect(apiChangeListener?: (api?: SaleorAPI) => any): Promise<ConnectResult>;
    private static createApi;
    private tokenExpirationCallback;
    private onSaleorApiChange;
}
export * from "./auth";
export * from "./cache";
export * from "./links";
export * from "./client";
export * from "./gqlTypes/globalTypes";
export * from "./react";