import { DataErrorCheckoutTypes, FunctionErrorCheckoutTypes } from "../../api/Checkout/types";
import { ApolloClientManager } from "../../data/ApolloClientManager";
import { LocalStorageHandler } from "../../helpers/LocalStorageHandler";
import { JobRunResponse } from "../types";
import { CompleteCheckoutJobInput, CreatePaymentJobInput, RemovePromoCodeJobInput, AddPromoCodeJobInput, SetShippingMethodJobInput, ProvideCheckoutJobInput, CreateCheckoutJobInput, SetShippingAddressJobInput, SetBillingAddressJobInput, SetBillingAddressWithEmailJobInput, PaymentMethodUpdateJobInput } from "./types";
import { JobsHandler } from "../JobsHandler";
import { AddressTypes } from "src";
export declare type PromiseCheckoutJobRunResponse = Promise<JobRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes>>;
declare class CheckoutJobs extends JobsHandler<{}> {
    private apolloClientManager;
    private localStorageHandler;
    constructor(localStorageHandler: LocalStorageHandler, apolloClientManager: ApolloClientManager);
    provideCheckout: ({ isUserSignedIn, }: ProvideCheckoutJobInput) => PromiseCheckoutJobRunResponse;
    setAddressType: ({ addressId, type, }: {
        addressId: string;
        type: AddressTypes;
    }) => Promise<{
        dataError: {
            error: any;
            type: DataErrorCheckoutTypes;
        };
        data?: undefined;
    } | {
        data: import("../../mutations/gqlTypes/UpdateCheckoutAddressType").UpdateCheckoutAddressType;
        dataError?: undefined;
    }>;
    createCheckout: ({ email, lines, shippingAddress, selectedShippingAddressId, billingAddress, selectedBillingAddressId, }: CreateCheckoutJobInput) => PromiseCheckoutJobRunResponse;
    setShippingAddress: ({ checkoutId, shippingAddress, email, selectedShippingAddressId, }: SetShippingAddressJobInput) => PromiseCheckoutJobRunResponse;
    setBillingAddress: ({ checkoutId, billingAddress, billingAsShipping, selectedBillingAddressId, }: SetBillingAddressJobInput) => PromiseCheckoutJobRunResponse;
    setBillingAddressWithEmail: ({ checkoutId, email, billingAddress, selectedBillingAddressId, }: SetBillingAddressWithEmailJobInput) => PromiseCheckoutJobRunResponse;
    updateCheckoutPayment: ({ checkoutId, gatewayId, useCashback, }: PaymentMethodUpdateJobInput) => PromiseCheckoutJobRunResponse;
    setShippingMethod: ({ checkoutId, shippingMethodId, }: SetShippingMethodJobInput) => PromiseCheckoutJobRunResponse;
    addPromoCode: ({ checkoutId, promoCode, }: AddPromoCodeJobInput) => PromiseCheckoutJobRunResponse;
    removePromoCode: ({ checkoutId, promoCode, }: RemovePromoCodeJobInput) => PromiseCheckoutJobRunResponse;
    createPayment: ({ checkoutId, amount, gateway, token, billingAddress, creditCard, returnUrl, }: CreatePaymentJobInput) => PromiseCheckoutJobRunResponse;
    completeCheckout: ({ checkoutId, paymentData, redirectUrl, storeSource, }: CompleteCheckoutJobInput) => PromiseCheckoutJobRunResponse;
}
export default CheckoutJobs;
