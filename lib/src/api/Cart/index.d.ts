import { LocalStorageManager } from "../../data";
import { ErrorListener } from "../../helpers";
import { JobsManager } from "../../jobs";
import { SaleorState } from "../../state";
import { ApolloClientManager } from "../../data/ApolloClientManager";
import { IDiscount, IItems, IShippingPrice, ISubtotalPrice, ITotalPrice } from "./types";
export declare class SaleorCartAPI extends ErrorListener {
    loaded: boolean;
    items: IItems;
    totalPrice: ITotalPrice;
    subtotalPrice: ISubtotalPrice;
    shippingPrice: IShippingPrice;
    discount?: IDiscount;
    private apolloClientManager;
    private jobsManager;
    private localStorageManager;
    private saleorState;
    constructor(localStorageManager: LocalStorageManager, apolloClientManager: ApolloClientManager, saleorState: SaleorState, jobsManager: JobsManager);
    addItem: (variantId: string, quantity: number) => Promise<{
        error: any;
        data?: undefined;
        pending?: undefined;
    } | {
        data: any;
        pending: boolean;
        error?: undefined;
    } | {
        pending: boolean;
        error?: undefined;
        data?: undefined;
    }>;
    setCartItem: () => Promise<{}>;
    removeItem: (variantId: string) => Promise<{
        error: any;
        data?: undefined;
        pending?: undefined;
    } | {
        data: any;
        pending: boolean;
        error?: undefined;
    } | {
        pending: boolean;
        error?: undefined;
        data?: undefined;
    }>;
    subtractItem: (variantId: string) => Promise<{
        error: any;
        data?: undefined;
        pending?: undefined;
    } | {
        data: any;
        pending: boolean;
        error?: undefined;
    } | {
        pending: boolean;
        error?: undefined;
        data?: undefined;
    }>;
    updateItem: (variantId: string, quantity: number) => Promise<{
        error: any;
        data?: undefined;
        pending?: undefined;
    } | {
        data: any;
        pending: boolean;
        error?: undefined;
    } | {
        pending: boolean;
        error?: undefined;
        data?: undefined;
    }>;
    updateCart: () => Promise<void>;
}
