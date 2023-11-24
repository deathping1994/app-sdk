export declare const useCollectionList: (variables: import("../../queries/gqlTypes/CollectionList").CollectionListVariables) => {
    current: Promise<import("@apollo/client").ApolloQueryResult<import("../../queries/gqlTypes/CollectionList").CollectionList>>;
    data: import("../../fragments/gqlTypes/BaseCollection").BaseCollection[];
    loading: boolean;
    next: () => Promise<void>;
    pageInfo: import("../../fragments/gqlTypes/PageInfo").PageInfo;
};
export declare const useCollectionDetails: (variables: import("../../queries/gqlTypes/CollectionDetails").CollectionDetailsVariables) => {
    current: Promise<import("@apollo/client").ApolloQueryResult<import("../../queries/gqlTypes/CollectionDetails").CollectionDetails>>;
    data: import("../../fragments/gqlTypes/CollectionDetails").CollectionDetails;
    loading: boolean;
};
