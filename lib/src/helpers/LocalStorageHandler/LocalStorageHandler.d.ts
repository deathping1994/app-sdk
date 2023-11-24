import { ICheckoutModel, IJobsModel, IPaymentModel, IWishlistModel } from "./types";
import LocalStorageHandlerProxy from "./Proxy";
export declare class LocalStorageHandler extends LocalStorageHandlerProxy {
    static getCheckout(): Promise<ICheckoutModel | null | {
        _W: any;
    }>;
    static getPayment(): Promise<IPaymentModel | null>;
    static getJobs(): Promise<IJobsModel | null>;
    static getSignInToken(): Promise<string | null>;
    static getCsrfToken(): Promise<string | null>;
    static getRefreshToken(): Promise<string | null>;
    setSignInToken(token: string | null): Promise<void>;
    setCsrfToken(csrfToken: string | null): Promise<void>;
    setRefreshToken(refreshToken: string | null): Promise<void>;
    setCheckout(checkout: ICheckoutModel | null): Promise<void>;
    setPayment(payment: IPaymentModel | null): Promise<void>;
    setJobs(jobs: IJobsModel | null): Promise<void>;
    setWishlist(wishlist: IWishlistModel | null): Promise<void>;
    clear(): Promise<void>;
}
