/* eslint-disable @typescript-eslint/lines-between-class-members */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalStorageManager } from "../../data";
import { ErrorListener } from "../../helpers";
import { ICheckoutModel } from "../../helpers/LocalStorageHandler";
import { JobsManager } from "../../jobs";
import { ErrorCartTypes } from "../../jobs/Cart";
import { SaleorState, SaleorStateLoaded } from "../../state";
import { ISaleorStateSummeryPrices, StateItems } from "../../state/types";
import { ApolloClientManager } from "../../data/ApolloClientManager";
import { sortCheckoutLines } from "./utils";
import {
  IDiscount,
  IItems,
  IShippingPrice,
  ISubtotalPrice,
  ITotalPrice,
} from "./types";
export class SaleorCartAPI extends ErrorListener {
  loaded: boolean;
  items: IItems;
  totalPrice: ITotalPrice;
  subtotalPrice: ISubtotalPrice;
  shippingPrice: IShippingPrice;
  discount?: IDiscount;
  private apolloClientManager: ApolloClientManager;
  private jobsManager: JobsManager;
  private localStorageManager: LocalStorageManager;
  private saleorState: SaleorState;
  constructor(
    localStorageManager: LocalStorageManager,
    apolloClientManager: ApolloClientManager,
    saleorState: SaleorState,
    jobsManager: JobsManager
  ) {
    super();
    this.saleorState = saleorState;
    this.localStorageManager = localStorageManager;
    this.apolloClientManager = apolloClientManager;
    this.jobsManager = jobsManager;
    this.loaded = false;
    this.jobsManager.attachErrorListener("cart", this.fireError);

    this.items = saleorState?.checkout?.lines?.filter(
      line => line.quantity > 0
    );
    this.totalPrice = saleorState?.checkout?.totalPrice;
    this.subtotalPrice = saleorState?.checkout?.subtotalPrice;
    this.shippingPrice = saleorState?.checkout?.shippingPrice;
    this.discount = saleorState?.checkout?.discount;

    this.saleorState.subscribeToChange(
      StateItems.CHECKOUT,
      (checkout: ICheckoutModel) => {
        console.log(
          "flick stc",
          checkout?.lines,
          checkout,
          checkout?._W,
          this?.items
        );
        const checkUndefined = (lines: any) => {
          return lines?.find((line: any) => line.id === undefined);
        };
        if (checkout?._W) {
          if (checkout?._W?.lines) {
            this.items = checkout?._W?.lines?.filter(line => line.quantity > 0);
          } else {
            this.items = this.items?.filter(line => line.quantity > 0);
          }
          // .sort(sortCheckoutLines);
        } else {
          if (checkout?.lines) {
            this.items = checkout?.lines?.filter(line => line.quantity > 0);
          } else {
            this.items = this.items?.filter(line => line.quantity > 0);
          }
          // .sort(sortCheckoutLines);
        }
      }
    );
    this.saleorState.subscribeToChange(
      StateItems.SUMMARY_PRICES,
      (summaryPrices: ISaleorStateSummeryPrices) => {
        const { totalPrice, subtotalPrice, shippingPrice, discount } =
          summaryPrices || {};
        this.totalPrice = totalPrice;
        this.subtotalPrice = subtotalPrice;
        this.shippingPrice = shippingPrice;
        this.discount = discount;
      }
    );
    this.saleorState.subscribeToChange(
      StateItems.LOADED,
      (loaded: SaleorStateLoaded) => {
        this.loaded = loaded.checkout && loaded.summaryPrices;
      }
    );
  }
  getItems = () => {
    const { checkout } = this.saleorState;
    if (checkout?.lines) {
      return checkout?.lines?.filter(line => line.quantity > 0);
    }
    return [];
  };

  addItem = async (variantId: string, quantity: number) => {
    // 1. save in local storage
    // await this.localStorageManager.addItemToCart(variantId, quantity);
    // 2. save online if possible (if checkout id available)
    // if (this.saleorState.checkout?.lines) {
    //   const {
    //     data,
    //     error,
    //   } = await this.apolloClientManager.getRefreshedCheckoutLines(
    //     this.saleorState.checkout?.lines
    //   );
    //   if (error) {
    //     this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
    //   } else {
    //     const uls = this.saleorState?.checkout?.lines?.map(l => {
    //       const fd = data?.find(d => d?.id === l?.id);
    //       if(fd){
    //         return {
    //           ...fd
    //         };
    //       } else {
    //         return l;
    //       }
    //     });
    //     console.log("flick debug", this.saleorState?.checkout?.lines, data, uls);
    //     await this.localStorageManager.getHandler().setCheckout({
    //       ...(this.saleorState.checkout?._W? this.saleorState.checkout?._W: this.saleorState.checkout),
    //       lines: uls,
    //     });
    //   }
    // }
    console.log("in additem");

    if (this.saleorState.checkout?._W?.id || this.saleorState.checkout?.id) {
      console.log("in additem if");
      const { data, error } = await this.jobsManager.run(
        "cart",
        "setCartItemTwo",
        { variantId, quantity }
      );
      console.log("addItem", data, error);
      if (error) {
        console.log("in error addItem", error);
        return {
          error,
        };
      }
      console.log("in data addItem", data);

      return {
        data,
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  refreshCheckoutPayment = async () => {
    try {
      const { checkout } = this.saleorState;
      const { data, error } = await this.jobsManager.run(
        "cart",
        "checkoutPaymentsInfo",
        {
          checkout,
        }
      );
      if (data) {
        return {
          data,
        };
      }
    } catch (error) {
      console.log("Error in refreshCheckoutPayment", error);
      return {
        error,
        pending: false,
      };
    }
  };

  addItemRest = async (
    variantId: string,
    quantity: number,
    tags?: string[],
    line_item?: any,
    useDummyAddress = true,
    isRecalculate = false,
    checkoutMetadataInput?: any
  ) => {
    try {
      const { checkout } = this.saleorState;

      if (checkout?.id || checkout?._W?.id) {
        const res = await this.jobsManager.run("cart", "addItemRest", {
          variantId,
          quantity,
          tags,
          line_item,
          useDummyAddress,
          isRecalculate,
          checkoutMetadataInput,
        });
        console.log("res-addItemRest", res);
        const data = res?.data;
        const error = res?.error;
        this.jobsManager.run("cart", "checkoutPaymentsInfo", {
          checkout: data,
        });
        if (data) {
          return {
            data,
            pending: true,
          };
        }
        if (error) {
          return { error };
        }
        return res;
      }
      return {
        pending: false,
      };
    } catch (error) {
      return {
        error,
        pending: false,
      };
    }
  };

  updateItemRest = async (
    variantId: string,
    quantity: number,
    isRecalculate = false,
    line_item?: any,
    checkoutMetadataInput?: any
  ) => {
    try {
      const { checkout } = this.saleorState;

      if (checkout?.id || checkout?._W?.id) {
        const res = await this.jobsManager.run("cart", "updateItemRest", {
          variantId,
          quantity,
          isRecalculate,
          line_item,
          checkoutMetadataInput,
        });
        const data = res?.data;
        const error = res?.error;
        console.log("res-updateItemRest", res);
        this.jobsManager.run("cart", "checkoutPaymentsInfo", {
          checkout: data,
        });
        if (data) {
          return {
            data,
            pending: true,
          };
        }
        if (error) {
          return { error };
        }
        return res;
      }
      return {
        pending: false,
      };
    } catch (error) {
      return {
        error,
        pending: false,
      };
    }
  };

  updateItemsWithLineRest = async (
    linesToAdd: any,
    isRecalculate = false,
    checkoutMetadataInput?: any
  ) => {
    try {
      const { checkout } = this.saleorState;

      if (checkout?.id || checkout?._W?.id) {
        const res = await this.jobsManager.run(
          "cart",
          "updateItemsWithLineRest",
          {
            linesToAdd,
            isRecalculate,
            checkoutMetadataInput,
          }
        );
        const data = res?.data;
        const error = res?.error;
        console.log("res-updateItemsWithLineRest", res);
        this.jobsManager.run("cart", "checkoutPaymentsInfo", {
          checkout: data,
        });
        if (data) {
          return {
            data,
            pending: true,
          };
        }
        if (error) {
          return { error };
        }
        return res;
      }
      return {
        pending: false,
      };
    } catch (error) {
      return {
        error,
        pending: false,
      };
    }
  };

  removeItemRest = async (
    variantId: string,
    updateShippingMethod = true,
    isRecalculate = false,
    line_item?: any,
    checkoutMetadataInput?: any
  ) => {
    try {
      const { checkout } = this.saleorState;

      if (checkout?.id || checkout?._W?.id) {
        const { data, error } = await this.jobsManager.run(
          "cart",
          "removeItemRest",
          {
            variantId,
            updateShippingMethod,
            isRecalculate,
            line_item,
            checkoutMetadataInput,
          }
        );
        this.jobsManager.run("cart", "checkoutPaymentsInfo", {
          checkout: data,
        });
        if (data) {
          return {
            data,
            pending: true,
          };
        }
        if (error) {
          return { error };
        }
      }
      return {
        pending: false,
      };
    } catch (error) {
      return {
        error,
        pending: false,
      };
    }
  };
  setCartItem = async () => {
    console.log("in empty setCartItem");

    return {};
    // if (this.saleorState.checkout?._W?.id || this.saleorState.checkout?.id) {
    //   const { data, error } = await this.jobsManager.addToQueue("cart", "setCartItem");
    //   if (error) {
    //     console.log("in error setCartItem",error)
    //     return {
    //       error,
    //     };
    //   }
    //   console.log("in data setCartItem",data)

    //   return {
    //     data,
    //     pending: true,
    //   };
    // }
    // return {
    //   pending: false,
    // };
  };
  removeItem = async (variantId: string) => {
    // 1. save in local storage
    // this.localStorageManager.removeItemFromCart(variantId);
    // 2. save online if possible (if checkout id available)
    // if (this.saleorState.checkout?.lines) {
    //   const {
    //     data,
    //     error,
    //   } = await this.apolloClientManager.getRefreshedCheckoutLines(
    //     this.saleorState.checkout?.lines
    //   );
    //   if (error) {
    //     this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
    //   } else {
    //     const ll = data?.filter(line => this?.saleorState?.checkout?.lines?.find(l => l?.variant?.id === line?.variant?.id));
    //     await this.localStorageManager.getHandler().setCheckout({
    //       ...this.saleorState.checkout,
    //       lines: ll,
    //     });
    //   }
    // }
    if (this.saleorState.checkout?._W?.id || this.saleorState.checkout?.id) {
      console.log("in removeItem if");
      const { data, error } = await this.jobsManager.run(
        "cart",
        "removeCartTwo",
        { variantId }
      );
      console.log("removeItem", data, error);
      if (error) {
        console.log("in error removeItem", error);
        return {
          error,
        };
      }
      console.log("in data removeItem", data);

      return {
        data,
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };
  subtractItem = async (variantId: string) => {
    // 1. save in local storage
    this.localStorageManager.subtractItemFromCart(variantId);
    // 2. save online if possible (if checkout id available)
    // if (this.saleorState.checkout?.lines) {
    //   const {
    //     data,
    //     error,
    //   } = await this.apolloClientManager.getRefreshedCheckoutLines(
    //     this.saleorState.checkout?.lines
    //   );
    //   if (error) {
    //     this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
    //   } else {
    //     await this.localStorageManager.getHandler().setCheckout({
    //       ...(this.saleorState.checkout?._W? this.saleorState.checkout?._W: this.saleorState.checkout),
    //       lines: data,
    //     });
    //   }
    // }
    if (this.saleorState.checkout?._W?.id || this.saleorState.checkout?.id) {
      console.log("in subtractItem if");
      const { data, error } = await this.jobsManager.run("cart", "setCartItem");
      console.log("subtractItem", data, error);
      if (error) {
        console.log("in error subtractItem", error);
        return {
          error,
        };
      }
      console.log("in data subtractItem", data);

      return {
        data,
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };
  updateItem = async (variantId: string, quantity: number) => {
    // 1. save in local storage
    this.localStorageManager.updateItemInCart(variantId, quantity);
    // 2. save online if possible (if checkout id available)
    // if (this.saleorState.checkout?.lines) {
    //   const {
    //     data,
    //     error,
    //   } = await this.apolloClientManager.getRefreshedCheckoutLines(
    //     this.saleorState.checkout?.lines
    //   );
    //   if (error) {
    //     this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
    //   } else {
    //     await this.localStorageManager.getHandler().setCheckout({
    //       ...(this.saleorState.checkout?._W? this.saleorState.checkout?._W: this.saleorState.checkout),
    //       lines: data,
    //     });
    //   }
    // }
    if (this.saleorState.checkout?._W?.id || this.saleorState.checkout?.id) {
      console.log("in updateItem if");
      const { data, error } = await this.jobsManager.run("cart", "setCartItem");
      console.log("updateItem", data, error);
      if (error) {
        this.localStorageManager.updateItemInCart(variantId, quantity - 1);

        console.log("in error updateItem", error);
        return {
          error,
        };
      }
      console.log("in data updateItem", data);

      return {
        data,
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };
  //method to update cart with latest checkout
  updateCart = async () => {
    if (this.saleorState.checkout) {
      this.jobsManager.addToQueue("cart", "setCartItem");
    }
  };
}
