import { SaleorState } from "../../state";
import { LocalStorageHandler } from "../../helpers/LocalStorageHandler/LocalStorageHandler";
import { Wishlist_wishlist_items_edges_node_product } from "src/queries/gqlTypes/Wishlist";
export declare class LocalStorageManager {
    private readonly handler;
    private saleorState;
    constructor(handler: LocalStorageHandler, saleorState: SaleorState);
    getHandler: () => LocalStorageHandler;
    addItemToCart: (variantId: string, quantity: number) => Promise<any>;
    removeItemFromCart: (variantId: string) => Promise<any>;
    subtractItemFromCart: (variantId: string) => Promise<any>;
    updateItemInCart: (variantId: string, quantity: number) => Promise<any>;
    addItemInWishlist: (productList: Wishlist_wishlist_items_edges_node_product[] | null | undefined) => void;
}
