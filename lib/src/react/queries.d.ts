export declare const useShopDetails: (options?: Pick<Pick<Pick<import("@apollo/client").QueryOptions<{}, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch"> | import("@apollo/client").WatchQueryOptions<Pick<import("@apollo/client").QueryOptions<{}, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, any>, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch"> & {
    skip?: boolean;
    onComplete?: () => void;
    onError?: (error: import("@apollo/client").ApolloError) => void;
    onUpdate: (data: import("../queries/gqlTypes/GetShop").GetShop, loading?: boolean) => void;
}, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch" | "skip"> & {
    skip?: boolean;
}) => {
    loadMore: (loadMoreVariables: import("../tsHelpers").RequireAtLeastOne<any, string | number | symbol>, mergeResults?: boolean) => void;
    refetch: (refetchVariables?: any) => void;
    setOptions: (newOptions: any) => Promise<{
        data: unknown;
    }>;
    data: import("../queries/gqlTypes/GetShop").GetShop;
    loading: boolean;
    error: import("./types").ApolloErrorWithUserInput;
};
export declare const useOrderDetails: (variables: import("../queries/gqlTypes/UserOrderByToken").UserOrderByTokenVariables | import("../queries/gqlTypes/OrderByToken").OrderByTokenVariables, options?: Pick<Pick<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/OrderByToken").OrderByTokenVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables"> | import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/UserOrderByToken").UserOrderByTokenVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables">, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch"> & {
    onUpdate: (data: import("../queries/gqlTypes/UserOrderByToken").UserOrderByToken_orderByToken | import("../queries/gqlTypes/OrderByToken").OrderByToken_orderByToken) => void;
}, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch"> & {
    skip?: boolean;
}) => {
    loadMore: (loadMoreVariables: import("../tsHelpers").RequireAtLeastOne<import("../queries/gqlTypes/UserOrderByToken").UserOrderByTokenVariables | import("../queries/gqlTypes/OrderByToken").OrderByTokenVariables, "token">, mergeResults?: boolean) => void;
    refetch: (refetchVariables?: import("../queries/gqlTypes/UserOrderByToken").UserOrderByTokenVariables | import("../queries/gqlTypes/OrderByToken").OrderByTokenVariables) => void;
    setOptions: (newOptions: any) => Promise<{
        data: unknown;
    }>;
    data: import("../queries/gqlTypes/UserOrderByToken").UserOrderByToken_orderByToken | import("../queries/gqlTypes/OrderByToken").OrderByToken_orderByToken;
    loading: boolean;
    error: import("./types").ApolloErrorWithUserInput;
};
export declare const useOrdersByUser: (variables: import("../queries/gqlTypes/OrdersByUser").OrdersByUserVariables, options?: Pick<Pick<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/OrdersByUser").OrdersByUserVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables"> | import("@apollo/client").WatchQueryOptions<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/OrdersByUser").OrdersByUserVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables">, any>, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch"> & {
    skip?: boolean;
    onComplete?: () => void;
    onError?: (error: import("@apollo/client").ApolloError) => void;
    onUpdate: (data: import("../queries/gqlTypes/OrdersByUser").OrdersByUser_me_orders, loading?: boolean) => void;
}, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch" | "skip"> & {
    skip?: boolean;
}) => {
    loadMore: (loadMoreVariables: import("../tsHelpers").RequireAtLeastOne<import("../queries/gqlTypes/OrdersByUser").OrdersByUserVariables, "perPage" | "after">, mergeResults?: boolean) => void;
    refetch: (refetchVariables?: import("../queries/gqlTypes/OrdersByUser").OrdersByUserVariables) => void;
    setOptions: (newOptions: any) => Promise<{
        data: unknown;
    }>;
    data: import("../queries/gqlTypes/OrdersByUser").OrdersByUser_me_orders;
    loading: boolean;
    error: import("./types").ApolloErrorWithUserInput;
};
export declare const useAtrributes: (variables: import("../queries/gqlTypes/Attributes").AttributesVariables, options?: Pick<Pick<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/Attributes").AttributesVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables"> | import("@apollo/client").WatchQueryOptions<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/Attributes").AttributesVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables">, any>, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch"> & {
    skip?: boolean;
    onComplete?: () => void;
    onError?: (error: import("@apollo/client").ApolloError) => void;
    onUpdate: (data: import("../queries/gqlTypes/Attributes").Attributes_attributes, loading?: boolean) => void;
}, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch" | "skip"> & {
    skip?: boolean;
}) => {
    loadMore: (loadMoreVariables: import("../tsHelpers").RequireAtLeastOne<import("../queries/gqlTypes/Attributes").AttributesVariables, "id">, mergeResults?: boolean) => void;
    refetch: (refetchVariables?: import("../queries/gqlTypes/Attributes").AttributesVariables) => void;
    setOptions: (newOptions: any) => Promise<{
        data: unknown;
    }>;
    data: import("../queries/gqlTypes/Attributes").Attributes_attributes;
    loading: boolean;
    error: import("./types").ApolloErrorWithUserInput;
};
export declare const useVariantsProducts: (variables: import("../queries/gqlTypes/VariantsProducts").VariantsProductsVariables, options?: Pick<Pick<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/VariantsProducts").VariantsProductsVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables"> | import("@apollo/client").WatchQueryOptions<import("../tsHelpers").RequireOnlyOne<Pick<import("@apollo/client").QueryOptions<import("../queries/gqlTypes/VariantsProducts").VariantsProductsVariables, any>, "context" | "fetchPolicy" | "errorPolicy" | "variables" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch">, "variables">, any>, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch"> & {
    skip?: boolean;
    onComplete?: () => void;
    onError?: (error: import("@apollo/client").ApolloError) => void;
    onUpdate: (data: import("../queries/gqlTypes/VariantsProducts").VariantsProducts_productVariants, loading?: boolean) => void;
}, "context" | "fetchPolicy" | "errorPolicy" | "pollInterval" | "notifyOnNetworkStatusChange" | "returnPartialData" | "partialRefetch" | "skip"> & {
    skip?: boolean;
}) => {
    loadMore: (loadMoreVariables: import("../tsHelpers").RequireAtLeastOne<import("../queries/gqlTypes/VariantsProducts").VariantsProductsVariables, "ids">, mergeResults?: boolean) => void;
    refetch: (refetchVariables?: import("../queries/gqlTypes/VariantsProducts").VariantsProductsVariables) => void;
    setOptions: (newOptions: any) => Promise<{
        data: unknown;
    }>;
    data: import("../queries/gqlTypes/VariantsProducts").VariantsProducts_productVariants;
    loading: boolean;
    error: import("./types").ApolloErrorWithUserInput;
};
