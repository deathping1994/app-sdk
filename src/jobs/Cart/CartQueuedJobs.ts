import { getAuthToken } from "../../auth";
import { ApolloClientManager } from "../../data/ApolloClientManager";
import { LocalStorageHandler } from "../../helpers/LocalStorageHandler";

import { QueuedJobsHandler } from "../QueuedJobsHandler";

export enum ErrorCartTypes {
  "SET_CART_ITEM",
}

interface addToCartProps {
  lines: [{quantity: number, variantId: string}];
  checkoutMetadataInput: {key: string, value: string}[];
  restApiUrl: string;
  checkoutId: string;
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
          lines: data.lines,
          shippingPrice: data.shippingPrice,
          subtotalPrice: data?.subtotalPrice ? data.subtotalPrice : checkout?.subtotalPrice,
          totalPrice: data?.totalPrice ? data.totalPrice : chekcout?.totalPrice
        };
        console.log("321 set cartItem",{data,obj,checkout});
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

  addToCart = async (
    {
      lines,
      checkoutMetadataInput,
      restApiUrl,
      checkoutId
    }: addToCartProps
  ) => {
    console.log('add_to_cart 4');
    // const userId = await AsyncStorage.getItem("user_id");
  
    if (checkoutId) {
      console.log("add_to_cart job in if", checkoutId);
      let obj = {
        checkoutId,
        lines: lines,
        checkoutMetadataInput: checkoutMetadataInput,
        isRecalculate: true
      };
      let header:any = {
        "Content-Type": "application/json",
      };
      const token = await getAuthToken();
      if(token) header={
        ...header,
        "Authorization": `JWT ${JSON.parse(token!).item}`
      }
  
      try {
        let jsonData = await fetch(`${restApiUrl}/rest/add_to_cart/`,
          {
            method: "POST",
            credentials: "include",
            headers: header,
            body: JSON.stringify(obj),
          }
        );
        let data =  await jsonData.json();

        if(jsonData?.ok){
          setTimeout(async () => {
            let checkout = await LocalStorageHandler.getCheckout();
            let obj = {
              ...(checkout ? checkout : {}),
              ...(data?.token ? data : {})
            };
            await this.localStorageHandler?.setCheckout(obj);
          },0);
        }
        data={...data,ok:jsonData?.ok};
        console.log("add_to_cart job in data", data);
  
        return {
          data,
          error: undefined
        };
      } catch (error) {
        console.error('error while add_to_cart',error);
      }
    }
    else{
      console.error('add_to_cart : checkout is not found');
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

  setCartItems = async (warehouseId: String) => {
    let checkout = await LocalStorageHandler.getCheckout();
    console.log('checkout verify step 3',warehouseId);
    if (checkout) {
      console.log("setCartItem job in if", checkout)

      const { data, error } = await this.apolloClientManager.setCartItems(
        warehouseId,
        checkout?.id
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

  updateCartItem = async ({ variantId, quantity, restApiUrl, checkoutId }: { variantId: string, quantity: number, restApiUrl: string, checkoutId: string }) => {

    if (checkoutId) {
      console.log("setCartItem job in if", checkoutId)
      let header:any = {
        "Content-Type": "application/json",
      };
      const token = await getAuthToken();
      if(token) header={
        ...header,
        "Authorization": `JWT ${JSON.parse(token!).item}`
      }

      let jsonData = await fetch(`${restApiUrl}/rest/update_cart/`,
          {
            method: "POST",
            credentials: "include",
            headers: header,
            body: JSON.stringify({
              checkoutId,
              lines: [{
                quantity: quantity,
                variantId: variantId
              }],
              isRecalculate: true,
              checkoutMetadataInput: []
            }),
          }
        );
        let data =  await jsonData.json();
      if (!jsonData?.ok) {
        console.log("setCartItem job in error", jsonData,data)
        // this.onErrorListener(error, ErrorCartTypes.SET_CART_ITEM);
        return { jsonData, error: [{message: data?.message}] };

      } else if (data) {
        setTimeout(async () => {
          console.log("setCartItem job in data", data);
          let checkout = await LocalStorageHandler.getCheckout();
          let obj = typeof data=="object" && data.token ? {
            ...(checkout ? checkout : {}),
            ...data
          } : {...checkout};

          await this.localStorageHandler.setCheckout(obj);
          console.log("setCartItem job in data", data);
        },0);

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

        // let obj = {
        //   ...(checkout?._W ? checkout?._W : checkout),
        //   availablePaymentGateways: data.availablePaymentGateways,
        //   availableShippingMethods: data.availableShippingMethods,
        //   promoCodeDiscount: data.promoCodeDiscount,
        //   shippingMethod: data.shippingMethod,
        //   lines: data.lines,
        // };

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

        // let obj = {
        //   ...(checkout?._W ? checkout?._W : checkout),
        //   availablePaymentGateways: data.availablePaymentGateways,
        //   availableShippingMethods: data.availableShippingMethods,
        //   promoCodeDiscount: data.promoCodeDiscount,
        //   shippingMethod: data.shippingMethod,
        //   lines: data.lines
        // };

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

}




