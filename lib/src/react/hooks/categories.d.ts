export declare const useCategoryList: (variables: import("../../queries/gqlTypes/CategoryList").CategoryListVariables) => {
    current: Promise<import("@apollo/client").ApolloQueryResult<import("../../queries/gqlTypes/CategoryList").CategoryList>>;
    data: import("../../fragments/gqlTypes/BaseCategory").BaseCategory[];
    loading: boolean;
    next: () => Promise<void>;
    pageInfo: import("../../fragments/gqlTypes/PageInfo").PageInfo;
};
export declare const useCategoryAncestorsList: (variables: import("../../queries/gqlTypes/CategoryAncestorsList").CategoryAncestorsListVariables) => {
    current: Promise<import("@apollo/client").ApolloQueryResult<import("../../queries/gqlTypes/CategoryAncestorsList").CategoryAncestorsList>>;
    data: import("../../fragments/gqlTypes/BaseCategory").BaseCategory[];
    loading: boolean;
    next: () => Promise<void>;
    pageInfo: import("../../fragments/gqlTypes/PageInfo").PageInfo;
};
export declare const useCategoryChildrenList: (variables: import("../../queries/gqlTypes/CategoryChildrenList").CategoryChildrenListVariables) => {
    current: Promise<import("@apollo/client").ApolloQueryResult<import("../../queries/gqlTypes/CategoryChildrenList").CategoryChildrenList>>;
    data: import("../../fragments/gqlTypes/BaseCategory").BaseCategory[];
    loading: boolean;
    next: () => Promise<void>;
    pageInfo: import("../../fragments/gqlTypes/PageInfo").PageInfo;
};
export declare const useCategoryDetails: (variables: import("../../queries/gqlTypes/CategoryDetails").CategoryDetailsVariables) => {
    current: Promise<import("@apollo/client").ApolloQueryResult<import("../../queries/gqlTypes/CategoryDetails").CategoryDetails>>;
    data: import("../../fragments/gqlTypes/CategoryDetails").CategoryDetails;
    loading: boolean;
};
