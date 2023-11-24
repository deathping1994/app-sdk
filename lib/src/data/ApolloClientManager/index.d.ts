import { ApolloClient } from "@apollo/client";
import { AddressTypes } from "src";
import { UpdateCheckoutAddressType } from "src/mutations/gqlTypes/UpdateCheckoutAddressType";
import { User } from "../../fragments/gqlTypes/User";
import { ICheckoutAddress, ICheckoutModel, ICheckoutModelLine, IPaymentModel } from "../../helpers/LocalStorageHandler";
import { CreatePaymentInput, CompleteCheckoutInput, VerifySignInTokenInput, RefreshSignInTokenInput } from "./types";
export declare class ApolloClientManager {
    private client;
    constructor(client: ApolloClient<any>);
    subscribeToUserChange: (next: (value: User | null) => void, error?: (error: any) => void, complete?: () => void) => void;
    getWishlistItems: (first: number) => Promise<{
        error: readonly import("graphql").GraphQLError[];
        data?: undefined;
    } | {
        data: import("../../queries/gqlTypes/Wishlist").Wishlist_wishlist;
        error?: undefined;
    }>;
    addWishlistItems: (productId: string) => Promise<{
        error: readonly import("graphql").GraphQLError[];
        data?: undefined;
    } | {
        data: import("../../mutations/gqlTypes/wishlistAddProduct").wishlistAddProduct_WishlistAddProduct_wishlist[];
        error?: undefined;
    }>;
    removeWishlistItems: (productId: string) => Promise<{
        error: readonly import("graphql").GraphQLError[];
        data?: undefined;
    } | {
        data: import("../../mutations/gqlTypes/wishlistRemoveProduct").wishlistRemoveProduct_WishlistRemoveProduct_wishlist[];
        error?: undefined;
    }>;
    getUser: () => Promise<{
        error: readonly import("graphql").GraphQLError[];
        data?: undefined;
    } | {
        data: import("../../queries/gqlTypes/UserDetails").UserDetails_me;
        error?: undefined;
    }>;
    registerAccount: (email: string, password: string, redirectUrl: string) => Promise<{
        error: readonly import("graphql").GraphQLError[];
        data?: undefined;
    } | {
        error: import("../../mutations/gqlTypes/RegisterAccount").RegisterAccount_accountRegister_accountErrors[];
        data?: undefined;
    } | {
        data: {
            requiresConfirmation: boolean;
        };
        error?: undefined;
    }>;
    resetPasswordRequest: (email: string, redirectUrl: string) => Promise<{
        error: readonly import("graphql").GraphQLError[];
    } | {
        error: import("../../mutations/gqlTypes/ResetPasswordRequest").ResetPasswordRequest_requestPasswordReset_accountErrors[];
    } | {
        error?: undefined;
    }>;
    signIn: (email: string, password: string) => Promise<{
        error: readonly import("graphql").GraphQLError[];
        data?: undefined;
    } | {
        error: import("../../mutations/gqlTypes/TokenAuth").TokenAuth_tokenCreate_errors[];
        data?: undefined;
    } | {
        data: {
            csrfToken: string;
            token: string;
            user: import("../../mutations/gqlTypes/TokenAuth").TokenAuth_tokenCreate_user;
        };
        error?: undefined;
    }>;
    confirmAccountV2: (otp: string, phone: string) => Promise<{
        error: readonly import("graphql").GraphQLError[];
        data?: undefined;
    } | {
        error: import("../../mutations/gqlTypes/CreateAccountV2").ConfirmAccountV2_confirmAccountV2_errors[];
        data?: undefined;
    } | {
        error: import("../../mutations/gqlTypes/CreateAccountV2").ConfirmAccountV2_confirmAccountV2_accountErrors[];
        data?: undefined;
    } | {
        data: {
            csrfToken: string;
            token: string;
            refreshToken: string;
            user: import("../../mutations/gqlTypes/CreateAccountV2").ConfirmAccountV2_confirmAccountV2_user;
        };
        error?: undefined;
    }>;
    signInMobile: (checkoutId: any, otp: string, phone: string) => Promise<{
        error: readonly import("graphql").GraphQLError[];
        data?: undefined;
    } | {
        error: import("../../mutations/gqlTypes/OTPAuthentication").OTPAuthentication_CreateTokenOTP_otpErrors[];
        data?: undefined;
    } | {
        data: {
            csrfToken: string;
            token: string;
            refreshToken: string;
            user: import("../../mutations/gqlTypes/OTPAuthentication").OTPAuthentication_CreateTokenOTP_user;
        };
        error?: undefined;
    }>;
    signOut: () => Promise<void>;
    verifySignInToken: ({ token }: VerifySignInTokenInput) => Promise<{
        error: readonly import("graphql").GraphQLError[];
        data?: undefined;
    } | {
        error: import("../../mutations/gqlTypes/VerifyToken").VerifyToken_tokenVerify_errors[];
        data?: undefined;
    } | {
        data: {
            isValid: boolean;
            payload: any;
            user: import("../../mutations/gqlTypes/VerifyToken").VerifyToken_tokenVerify_user;
        };
        error?: undefined;
    }>;
    refreshSignInToken: ({ csrfToken, refreshToken, }: RefreshSignInTokenInput) => Promise<{
        error: readonly import("graphql").GraphQLError[];
        data?: undefined;
    } | {
        error: import("../../mutations/gqlTypes/RefreshToken").RefreshToken_tokenRefresh_errors[];
        data?: undefined;
    } | {
        data: {
            token: string;
            user: import("../../mutations/gqlTypes/RefreshToken").RefreshToken_tokenRefresh_user;
        };
        error?: undefined;
    }>;
    getCheckout: (isUserSignedIn: boolean, checkoutToken: string | null) => Promise<{
        data: ICheckoutModel;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    }>;
    getRefreshedCheckoutLines: (checkoutlines: ICheckoutModelLine[] | null) => Promise<{
        error: any;
        data?: undefined;
    } | {
        data: {
            id: string;
            quantity: number;
            totalPrice: {
                gross: {
                    amount: number;
                    __typename: "Money";
                    currency: string;
                };
                net: {
                    amount: number;
                    __typename: "Money";
                    currency: string;
                };
            };
            variant: import("../../helpers/LocalStorageHandler").ICheckoutModelLineVariant;
        }[];
        error?: undefined;
    }>;
    createCheckout: (email: string, lines: Array<{
        variantId: string;
        quantity: number;
    }>, shippingAddress?: ICheckoutAddress, billingAddress?: ICheckoutAddress) => Promise<{
        data: ICheckoutModel;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    }>;
    setCartItem: (checkout: ICheckoutModel) => Promise<{
        data: ICheckoutModel;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    }>;
    setCartItemTwo: (variantId: string, quantity: number, checkout: ICheckoutModel) => Promise<{
        data: ICheckoutModel;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    }>;
    removeCartTwo: (variantId: string, checkout: ICheckoutModel) => Promise<{
        data: ICheckoutModel;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    }>;
    setShippingAddress: (shippingAddress: ICheckoutAddress, email: string, checkoutId: string) => Promise<{
        data: ICheckoutModel;
        error?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
    setAddressType: (addressId: string, type: AddressTypes) => Promise<{
        data: UpdateCheckoutAddressType;
        error?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
    setBillingAddress: (billingAddress: ICheckoutAddress, checkoutId: string) => Promise<{
        data: ICheckoutModel;
        error?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
    setBillingAddressWithEmail: (billingAddress: ICheckoutAddress, email: string, checkoutId: string) => Promise<{
        data: ICheckoutModel;
        error?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
    updateCheckoutPayment: (checkoutId: string, gatewayId: string, useCashback: boolean) => Promise<{
        data: ICheckoutModel;
        error?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
    setShippingMethod: (shippingMethodId: string, checkoutId: string) => Promise<{
        data: ICheckoutModel;
        error?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
    addPromoCode: (promoCode: string, checkoutId: string) => Promise<{
        data: ICheckoutModel;
        error?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
    removePromoCode: (promoCode: string, checkoutId: string) => Promise<{
        data: ICheckoutModel;
        error?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
    createPayment: ({ amount, checkoutId, gateway, billingAddress, token, returnUrl, }: CreatePaymentInput) => Promise<{
        data: IPaymentModel;
        error?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
    completeCheckout: ({ checkoutId, paymentData, redirectUrl, storeSource, }: CompleteCheckoutInput) => Promise<{
        data: import("../../mutations/gqlTypes/CompleteCheckout").CompleteCheckout_checkoutComplete;
        error?: undefined;
    } | {
        data?: undefined;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
    private constructCheckoutModel;
    private constructPaymentModel;
}
