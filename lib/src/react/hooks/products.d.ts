export declare const useProductList: (variables: import("../../queries/gqlTypes/ProductList").ProductListVariables) => {
    current: Promise<import("@apollo/client").ApolloQueryResult<import("../../queries/gqlTypes/ProductList").ProductList>>;
    data: import("../../queries/gqlTypes/ProductList").ProductList_products_edges_node[];
    loading: boolean;
    next: () => Promise<void>;
    pageInfo: import("../../fragments/gqlTypes/PageInfo").PageInfo;
};
export declare const useProductDetails: (variables: import("../../queries/gqlTypes/ProductDetails").ProductDetailsVariables) => {
    current: Promise<import("@apollo/client").ApolloQueryResult<import("../../queries/gqlTypes/ProductDetails").ProductDetails>>;
    data: import("../../fragments/gqlTypes/ProductDetails").ProductDetails;
    loading: boolean;
};
