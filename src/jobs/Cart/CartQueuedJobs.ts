// @ts-nocheck
import { ApolloClientManager } from "../../data/ApolloClientManager";
import { LocalStorageHandler } from "../../helpers/LocalStorageHandler";

import { QueuedJobsHandler } from "../QueuedJobsHandler";

export enum ErrorCartTypes {
  "SET_CART_ITEM",
}

export class CartQueuedJobs extends QueuedJobsHandler<ErrorCartTypes> {
  private apolloClientManager: ApolloClientManager;

  private localStorageHandler: LocalStorageHandler;

  constructor(
    localStorageHandler: LocalStorageHandler,
    apolloClientManager: ApolloClientManager
  ) {
    super();
    this.localStorageHandler = localStorageHandler;
    this.apolloClientManager = apolloClientManager;
  }

  setCartItem = async () => {
    let checkout = await LocalStorageHandler.getCheckout();
    console.log("setCartItem job", checkout);
    if (checkout?.timestamp) {
      checkout = checkout?.item;
    }
    if (checkout) {
      console.log("setCartItem job in if", checkout);

      const { data, error } = await this.apolloClientManager.setCartItem(
        checkout?._W ? checkout?._W : checkout
      );
      if (error && this.onErrorListener) {
        console.log("setCartItem job in error", error);

        this.onErrorListener(error, ErrorCartTypes.SET_CART_ITEM);
        return { error };
      } else if (data) {
        console.log("setCartItem job in data", data);

        let obj = {
          ...(checkout?._W ? checkout?._W : checkout),
          availablePaymentGateways: data.availablePaymentGateways,
          availableShippingMethods: data.availableShippingMethods,
          promoCodeDiscount: data.promoCodeDiscount,
          shippingMethod: data.shippingMethod,
          lines: data.lines,
        };

        await this.localStorageHandler.setCheckout(obj);
        console.log("setCartItem job in data", data);

        return { data };
      }
    }
  };

  setCartItemTwo = async ({
    variantId,
    quantity,
  }: {
    variantId: string;
    quantity: number;
  }) => {
    let checkout = await LocalStorageHandler.getCheckout();

    if (checkout) {
      console.log("setCartItem job in if", checkout);

      const { data, error } = await this.apolloClientManager.setCartItemTwo(
        variantId,
        quantity,
        checkout
      );
      if (error) {
        console.log("setCartItem job in error", error);
        // this.onErrorListener(error, ErrorCartTypes.SET_CART_ITEM);
        return { error };
      } else if (data) {
        console.log("setCartItem job in data", data);

        let obj = {
          ...(checkout?._W ? checkout?._W : checkout),
          availablePaymentGateways: data.availablePaymentGateways,
          availableShippingMethods: data.availableShippingMethods,
          promoCodeDiscount: data.promoCodeDiscount,
          shippingMethod: data.shippingMethod,
          lines: data.lines,
        };

        await this.localStorageHandler.setCheckout(obj);
        console.log("setCartItem job in data", data);

        return { data };
      }
    }
  };

  addItemRest = async ({
    variantId,
    quantity,
    tags,
    line_item,
    useDummyAddress = true,
    isRecalculate = false,
    checkoutMetadataInput,
  }: {
    variantId: string;
    quantity: number;
    tags?: string[];
    line_item?: any;
    useDummyAddress: boolean;
    isRecalculate: boolean;
    checkoutMetadataInput?: any;
  }) => {
    const checkout = await LocalStorageHandler.getCheckout();
    if (checkout) {
      const { data, error } = await this.apolloClientManager.addItemRest(
        variantId,
        quantity,
        tags,
        line_item,
        useDummyAddress,
        isRecalculate,
        checkoutMetadataInput,
        checkout
      );
      if (data) {
        await this.localStorageHandler.setCheckout(data);
        console.log("addItemRest job in data", data);
        return { data };
      }
      if (error) {
        console.log("Error in addItemRest", error);
        return { error };
      }
    }
  };

  updateItemRest = async ({
    variantId,
    quantity,
    isRecalculate = false,
    line_item,
    checkoutMetadataInput,
  }: {
    variantId: string;
    quantity: number;
    isRecalculate: boolean;
    line_item?: any;
    checkoutMetadataInput?: any;
  }) => {
    const checkout = await LocalStorageHandler.getCheckout();
    if (checkout) {
      const { data, error } = await this.apolloClientManager.updateItemRest(
        variantId,
        quantity,
        isRecalculate,
        line_item,
        checkoutMetadataInput,
        checkout
      );
      if (data) {
        await this.localStorageHandler.setCheckout(data);
        console.log("updateItemRest job in data", data);
        return { data };
      }
      if (error) {
        console.log("Error in updateItemRest", error);
        return { error };
      }
    }
  };

  updateItemsWithLineRest = async ({
    linesToAdd,
    isRecalculate = false,
    checkoutMetadataInput,
  }: {
    linesToAdd: any;
    isRecalculate: boolean;
    checkoutMetadataInput?: any;
  }) => {
    const checkout = await LocalStorageHandler.getCheckout();
    if (checkout) {
      const { data, error } =
        await this.apolloClientManager.updateItemsWithLineRest(
          linesToAdd,
          isRecalculate,
          checkoutMetadataInput,
          checkout
        );
      if (data) {
        await this.localStorageHandler.setCheckout(data);
        console.log("updateItemRest job in data", data);
        return { data };
      }
      if (error) {
        console.log("Error in updateItemRest", error);
        return { error };
      }
    }
  };

  removeItemRest = async ({
    variantId,
    updateShippingMethod,
    isRecalculate,
    line_item,
    checkoutMetadataInput,
  }: {
    variantId: string;
    updateShippingMethod?: boolean;
    isRecalculate?: boolean;
    line_item?: any;
    checkoutMetadataInput?: any;
  }) => {
    const checkout = await LocalStorageHandler.getCheckout();
    if (checkout) {
      const { data, error } = await this.apolloClientManager.removeItemRest(
        variantId,
        updateShippingMethod,
        isRecalculate,
        line_item,
        checkoutMetadataInput,
        checkout
      );
      if (data) {
        await this.localStorageHandler.setCheckout(data);
        console.log("addItemRest job in data", data);
        return { data };
      }
      if (error) {
        console.log("Error in addItemRest", error);
        return { error };
      }
    }
  };

  checkoutPaymentsInfo = async ({ checkout }: { checkout: any }) => {
    if (checkout?.token) {
      const { data, error } =
        await this.apolloClientManager.checkoutPaymentsInfo(checkout);
      if (data) {
        await this.localStorageHandler.setCheckout(data);
        console.log("checkoutPaymentsInfo job in data", data);
        return { data };
      }
      if (error) {
        console.log("Error in checkoutPaymentsInfo", error);
        return { error };
      }
    }
  };

  removeCartTwo = async ({ variantId }: { variantId: string }) => {
    let checkout = await LocalStorageHandler.getCheckout();

    if (checkout) {
      console.log("setCartItem job in if", checkout);

      const { data, error } = await this.apolloClientManager.removeCartTwo(
        variantId,
        checkout
      );
      if (error && this.onErrorListener) {
        console.log("setCartItem job in error", error);

        this.onErrorListener(error, ErrorCartTypes.SET_CART_ITEM);
        return { error };
      } else if (data) {
        console.log("setCartItem job in data", data);

        let obj = {
          ...(checkout?._W ? checkout?._W : checkout),
          availablePaymentGateways: data.availablePaymentGateways,
          availableShippingMethods: data.availableShippingMethods,
          promoCodeDiscount: data.promoCodeDiscount,
          shippingMethod: data.shippingMethod,
          lines: data.lines,
        };

        await this.localStorageHandler.setCheckout(obj);
        console.log("setCartItem job in data", data);

        return { data };
      }
    }
  };
}
