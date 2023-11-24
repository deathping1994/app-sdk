import { ApolloClient, ApolloError, WatchQueryOptions } from "@apollo/client";
import { UserOrderByToken } from "../queries/gqlTypes/UserOrderByToken";
import { OrderByToken } from "../queries/gqlTypes/OrderByToken";
import { MUTATIONS } from "../mutations";
import { QUERIES } from "../queries";
import { RequireAtLeastOne } from "../tsHelpers";
import { InferOptions, MapFn, QueryShape, WatchMapFn } from "../types";
import { SetPasswordChange, SetPasswordResult } from "./types";
declare class APIProxy {
    client: ApolloClient<any>;
    constructor(client: ApolloClient<any>);
    getAttributes: <TVariables extends import("../queries/gqlTypes/Attributes").AttributesVariables, TOptions extends Pick<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/Attributes").AttributesVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables"> | WatchQueryOptions<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/Attributes").AttributesVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables">, any>, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">>(variables: TVariables, options: TOptions & {
        skip?: boolean;
        onComplete?: () => void;
        onError?: (error: ApolloError) => void;
        onUpdate: (data: import("../queries/gqlTypes/Attributes").Attributes_attributes, loading?: boolean) => void;
    }) => {
        refetch: () => Promise<unknown>;
        unsubscribe: any;
        loadMore?: undefined;
        setOptions?: undefined;
    } | {
        loadMore: (extraVariables: RequireAtLeastOne<TVariables, keyof TVariables>, mergeResults?: boolean) => void;
        refetch: (newVariables?: TVariables) => Promise<{
            data: import("../queries/gqlTypes/Attributes").Attributes_attributes;
        }>;
        setOptions: (newOptions: TOptions) => Promise<{
            data: import("../queries/gqlTypes/Attributes").Attributes_attributes;
        }>;
        unsubscribe: any;
    };
    getOrdersByUser: <TVariables extends import("../queries/gqlTypes/OrdersByUser").OrdersByUserVariables, TOptions extends Pick<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/OrdersByUser").OrdersByUserVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables"> | WatchQueryOptions<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/OrdersByUser").OrdersByUserVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables">, any>, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">>(variables: TVariables, options: TOptions & {
        skip?: boolean;
        onComplete?: () => void;
        onError?: (error: ApolloError) => void;
        onUpdate: (data: import("../queries/gqlTypes/OrdersByUser").OrdersByUser_me_orders, loading?: boolean) => void;
    }) => {
        refetch: () => Promise<unknown>;
        unsubscribe: any;
        loadMore?: undefined;
        setOptions?: undefined;
    } | {
        loadMore: (extraVariables: RequireAtLeastOne<TVariables, keyof TVariables>, mergeResults?: boolean) => void;
        refetch: (newVariables?: TVariables) => Promise<{
            data: import("../queries/gqlTypes/OrdersByUser").OrdersByUser_me_orders;
        }>;
        setOptions: (newOptions: TOptions) => Promise<{
            data: import("../queries/gqlTypes/OrdersByUser").OrdersByUser_me_orders;
        }>;
        unsubscribe: any;
    };
    getOrderDetails: (variables: InferOptions<QUERIES["OrderDetails"] | QUERIES["OrderDetailsByUser"]>["variables"], options: Pick<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/OrderByToken").OrderByTokenVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables"> | import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/UserOrderByToken").UserOrderByTokenVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables">, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch"> & {
        onUpdate: (data: OrderByToken["orderByToken"] | UserOrderByToken["orderByToken"] | null) => void;
    }) => {
        refetch: () => Promise<unknown>;
        unsubscribe: any;
        loadMore?: undefined;
        setOptions?: undefined;
    } | {
        loadMore: (extraVariables: RequireAtLeastOne<import("../queries/gqlTypes/UserOrderByToken").UserOrderByTokenVariables | import("../queries/gqlTypes/OrderByToken").OrderByTokenVariables, "token">, mergeResults?: boolean) => void;
        refetch: (newVariables?: import("../queries/gqlTypes/UserOrderByToken").UserOrderByTokenVariables | import("../queries/gqlTypes/OrderByToken").OrderByTokenVariables) => Promise<{
            data: import("../queries/gqlTypes/OrderByToken").OrderByToken_orderByToken;
        }>;
        setOptions: (newOptions: Pick<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/OrderByToken").OrderByTokenVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables"> | import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/UserOrderByToken").UserOrderByTokenVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables">, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch"> & {
            onUpdate: (data: OrderByToken["orderByToken"] | UserOrderByToken["orderByToken"] | null) => void;
        }) => Promise<{
            data: import("../queries/gqlTypes/OrderByToken").OrderByToken_orderByToken;
        }>;
        unsubscribe: any;
    };
    getVariantsProducts: <TVariables extends import("../queries/gqlTypes/VariantsProducts").VariantsProductsVariables, TOptions extends Pick<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/VariantsProducts").VariantsProductsVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables"> | WatchQueryOptions<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/VariantsProducts").VariantsProductsVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables">, any>, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">>(variables: TVariables, options: TOptions & {
        skip?: boolean;
        onComplete?: () => void;
        onError?: (error: ApolloError) => void;
        onUpdate: (data: import("../queries/gqlTypes/VariantsProducts").VariantsProducts_productVariants, loading?: boolean) => void;
    }) => {
        refetch: () => Promise<unknown>;
        unsubscribe: any;
        loadMore?: undefined;
        setOptions?: undefined;
    } | {
        loadMore: (extraVariables: RequireAtLeastOne<TVariables, keyof TVariables>, mergeResults?: boolean) => void;
        refetch: (newVariables?: TVariables) => Promise<{
            data: import("../queries/gqlTypes/VariantsProducts").VariantsProducts_productVariants;
        }>;
        setOptions: (newOptions: TOptions) => Promise<{
            data: import("../queries/gqlTypes/VariantsProducts").VariantsProducts_productVariants;
        }>;
        unsubscribe: any;
    };
    getShopDetails: <TVariables extends {}, TOptions extends Pick<Pick<import("@apollo/client").QueryOptions<{}, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch"> | WatchQueryOptions<Pick<import("@apollo/client").QueryOptions<{}, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, any>, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">>(variables: TVariables, options: TOptions & {
        skip?: boolean;
        onComplete?: () => void;
        onError?: (error: ApolloError) => void;
        onUpdate: (data: import("../queries/gqlTypes/GetShop").GetShop, loading?: boolean) => void;
    }) => {
        refetch: () => Promise<unknown>;
        unsubscribe: any;
        loadMore?: undefined;
        setOptions?: undefined;
    } | {
        loadMore: (extraVariables: RequireAtLeastOne<TVariables, keyof TVariables>, mergeResults?: boolean) => void;
        refetch: (newVariables?: TVariables) => Promise<{
            data: import("../queries/gqlTypes/GetShop").GetShop;
        }>;
        setOptions: (newOptions: TOptions) => Promise<{
            data: import("../queries/gqlTypes/GetShop").GetShop;
        }>;
        unsubscribe: any;
    };
    setUserDefaultAddress: (variables: import("../mutations/gqlTypes/SetCustomerDefaultAddress").SetCustomerDefaultAddressVariables, options?: Pick<Pick<import("@apollo/client").MutationOptions<import("../mutations/gqlTypes/SetCustomerDefaultAddress").SetCustomerDefaultAddress, import("../mutations/gqlTypes/SetCustomerDefaultAddress").SetCustomerDefaultAddressVariables>, "context" | "fetchPolicy" | "optimisticResponse" | "updateQueries" | "refetchQueries" | "awaitRefetchQueries" | "update" | "errorPolicy" | "variables">, "context" | "fetchPolicy" | "optimisticResponse" | "updateQueries" | "refetchQueries" | "awaitRefetchQueries" | "update" | "errorPolicy">) => Promise<{
        data: import("../mutations/gqlTypes/SetCustomerDefaultAddress").SetCustomerDefaultAddress_accountSetDefaultAddress;
    }>;
    setDeleteUserAddress: (variables: import("../mutations/gqlTypes/DeleteUserAddress").DeleteUserAddressVariables, options?: Pick<Pick<import("@apollo/client").MutationOptions<import("../mutations/gqlTypes/DeleteUserAddress").DeleteUserAddress, import("../mutations/gqlTypes/DeleteUserAddress").DeleteUserAddressVariables>, "context" | "fetchPolicy" | "optimisticResponse" | "updateQueries" | "refetchQueries" | "awaitRefetchQueries" | "update" | "errorPolicy" | "variables">, "context" | "fetchPolicy" | "optimisticResponse" | "updateQueries" | "refetchQueries" | "awaitRefetchQueries" | "update" | "errorPolicy">) => Promise<{
        data: import("../mutations/gqlTypes/DeleteUserAddress").DeleteUserAddress_accountAddressDelete;
    }>;
    setCreateUserAddress: (variables: import("../mutations/gqlTypes/CreateUserAddress").CreateUserAddressVariables, options?: Pick<Pick<import("@apollo/client").MutationOptions<import("../mutations/gqlTypes/CreateUserAddress").CreateUserAddress, import("../mutations/gqlTypes/CreateUserAddress").CreateUserAddressVariables>, "context" | "fetchPolicy" | "optimisticResponse" | "updateQueries" | "refetchQueries" | "awaitRefetchQueries" | "update" | "errorPolicy" | "variables">, "context" | "fetchPolicy" | "optimisticResponse" | "updateQueries" | "refetchQueries" | "awaitRefetchQueries" | "update" | "errorPolicy">) => Promise<{
        data: import("../mutations/gqlTypes/CreateUserAddress").CreateUserAddress_accountAddressCreate;
    }>;
    setUpdateuserAddress: (variables: import("../mutations/gqlTypes/UpdateUserAddress").UpdateUserAddressVariables, options?: Pick<Pick<import("@apollo/client").MutationOptions<import("../mutations/gqlTypes/UpdateUserAddress").UpdateUserAddress, import("../mutations/gqlTypes/UpdateUserAddress").UpdateUserAddressVariables>, "context" | "fetchPolicy" | "optimisticResponse" | "updateQueries" | "refetchQueries" | "awaitRefetchQueries" | "update" | "errorPolicy" | "variables">, "context" | "fetchPolicy" | "optimisticResponse" | "updateQueries" | "refetchQueries" | "awaitRefetchQueries" | "update" | "errorPolicy">) => Promise<{
        data: import("../mutations/gqlTypes/UpdateUserAddress").UpdateUserAddress_accountAddressUpdate;
    }>;
    setAccountUpdate: (variables: import("../mutations/gqlTypes/AccountUpdate").AccountUpdateVariables, options?: Pick<Pick<import("@apollo/client").MutationOptions<import("../mutations/gqlTypes/AccountUpdate").AccountUpdate, import("../mutations/gqlTypes/AccountUpdate").AccountUpdateVariables>, "context" | "fetchPolicy" | "optimisticResponse" | "updateQueries" | "refetchQueries" | "awaitRefetchQueries" | "update" | "errorPolicy" | "variables">, "context" | "fetchPolicy" | "optimisticResponse" | "updateQueries" | "refetchQueries" | "awaitRefetchQueries" | "update" | "errorPolicy">) => Promise<{
        data: import("../mutations/gqlTypes/AccountUpdate").AccountUpdate_accountUpdate;
    }>;
    setPassword: (variables: InferOptions<MUTATIONS["SetPassword"]>["variables"], options?: Omit<InferOptions<MUTATIONS["SetPassword"]>, "variables">) => Promise<SetPasswordResult>;
    setPasswordChange: (variables: InferOptions<MUTATIONS["PasswordChange"]>["variables"], options?: Omit<InferOptions<MUTATIONS["PasswordChange"]>, "variables">) => Promise<SetPasswordChange>;
    attachAuthListener: (callback: (authenticated: boolean) => void) => () => void;
    isLoggedIn: () => boolean;
    watchQuery<T extends QueryShape, TResult>(query: T, mapFn: WatchMapFn<T, TResult>): <TVariables extends InferOptions<T>["variables"], TOptions extends Pick<InferOptions<T> | WatchQueryOptions<InferOptions<T>, any>, Exclude<keyof InferOptions<T> & "context", "variables"> | Exclude<keyof InferOptions<T> & "fetchPolicy", "variables"> | Exclude<keyof InferOptions<T> & "errorPolicy", "variables"> | Exclude<keyof InferOptions<T> & "variables", "variables"> | Exclude<keyof InferOptions<T> & "query", "variables"> | Exclude<keyof InferOptions<T> & "pollInterval", "variables"> | Exclude<keyof InferOptions<T> & "notifyOnNetworkStatusChange", "variables"> | Exclude<keyof InferOptions<T> & "returnPartialData", "variables"> | Exclude<keyof InferOptions<T> & "partialRefetch", "variables"> | Exclude<keyof InferOptions<T> & "nextFetchPolicy", "variables">>>(variables: TVariables, options: TOptions & {
        skip?: boolean;
        onComplete?: () => void;
        onError?: (error: ApolloError) => void;
        onUpdate: (data: ReturnType<typeof mapFn> | null, loading?: boolean) => void;
    }) => {
        refetch: () => Promise<unknown>;
        unsubscribe: any;
        loadMore?: undefined;
        setOptions?: undefined;
    } | {
        loadMore: (extraVariables: RequireAtLeastOne<TVariables, keyof TVariables>, mergeResults?: boolean) => void;
        refetch: (newVariables?: TVariables) => Promise<{
            data: TResult;
        }>;
        setOptions: (newOptions: TOptions) => Promise<{
            data: TResult;
        }>;
        unsubscribe: any;
    };
    fireQuery<T extends QueryShape, TResult>(query: T, mapFn: MapFn<T, TResult>): (variables: InferOptions<T>["variables"], options?: Omit<InferOptions<T>, "variables">) => Promise<{
        data: TResult;
    }>;
    static firePromise<T extends QueryShape, TResult>(promise: () => Promise<any>, mapFn: MapFn<T, TResult> | WatchMapFn<T, TResult>): Promise<{
        data: ReturnType<typeof mapFn> | null;
    }>;
}
export default APIProxy;
