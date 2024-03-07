// @ts-nocheck
import {
  DataErrorCheckoutTypes,
  FunctionErrorCheckoutTypes,
} from "../../api/Checkout/types";
import { ApolloClientManager } from "../../data/ApolloClientManager";
import { LocalStorageHandler } from "../../helpers/LocalStorageHandler";
import { JobRunResponse } from "../types";
import {
  CompleteCheckoutJobInput,
  CreatePaymentJobInput,
  RemovePromoCodeJobInput,
  AddPromoCodeJobInput,
  SetShippingMethodJobInput,
  ProvideCheckoutJobInput,
  CreateCheckoutJobInput,
  SetShippingAddressJobInput,
  SetBillingAddressJobInput,
  SetBillingAddressWithEmailJobInput,
  PaymentMethodUpdateJobInput,
} from "./types";
import { JobsHandler } from "../JobsHandler";
import { AddressTypes } from "src";

export type PromiseCheckoutJobRunResponse = Promise<
  JobRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes>
>;

class CheckoutJobs extends JobsHandler<{}> {
  private apolloClientManager: ApolloClientManager;

  private localStorageHandler: LocalStorageHandler;

  constructor(
    localStorageHandler: LocalStorageHandler,
    apolloClientManager: ApolloClientManager
  ) {
    super();
    this.apolloClientManager = apolloClientManager;
    this.localStorageHandler = localStorageHandler;
  }

  provideCheckout = async ({
    isUserSignedIn,
  }: ProvideCheckoutJobInput): PromiseCheckoutJobRunResponse => {
    console.log("in provideCheckout");

    const checkout = await LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.getCheckout(
      isUserSignedIn,
      checkout?.token
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.GET_CHECKOUT,
        },
      };
    }
    await this.localStorageHandler.setCheckout(data || checkout);

    // const data={};
    return {
      data,
    };
  };

  setAddressType = async ({
    addressId,
    type,
  }: {
    addressId: string;
    type: AddressTypes;
  }) => {
    const { data, error } = await this.apolloClientManager.setAddressType(
      addressId,
      type
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    }

    return { data };
  };

  createCheckout = async ({
    email,
    lines,
    shippingAddress,
    selectedShippingAddressId,
    billingAddress,
    selectedBillingAddressId,
  }: CreateCheckoutJobInput): PromiseCheckoutJobRunResponse => {
    const { data, error } = await this.apolloClientManager.createCheckout(
      email,
      lines,
      shippingAddress,
      billingAddress
    );

    if (error) {
      /**
       * TODO: Differentiate errors!!! THIS IS A BUG!!!
       * DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS is just one of every possible - instead of deprecated errors, checkoutErrors should be used.
       */
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    }

    await this.localStorageHandler.setCheckout({
      ...data,
      selectedBillingAddressId,
      selectedShippingAddressId,
    });
    return {
      data,
    };
  };

  updateCheckoutMeta = async ({ metaInput }: { metaInput: any }): any => {
    const checkout = await LocalStorageHandler.getCheckout();
    const { data, error } = await this.apolloClientManager.updateCheckoutMeta(
      checkout,
      metaInput
    );
    if (data) {
      await this.localStorageHandler.setCheckout({
        ...data,
      });
    }

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    }

    return {
      data,
    };
  };

  createCheckoutRest = async ({
    lines,
    tags,
    checkoutMetadataInput,
    isRecalculate = false,
  }): {
    lines?: any;
    isRecalculate?: boolean;
    tags?: string[];
    checkoutMetadataInput?: any;
  } => {
    const { data, error } = await this.apolloClientManager.createCheckoutRest(
      lines,
      isRecalculate,
      tags,
      checkoutMetadataInput
    );

    if (error) {
      /**
       * TODO: Differentiate errors!!! THIS IS A BUG!!!
       * DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS is just one of every possible - instead of deprecated errors, checkoutErrors should be used.
       */
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    }

    await this.localStorageHandler.setCheckout({
      ...data,
    });
    return {
      data,
    };
  };

  setShippingAddress = async ({
    checkoutId,
    shippingAddress,
    email,
    selectedShippingAddressId,
    isRecalculate,
  }: SetShippingAddressJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = await LocalStorageHandler.getCheckout();
    const { data, error } = await this.apolloClientManager.setShippingAddress(
      shippingAddress,
      email,
      checkoutId,
      isRecalculate
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS,
        },
      };
    }

    await this.localStorageHandler.setCheckout({
      ...(checkout?._W ? checkout?._W : checkout),
      availableShippingMethods: data?.availableShippingMethods,
      billingAsShipping: false,
      email: data?.email,
      selectedShippingAddressId,
      shippingAddress: data?.shippingAddress,
      ...data,
    });
    return { data };
  };

  setBillingAddress = async ({
    checkoutId,
    billingAddress,
    billingAsShipping,
    selectedBillingAddressId,
  }: SetBillingAddressJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = await LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.setBillingAddress(
      billingAddress,
      checkoutId
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_BILLING_ADDRESS,
        },
      };
    }

    await this.localStorageHandler.setCheckout({
      ...(checkout?._W ? checkout?._W : checkout),
      availablePaymentGateways: data?.availablePaymentGateways,
      billingAddress: data?.billingAddress,
      billingAsShipping: !!billingAsShipping,
      selectedBillingAddressId,
    });
    return { data };
  };

  setBillingAddressWithEmail = async ({
    checkoutId,
    email,
    billingAddress,
    selectedBillingAddressId,
  }: SetBillingAddressWithEmailJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = await LocalStorageHandler.getCheckout();

    const { data, error } =
      await this.apolloClientManager.setBillingAddressWithEmail(
        billingAddress,
        email,
        checkoutId
      );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_BILLING_ADDRESS,
        },
      };
    }

    await this.localStorageHandler.setCheckout({
      ...checkout,
      availablePaymentGateways: data?.availablePaymentGateways,
      billingAddress: data?.billingAddress,
      billingAsShipping: false,
      email: data?.email,
      selectedBillingAddressId,
    });
    return { data };
  };

  updateCheckoutPayment = async ({
    checkoutId,
    gatewayId,
    useCashback,
    isRecalculate,
  }: PaymentMethodUpdateJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = await LocalStorageHandler.getCheckout();

    const { data, error } =
      await this.apolloClientManager.updateCheckoutPayment(
        checkoutId,
        gatewayId,
        useCashback,
        isRecalculate
      );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_METHOD,
        },
      };
    }

    await this.localStorageHandler.setCheckout({
      ...data,
      promoCodeDiscount: data?.promoCodeDiscount,
      shippingMethod: data?.shippingMethod,
      availableShippingMethods: data?.availableShippingMethods,
      shippingAddress: data?.shippingAddress,
    });
    return { data };
  };

  setShippingMethod = async ({
    checkoutId,
    shippingMethodId,
    isRecalculate = true,
  }: SetShippingMethodJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = await LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.setShippingMethod(
      shippingMethodId,
      checkoutId,
      isRecalculate
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_METHOD,
        },
      };
    }

    await this.localStorageHandler.setCheckout({
      ...data,
      promoCodeDiscount: data?.promoCodeDiscount,
      shippingMethod: data?.shippingMethod,
    });
    return { data };
  };

  addPromoCode = async ({
    checkoutId,
    promoCode,
    isRecalculate,
  }: AddPromoCodeJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = await LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.addPromoCode(
      promoCode,
      checkoutId,
      isRecalculate
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.ADD_PROMO_CODE,
        },
      };
    }

    await this.localStorageHandler.setCheckout({
      ...(checkout ?? {}),
      promoCodeDiscount: data?.promoCodeDiscount,
      ...data,
    });
    return { data };
  };

  removePromoCode = async ({
    checkoutId,
    promoCode,
    isRecalculate,
  }: RemovePromoCodeJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = await LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.removePromoCode(
      promoCode,
      checkoutId,
      isRecalculate
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.REMOVE_PROMO_CODE,
        },
      };
    }

    await this.localStorageHandler.setCheckout({
      ...(checkout ?? {}),
      promoCodeDiscount: data?.promoCodeDiscount,
      ...data,
    });
    return { data };
  };

  createPayment = async ({
    checkoutId,
    amount,
    gateway,
    token,
    billingAddress,
    creditCard,
    returnUrl,
  }: CreatePaymentJobInput): PromiseCheckoutJobRunResponse => {
    const payment = await LocalStorageHandler.getPayment();

    const { data, error } = await this.apolloClientManager.createPayment({
      amount,
      billingAddress,
      checkoutId,
      gateway,
      returnUrl,
      token,
    });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CREATE_PAYMENT,
        },
      };
    }

    await this.localStorageHandler.setPayment({
      ...payment,
      creditCard,
      gateway: data?.gateway,
      id: data?.id,
      token: data?.token,
      total: data?.total,
    });
    return { data };
  };

  completeCheckout = async ({
    checkoutId,
    paymentData,
    redirectUrl,
    storeSource,
  }: CompleteCheckoutJobInput): PromiseCheckoutJobRunResponse => {
    const { data, error } = await this.apolloClientManager.completeCheckout({
      checkoutId,
      paymentData,
      redirectUrl,
      storeSource,
    });
    console.log("xxxxxxxcheckoutcomplete-checkoutjobs", data);
    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT,
        },
      };
    }

    if (!data?.confirmationNeeded) {
      await this.localStorageHandler.setCheckout({});
      await this.localStorageHandler.setPayment({});
    }

    return { data };
  };
}

export default CheckoutJobs;
