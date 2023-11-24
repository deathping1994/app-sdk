import { LocalStorageManager } from "../../data";
import { ErrorListener } from "../../helpers";
import { JobsManager } from "../../jobs";
import { SaleorState } from "../../state";
import { ApolloClientManager } from "../../data/ApolloClientManager";
import { IWishlistItems } from "./types";
export declare class SaleorWishlistAPI extends ErrorListener {
    loaded: boolean;
    items: IWishlistItems;
    private apolloClientManager;
    private jobsManager;
    private localStorageManager;
    private saleorState;
    constructor(localStorageManager: LocalStorageManager, apolloClientManager: ApolloClientManager, saleorState: SaleorState, jobsManager: JobsManager);
    getWishlist: () => Promise<{
        data: any;
        dataError: any;
    }>;
    addItemInWishlist: (productId: string) => Promise<{
        data: any;
        dataError: any;
    }>;
    removeItemInWishlist: (productId: string) => Promise<void>;
}
