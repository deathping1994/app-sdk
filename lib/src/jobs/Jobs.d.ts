import { ApolloClientManager } from "../data/ApolloClientManager";
import { LocalStorageHandler } from "../helpers/LocalStorageHandler";
import { AuthJobs } from "./Auth";
import { CartQueuedJobs } from "./Cart/CartQueuedJobs";
import { CheckoutJobs } from "./Checkout";
import { WishlistJobs } from "./Wishlist";
export interface IJobs {
    auth: AuthJobs;
    checkout: CheckoutJobs;
    wishlist: WishlistJobs;
    cart: CartQueuedJobs;
}
export declare class Jobs implements IJobs {
    auth: AuthJobs;
    checkout: CheckoutJobs;
    wishlist: WishlistJobs;
    cart: CartQueuedJobs;
    constructor(localStorageHandler: LocalStorageHandler, apolloClientManager: ApolloClientManager);
}
