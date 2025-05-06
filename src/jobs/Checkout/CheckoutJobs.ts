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
    input,
  }: CreateCheckoutJobInput): PromiseCheckoutJobRunResponse => {
    const { data, error } = await this.apolloClientManager.createCheckout(
      input
    );

    if (error) {
      /**
       * TODO: Differentiate errors!!! THIS IS A BUG!!!
       * DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS is just one of every possible - instead of deprecated errors, checkoutErrors should be used.
       */
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CREATE_CHECKOUT,
        },
      };
    }

    // await this.localStorageHandler.setCheckout({
    //   ...data,
    // });
    return {
      data,
    };
  };

  getCustomerCheckouts = async ({ customerId }: { customerId: string }) => {
    const { data, error } = await this.apolloClientManager.getCustomerCheckouts(
      customerId
    );
    console.log("getCustomerCheckouts", data);
    if (data) {
      await this.localStorageHandler.setCustomerCheckouts(data);
    }

    if (error) {
      return {
        dataError: {
          error,
        },
      };
    }
    return {
      data,
    };
  };

  getCustomerCarts = async ({ customerId }: { customerId: string }) => {
    const { data, error } = await this.apolloClientManager.getCustomerCarts(
      customerId
    );
    console.log("getCustomerCarts", data);
    if (data) {
      await this.localStorageHandler.setCart(data);
    }

    if (error) {
      return {
        dataError: {
          error,
        },
      };
    }
    return {
      data,
    };
  };

  getCustomerCheckoutsWithDetails = async ({
    customerId,
  }: {
    customerId: string;
  }) => {
    const { data, error } =
      await this.apolloClientManager.getCustomerCheckoutsWithDetails(
        customerId
      );
    console.log("getCustomerCheckouts", data);
    if (data) {
      await this.localStorageHandler.setCustomerCheckouts(data);
    }

    if (error) {
      return {
        dataError: {
          error,
        },
      };
    }
    return {
      data,
    };
  };

  getCustomerCheckoutByToken = async ({ token }: { token: string }) => {
    const { data, error } =
      await this.apolloClientManager.getCustomerCheckoutByToken(token);
    console.log("getCustomerCheckoutByToken", data);

    if (error) {
      return {
        dataError: {
          error,
        },
      };
    }
    return {
      data,
    };
  };

  checkoutLineUpdate = async ({
    checkoutId,
    lines,
  }: {
    checkoutId: string;
    lines: any[];
  }) => {
    const { data, error } = await this.apolloClientManager.checkoutLineUpdate(
      checkoutId,
      lines
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_LINE_UPDATE,
        },
      };
    }

    return {
      data,
    };
  };

  checkoutLineAdd = async ({
    checkoutId,
    lines,
  }: {
    checkoutId: string;
    lines: any[];
  }) => {
    const { data, error } = await this.apolloClientManager.checkoutLineAdd(
      checkoutId,
      lines
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_LINE_ADD,
        },
      };
    }

    return {
      data,
    };
  };

  checkoutSublineUpdate = async ({ checkoutLineId, sublines, replace }) => {
    const { data, error } =
      await this.apolloClientManager.checkoutSublineUpdate(
        checkoutLineId,
        sublines,
        replace
      );
    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_UPDATE_SUBLINE,
        },
      };
    }

    return {
      data,
    };
  };

  checkoutLineAddonCreate = async ({ input }: { input: string }) => {
    const { data, error } =
      await this.apolloClientManager.checkoutLineAddonCreate(input);

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_LINE_ADDON_CREATE,
        },
      };
    }

    return {
      data,
    };
  };

  checkoutLineAddonDelete = async ({ id }: { id: string }) => {
    const { data, error } =
      await this.apolloClientManager.checkoutLineAddonDelete(id);

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_LINE_ADDON_DELETE,
        },
      };
    }

    return {
      data,
    };
  };
  checkoutLineAddExtraData = async ({
    checkoutLineId,
    input,
  }: {
    checkoutLineId: string;
    input: any;
  }) => {
    const { data, error } =
      await this.apolloClientManager.checkoutLineAddExtraData(
        checkoutLineId,
        input
      );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_LINE_ADD_EXTRA_DATA,
        },
      };
    }

    return {
      data,
    };
  };

  checkoutLineDeleteExtraData = async ({
    checkoutLineId,
    key,
  }: {
    checkoutLineId: string;
    key: string[];
  }) => {
    const { data, error } =
      await this.apolloClientManager.checkoutLineDeleteExtraData(
        checkoutLineId,
        key
      );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_LINE_DELETE_EXTRA_DATA,
        },
      };
    }

    return {
      data,
    };
  };

  checkoutDeleteExtraData = async ({ extraDataId }) => {
    const { data, error } =
      await this.apolloClientManager.checkoutDeleteExtraData(extraDataId);

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_DELETE_EXTRA_DATA,
        },
      };
    }

    return {
      data,
      error,
    };
  };

  checkoutExpressAdd = async ({ checkoutIds }) => {
    const { data, error } = await this.apolloClientManager.checkoutExpressAdd(
      checkoutIds
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_EXPRESS_ADD,
        },
      };
    }

    return {
      data,
    };
  };

  checkoutExpressRemove = async ({ checkoutIds }) => {
    const { data, error } =
      await this.apolloClientManager.checkoutExpressRemove(checkoutIds);

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_EXPRESS_REMOVE,
        },
      };
    }

    return {
      data,
    };
  };

  checkoutLineExpressAdd = async ({ checkoutLineId, price, checkoutIds }) => {
    const { data, error } =
      await this.apolloClientManager.checkoutLineExpressAdd(
        checkoutLineId,
        price,
        checkoutIds
      );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_LINE_EXPRESS_ADD,
        },
      };
    }

    return {
      data,
    };
  };

  checkoutLineExpressRemove = async ({ checkoutLineId }) => {
    const { data, error } =
      await this.apolloClientManager.checkoutLineExpressRemove(checkoutLineId);

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_LINE_EXPRESS_REMOVE,
        },
      };
    }

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
    // const checkout = await LocalStorageHandler.getCheckout();

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

    // await this.localStorageHandler.setCheckout({
    //   ...data,
    //   promoCodeDiscount: data?.promoCodeDiscount,
    //   shippingMethod: data?.shippingMethod,
    //   availableShippingMethods: data?.availableShippingMethods,
    //   shippingAddress: data?.shippingAddress,
    // });
    return { data };
  };

  setShippingMethod = async ({
    checkoutId,
    shippingMethodId,
    isRecalculate = true,
  }: SetShippingMethodJobInput): PromiseCheckoutJobRunResponse => {
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

    // await this.localStorageHandler.setCheckout({
    //   ...data,
    //   promoCodeDiscount: data?.promoCodeDiscount,
    //   shippingMethod: data?.shippingMethod,
    // });
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
    paymentInput,
  }: {
    checkoutId: string;
    paymentInput: any;
  }): PromiseCheckoutJobRunResponse => {
    const { data, error } = await this.apolloClientManager.createPayment({
      checkoutId,
      paymentInput,
    });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CREATE_PAYMENT,
        },
      };
    }
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

    // if (!data?.confirmationNeeded) {
    //   await this.localStorageHandler.setCheckout({});
    //   await this.localStorageHandler.setPayment({});
    // }

    return { data };
  };

  checkoutAddCustomDisount = async ({ input }) => {
    const { data, error } =
      await this.apolloClientManager.checkoutAddCustomDisount({ input });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_ADD_CUSTOM_DISCOUNT,
        },
      };
    }

    return { data };
  };

  checkoutLineImageAudioDelete = async ({ extraDataId }) => {
    const { data, error } =
      await this.apolloClientManager.checkoutLineImageAudioDelete(extraDataId);

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_LINE_IMAGE_AUDIO_DELETE,
        },
      };
    }

    return { data };
  };

  checkoutUpdateData = async ({
    checkoutId,
    input,
  }: {
    checkoutId: string;
    input: {
      deliveryDateTime: any;
    };
  }) => {
    const { data, error } = await this.apolloClientManager.checkoutUpdateData({
      checkoutId,
      input,
    });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_UPDATE_DATA,
        },
      };
    }

    return { data };
  };

  checkoutLineUpdateData = async ({
    checkoutLineId,
    input,
  }: {
    checkoutLineId: string;
    input: any;
  }) => {
    const { data, error } =
      await this.apolloClientManager.checkoutLineUpdateData({
        checkoutLineId,
        input,
      });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CHECKOUT_LINE_UPDATE_DATA,
        },
      };
    }

    return { data };
  };

  createCart = async ({ customerId }: { customerId: string }) => {
    const { data, error } = await this.apolloClientManager.createCart({
      customerId,
    });
    console.log("xxxxxxxcreateCart-checkoutjobs", data);
    if (data) {
      await this.localStorageHandler.setCart(data?.cart);
    }

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.CREATE_CART,
        },
      };
    }

    return { data };
  };

  completeCheckoutMultiple = async ({
    checkoutIds,
  }: {
    checkoutIds: {
      checkoutId: string;
    }[];
  }): PromiseCheckoutJobRunResponse => {
    const { data, error } =
      await this.apolloClientManager.completeCheckoutMultiple({
        checkoutIds,
      });
    console.log("xxxxxxxcompleteCheckoutMultiple-checkoutjobs", data);
    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.COMPLETE_CHECKOUT_MULTIPLE,
        },
      };
    }

    // if (!data?.confirmationNeeded) {
    //   await this.localStorageHandler.setCheckout({});
    //   await this.localStorageHandler.setPayment({});
    // }

    return { data };
  };
}

export default CheckoutJobs;
