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
    console.log("setCartItem job", checkout)
    if (checkout?.timestamp) {
      checkout = checkout?.item;
    }
    if (checkout) {
      console.log("setCartItem job in if", checkout)

      const { data, error } = await this.apolloClientManager.setCartItem(
        checkout?._W ? checkout?._W : checkout
      );
      if (error && this.onErrorListener) {
        console.log("setCartItem job in error", error)


        this.onErrorListener(error, ErrorCartTypes.SET_CART_ITEM);
        return { error };

      } else if (data) {
        console.log("setCartItem job in data", data)

        let obj = {
          ...(checkout?._W ? checkout?._W : checkout),
          availablePaymentGateways: data.availablePaymentGateways,
          availableShippingMethods: data.availableShippingMethods,
          promoCodeDiscount: data.promoCodeDiscount,
          shippingMethod: data.shippingMethod,
          lines: data.lines
        };

        await this.localStorageHandler.setCheckout(obj);
        console.log("setCartItem job in data", data)

        return { data };
      }
    }
  };

  refreshCart = async () => {
    let checkout = await LocalStorageHandler.getCheckout();

    if (checkout) {
      console.log("setCartItem job in if", checkout)

      const { data, error } = await this.apolloClientManager.refreshCart(
        checkout
      );
      if (error) {
        console.log("setCartItem job in error", error)
        // this.onErrorListener(error, ErrorCartTypes.SET_CART_ITEM);
        return { error };

      } else if (data) {
        console.log("setCartItem job in data refresh", data)

        let obj = {
          ...(checkout?._W ? checkout?._W : checkout),
          availablePaymentGateways: data.availablePaymentGateways,
          availableShippingMethods: data.availableShippingMethods,
          promoCodeDiscount: data.promoCodeDiscount,
          shippingMethod: data.shippingMethod,
          lines: data.lines
        };

        await this.localStorageHandler.setCheckout(obj);
        console.log("setCartItem job in data", data)

        return { data };
      }
    }
  };

  setCartItemsTwo = async (variantArray: any) => {
    let checkout = await LocalStorageHandler.getCheckout();

    if (checkout) {
      console.log("setCartItem job in if", checkout)

      const { data, error } = await this.apolloClientManager.setCartItemsTwo(
        variantArray,
        checkout
      );
      if (error && this.onErrorListener) {
        console.log("setCartItem job in error", error)


        this.onErrorListener(error, ErrorCartTypes.SET_CART_ITEM);
        return { error };

      } else if (data) {
        console.log("setCartItem job in data", data)

        let obj = {
          ...(checkout?._W ? checkout?._W : checkout),
          availablePaymentGateways: data.availablePaymentGateways,
          availableShippingMethods: data.availableShippingMethods,
          promoCodeDiscount: data.promoCodeDiscount,
          shippingMethod: data.shippingMethod,
          lines: data.lines
        };

        await this.localStorageHandler.setCheckout(obj);
        console.log("setCartItem job in data", data)

        return { data };
      }
    }
  };

  updateCartItem = async ({ variantId, quantity }: { variantId: string, quantity: number }) => {
    let checkout = await LocalStorageHandler.getCheckout();

    if (checkout) {
      console.log("setCartItem job in if", checkout)

      const { data, error } = await this.apolloClientManager.updateCartItem(
        variantId,
        quantity,
        checkout
      );
      if (error) {
        console.log("setCartItem job in error", error)
        // this.onErrorListener(error, ErrorCartTypes.SET_CART_ITEM);
        return { error };

      } else if (data) {
        console.log("setCartItem job in data", data)

        let obj = typeof data=="object" && data.token ? {
          ...(checkout?._W ? checkout?._W : checkout),
          ...data
        } : checkout;

        await this.localStorageHandler.setCheckout(obj);
        console.log("setCartItem job in data", data)

        return { data };
      }
    }
  };

  setCartItemTwo = async ({ variantId, quantity }: { variantId: string, quantity: number }) => {
    let checkout = await LocalStorageHandler.getCheckout();

    if (checkout) {
      console.log("setCartItem job in if", checkout)

      const { data, error } = await this.apolloClientManager.setCartItemTwo(
        variantId,
        quantity,
        checkout
      );
      if (error) {
        console.log("setCartItem job in error", error)
        // this.onErrorListener(error, ErrorCartTypes.SET_CART_ITEM);
        return { error };
      } else if (data) {
        console.log("setCartItem job in data", data)

        let obj = {
          ...(checkout?._W ? checkout?._W : checkout),
          availablePaymentGateways: data.availablePaymentGateways,
          availableShippingMethods: data.availableShippingMethods,
          promoCodeDiscount: data.promoCodeDiscount,
          shippingMethod: data.shippingMethod,
          lines: data.lines
        };

        await this.localStorageHandler.setCheckout(obj);
        console.log("setCartItem job in data", data)

        return { data };
      }
    }
  };

  removeCartTwo = async ({ variantId }: { variantId: string }) => {
    let checkout = await LocalStorageHandler.getCheckout();

    if (checkout) {
      console.log("setCartItem job in if", checkout)

      const { data, error } = await this.apolloClientManager.removeCartTwo(
        variantId,
        checkout
      );
      if (error) {
        console.log("setCartItem job in error", error)
        // this.onErrorListener(error, ErrorCartTypes.SET_CART_ITEM);
        return { error };
      } else if (data) {
        console.log("setCartItem job in data", data)

        let obj = {
          ...(checkout?._W ? checkout?._W : checkout),
          availablePaymentGateways: data.availablePaymentGateways,
          availableShippingMethods: data.availableShippingMethods,
          promoCodeDiscount: data.promoCodeDiscount,
          shippingMethod: data.shippingMethod,
          lines: data.lines
        };

        await this.localStorageHandler.setCheckout(obj);
        console.log("setCartItem job in data", data)

        return { data };
      }
    }
  };

}




