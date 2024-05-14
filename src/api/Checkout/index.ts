import { AddressTypes } from "src";
import { PaymentGateway } from "../../fragments/gqlTypes/PaymentGateway";
import { ErrorListener } from "../../helpers";
import {
  ICheckoutModel,
  IPaymentModel,
} from "../../helpers/LocalStorageHandler";
import { JobsManager } from "../../jobs";
import { SaleorState, SaleorStateLoaded } from "../../state";
import { StateItems } from "../../state/types";

import { PromiseRunResponse } from "../types";
import {
  DataErrorCheckoutTypes,
  FunctionErrorCheckoutTypes,
  IAddress,
  IAvailableShippingMethods,
  ICheckout,
  IPayment,
  IPromoCodeDiscount,
  CreatePaymentInput,
  CompleteCheckoutInput,
} from "./types";

type CheckoutResponse = PromiseRunResponse<
  DataErrorCheckoutTypes,
  FunctionErrorCheckoutTypes
>;

export class SaleorCheckoutAPI extends ErrorListener {
  loaded: boolean;

  checkout?: ICheckout;

  promoCodeDiscount?: IPromoCodeDiscount;

  billingAsShipping?: boolean;

  selectedShippingAddressId?: string;

  selectedBillingAddressId?: string;

  availableShippingMethods?: IAvailableShippingMethods;

  availablePaymentGateways?: PaymentGateway[];

  payment?: IPayment;

  private saleorState: SaleorState;

  private jobsManager: JobsManager;

  constructor(saleorState: SaleorState, jobsManager: JobsManager) {
    super();
    this.saleorState = saleorState;
    this.jobsManager = jobsManager;
    this.loaded = false;

    this.checkout = saleorState?.checkout || {};
    this.selectedShippingAddressId =
      saleorState?.checkout?.selectedShippingAddressId;
    this.selectedBillingAddressId =
      saleorState?.checkout?.selectedBillingAddressId;
    this.availablePaymentGateways =
      saleorState?.checkout?.availablePaymentGateways;
    this.availableShippingMethods =
      saleorState?.checkout?.availableShippingMethods;
    this.billingAsShipping = saleorState?.checkout?.billingAsShipping;
    this.promoCodeDiscount = {
      discount: saleorState?.checkout?.promoCodeDiscount?.discount,
      discountName: saleorState?.checkout?.promoCodeDiscount?.discountName,
      voucherCode: saleorState?.checkout?.promoCodeDiscount?.voucherCode,
    };

    this.saleorState.subscribeToChange(
      StateItems.CHECKOUT,
      (checkout: ICheckoutModel) => {
        console.log("checkout change event running", checkout);
        const {
          id,
          token,
          email,
          shippingAddress,
          billingAddress,
          selectedShippingAddressId,
          selectedBillingAddressId,
          billingAsShipping,
          availablePaymentGateways,
          availableShippingMethods,
          shippingMethod,
          promoCodeDiscount,
        } = checkout || {};
        this.checkout = checkout;
        this.selectedShippingAddressId = selectedShippingAddressId;
        this.selectedBillingAddressId = selectedBillingAddressId;
        this.availablePaymentGateways = availablePaymentGateways;
        this.availableShippingMethods = availableShippingMethods;
        this.billingAsShipping = billingAsShipping;
        this.promoCodeDiscount = {
          discount: promoCodeDiscount?.discount,
          discountName: promoCodeDiscount?.discountName,
          voucherCode: promoCodeDiscount?.voucherCode,
        };
      }
    );
    this.saleorState.subscribeToChange(
      StateItems.PAYMENT,
      (payment: IPaymentModel) => {
        const { id, token, gateway, creditCard, total } = payment || {};
        this.payment = {
          creditCard,
          gateway,
          id,
          token,
          total,
        };
      }
    );
    this.saleorState.subscribeToChange(
      StateItems.LOADED,
      (loaded: SaleorStateLoaded) => {
        this.loaded = loaded.checkout && loaded.payment;
      }
    );
  }

  getCheckout = () => {
    const { checkout } = this.saleorState;
    return checkout;
  };

  updateCheckoutMeta = async (metaInput: any) => {
    const { data, dataError } = await this.jobsManager.run(
      "checkout",
      "updateCheckoutMeta",
      {
        metaInput,
      }
    );

    return {
      data,
      dataError,
      pending: false,
    };
  };

  createCheckoutNew = async (
    shippingAddress: IAddress,
    email: string,
    variantId: string,
    quantity: number
  ): CheckoutResponse => {
    const alteredLines = [
      {
        quantity: quantity,
        variantId: variantId,
      },
    ];

    console.log("sdfkjndsf", alteredLines);

    const { data, dataError } = await this.jobsManager.run(
      "checkout",
      "createCheckout",
      {
        email,
        lines: alteredLines ?? [],
        selectedShippingAddressId: shippingAddress.id,
        shippingAddress,
      }
    );

    return {
      data,
      dataError,
      pending: false,
    };
  };

  createCheckoutRest = async (
    lines,
    isRecalculate = false,
    tags?: string[],
    checkoutMetadataInput?: any
  ): CheckoutResponse => {
    const { data, dataError } = await this.jobsManager.run(
      "checkout",
      "createCheckoutRest",
      {
        lines,
        isRecalculate,
        tags,
        checkoutMetadataInput,
      }
    );
    this.jobsManager.run("cart", "checkoutPaymentsInfo", {
      checkout: data,
    });

    return {
      data,
      dataError,
      pending: false,
    };
  };

  setShippingAddress = async (
    shippingAddress: IAddress,
    email: string,
    isRecalculate = true
  ): CheckoutResponse => {
    const co = this.saleorState.checkout?._W
      ? this.saleorState.checkout?._W
      : this.saleorState.checkout;
    const checkoutId = co?.id;
    const alteredLines = co?.lines?.map(item => ({
      quantity: item?.quantity,
      variantId: item?.variant?.id,
    }));
    if (alteredLines && checkoutId) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "setShippingAddress",
        {
          checkoutId,
          email,
          selectedShippingAddressId: shippingAddress.id,
          shippingAddress,
          isRecalculate,
        }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    }
    const { data, dataError } = await this.jobsManager.run(
      "checkout",
      "createCheckout",
      {
        email,
        lines: alteredLines ?? [],
        selectedShippingAddressId: shippingAddress.id,
        shippingAddress,
      }
    );

    return {
      data,
      dataError,
      pending: false,
    };
  };

  setAddressType = async (addressId: string, type: AddressTypes) => {
    const { data, dataError } = await this.jobsManager.run(
      "checkout",
      "setAddressType",
      { addressId, type }
    );

    return {
      data,
      dataError,
    };
  };

  fetchLatestCheckout = async (isUserSignedIn = false) => {
    const { data, dataError } = await this.jobsManager.run("checkout", "provideCheckout", {
      isUserSignedIn,
    });

    if (dataError) {
      return {
        error: dataError,
      };
    }
    return {
      data,
    };
  };

  setBillingAddress = async (
    billingAddress: IAddress,
    email?: string
  ): CheckoutResponse => {
    const co = this.saleorState.checkout?._W
      ? this.saleorState.checkout?._W
      : this.saleorState.checkout;
    const checkoutId = co?.id;
    const isShippingRequiredForProducts = co?.lines
      ?.filter(line => line.quantity > 0)
      .some(({ variant }) => variant.product?.productType.isShippingRequired);
    const alteredLines = co?.lines?.map(item => ({
      quantity: item!.quantity,
      variantId: item?.variant!.id,
    }));

    if (
      isShippingRequiredForProducts &&
      checkoutId &&
      this.checkout?.shippingAddress
    ) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "setBillingAddress",
        {
          billingAddress,
          billingAsShipping: false,
          checkoutId,
          selectedBillingAddressId: billingAddress.id,
        }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    }
    if (isShippingRequiredForProducts) {
      return {
        functionError: {
          error: new Error(
            "You need to set shipping address before setting billing address."
          ),
          type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
        },
        pending: false,
      };
    }
    if (!isShippingRequiredForProducts && email && checkoutId && alteredLines) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "setBillingAddressWithEmail",
        {
          billingAddress,
          checkoutId,
          email,
          selectedBillingAddressId: billingAddress.id,
        }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    }
    if (!isShippingRequiredForProducts && email && alteredLines) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "createCheckout",
        {
          billingAddress,
          email,
          lines: alteredLines,
          selectedBillingAddressId: billingAddress.id,
        }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    }
    if (!isShippingRequiredForProducts && !email) {
      return {
        functionError: {
          error: new Error(
            "You need to provide email when products do not require shipping before setting billing address."
          ),
          type: FunctionErrorCheckoutTypes.EMAIL_NOT_SET,
        },
        pending: false,
      };
    }
    return {
      functionError: {
        error: new Error(
          "You need to add items to cart before setting billing address."
        ),
        type: FunctionErrorCheckoutTypes.ITEMS_NOT_ADDED_TO_CART,
      },
      pending: false,
    };
  };

  setBillingAsShippingAddress = async (): PromiseRunResponse<
    DataErrorCheckoutTypes,
    FunctionErrorCheckoutTypes
  > => {
    const checkoutId = this.saleorState.checkout?.id;

    if (checkoutId && this.checkout?.shippingAddress) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "setBillingAddress",
        {
          billingAddress: this.checkout.shippingAddress,
          billingAsShipping: true,
          checkoutId,
          selectedBillingAddressId: this.checkout?.shippingAddress.id,
        }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    }
    return {
      functionError: {
        error: new Error(
          "You need to set shipping address before setting billing address."
        ),
        type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
      },
      pending: false,
    };
  };

  updateCheckoutPayment = async (
    gatewayId: string,
    useCashback: boolean,
    isRecalculate = true
  ): CheckoutResponse => {
    const checkoutId = this.saleorState.checkout?.id;
    if (checkoutId) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "updateCheckoutPayment",
        {
          checkoutId,
          gatewayId,
          useCashback,
          isRecalculate,
        }
      );
      console.log("dsfb", checkoutId, gatewayId, data);
      return {
        data,
        dataError,
        pending: false,
      };
    }

    return {
      functionError: {
        error: new Error("payment not updated"),
      },
      pending: false,
    };
  };

  setShippingMethod = async (
    shippingMethodId: string,
    isRecalculate = true
  ): CheckoutResponse => {
    const checkoutId = this.saleorState.checkout?.id;

    if (checkoutId) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "setShippingMethod",
        {
          checkoutId,
          shippingMethodId,
          isRecalculate,
        }
      );
      return {
        data,
        dataError,
        pending: false,
      };
    }
    return {
      functionError: {
        error: new Error(
          "You need to set shipping address before setting shipping method."
        ),
        type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
      },
      pending: false,
    };
  };

  addPromoCode = async (
    promoCode: string,
    isRecalculate = true
  ): CheckoutResponse => {
    const checkoutId = this.saleorState.checkout?.id;

    if (checkoutId) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "addPromoCode",
        {
          checkoutId,
          promoCode,
          isRecalculate,
        }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    }
    return {
      functionError: {
        error: new Error(
          "You need to set shipping address before modifying promo code."
        ),
        type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
      },
      pending: false,
    };
  };

  removePromoCode = async (
    promoCode: string,
    isRecalculate = true
  ): CheckoutResponse => {
    const checkoutId = this.saleorState.checkout?.id;

    if (checkoutId) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "removePromoCode",
        { checkoutId, promoCode, isRecalculate }
      );

      return {
        data,
        dataError,
        pending: false,
      };
    }
    return {
      functionError: {
        error: new Error(
          "You need to set shipping address before modifying promo code."
        ),
        type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
      },
      pending: false,
    };
  };

  createPayment = async (input: CreatePaymentInput): CheckoutResponse => {
    const checkoutId = this.saleorState.checkout?.id;
    const billingAddress = this.saleorState.checkout?.billingAddress;
    const amount = this.saleorState.summaryPrices?.totalPrice?.gross.amount;

    if (
      checkoutId &&
      billingAddress &&
      amount !== null &&
      amount !== undefined
    ) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "createPayment",
        {
          ...input,
          amount,
          billingAddress,
          checkoutId,
        }
      );
      return {
        data,
        dataError,
        pending: false,
      };
    }
    return {
      functionError: {
        error: new Error(
          "You need to set billing address before creating payment."
        ),
        type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
      },
      pending: false,
    };
  };

  completeCheckout = async (
    input?: CompleteCheckoutInput
  ): CheckoutResponse => {
    const co = this.saleorState.checkout?._W
      ? this.saleorState.checkout?._W
      : this.saleorState.checkout;
    const checkoutId = co?.id;
    if (checkoutId) {
      const { data, dataError } = await this.jobsManager.run(
        "checkout",
        "completeCheckout",
        { ...input, checkoutId }
      );
      console.log("xxxxxxxcheckoutcomplete-apicheckout", data);
      return {
        data,
        dataError,
        pending: false,
      };
    }
    return {
      functionError: {
        error: new Error(
          "You need to set shipping address before creating payment."
        ),
        type: FunctionErrorCheckoutTypes.SHIPPING_ADDRESS_NOT_SET,
      },
      pending: false,
    };
  };
}
