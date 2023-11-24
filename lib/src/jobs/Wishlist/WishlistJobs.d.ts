import { ApolloClientManager } from "../../data/ApolloClientManager";
import { LocalStorageHandler } from "../../helpers/LocalStorageHandler";
import { JobsHandler } from "../JobsHandler";
export declare enum ErrorCartTypes {
    "SET_CART_ITEM" = 0
}
export declare class WishlistJobs extends JobsHandler<{}> {
    private apolloClientManager;
    private localStorageHandler;
    constructor(localStorageHandler: LocalStorageHandler, apolloClientManager: ApolloClientManager);
    getWishlist: () => Promise<{
        dataError: {
            error: readonly import("graphql").GraphQLError[];
        };
        data?: undefined;
    } | {
        data: import("../../queries/gqlTypes/Wishlist").Wishlist_wishlist;
        dataError?: undefined;
    }>;
    addItemInWishlist: ({ productId }: {
        productId: string;
    }) => Promise<{
        dataError: {
            error: readonly import("graphql").GraphQLError[];
        };
        data?: undefined;
    } | {
        data: import("../../mutations/gqlTypes/wishlistAddProduct").wishlistAddProduct_WishlistAddProduct_wishlist[];
        dataError?: undefined;
    }>;
}
