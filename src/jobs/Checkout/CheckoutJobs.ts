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
  ReOrderJobInput,
} from "./types";
import { JobsHandler } from "../JobsHandler";
import { AddressTypes } from "src";
import { getAuthToken } from "../../auth";

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
    console.log("in provideCheckout") 

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

  reOrder = async ({
    orderId,
    skipLines,
    warehouseId,
  }: ReOrderJobInput): any => {

    const checkout = await LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.reOrder(
      orderId,
      skipLines,
      warehouseId,
      checkout
    );



    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.REORDER,
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


  createCheckout = async ({
    email,
    checkoutMetadataInput,
    selectedShippingAddressId,
    selectedBillingAddressId,
    lines,
    restApiUrl
  }: CreateCheckoutJobInput): PromiseCheckoutJobRunResponse => {
    
    
    try {
      console.log('in chekcoutJob',checkoutMetadataInput);
      const jsonData = await fetch(`${restApiUrl}/rest/create_checkout/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            checkoutInput:{
              email: email,
              lines: lines,
              checkoutMetadataInput: checkoutMetadataInput,
              isRecalculate: true
          }}),
        }
      );
      if(jsonData?.ok){
        const data = await jsonData?.json();

        await this.localStorageHandler.setCheckout({
          ...data,
          selectedBillingAddressId,
          selectedShippingAddressId,
        });
        return {
          data,
        };
      }
      else{
        console.error('Create Checkout Api failed',jsonData);
        return {
          ok: jsonData?.ok,
          message: 'Something went wrong'
        }
      }
    } catch (error) {
        console.error('error while creating checkout :',error);
        return {
          dataError: error
        }
    }

  };

  setShippingAddress = async ({
    checkoutId,
    shippingAddress,
    email,
    selectedShippingAddressId,
    isRecalculate = true
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
    });
    return { data };
  };

  setShippingAddressRest = async ({
    checkoutId,
    shippingAddress,
    email,
    selectedShippingAddressId,
    restApiUrl,
    isRecalculate = true
  }: SetShippingAddressJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = await LocalStorageHandler.getCheckout();
    console.log('checkout create updatedCheckout 1',{checkout,checkoutId,email,restApiUrl});

    if (checkout && checkoutId) {
      const variables = {
        checkoutId: checkoutId,
        // email,
        shippingAddress: {
          city: shippingAddress.city,
          companyName: shippingAddress.companyName,
          country: shippingAddress?.country?.code,
          countryArea: shippingAddress.countryArea,
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          phone: shippingAddress.phone,
          postalCode: shippingAddress.postalCode,
          streetAddress1: shippingAddress.streetAddress1,
          streetAddress2: shippingAddress.streetAddress2,
        },
        billingAddress: {
          city: shippingAddress.city,
          companyName: shippingAddress.companyName,
          country: shippingAddress?.country?.code,
          countryArea: shippingAddress.countryArea,
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          phone: shippingAddress.phone,
          postalCode: shippingAddress.postalCode,
          streetAddress1: shippingAddress.streetAddress1,
          streetAddress2: shippingAddress.streetAddress2,
        },
      };

      const authToken = await getAuthToken();
      console.log('checkout create updatedCheckout 2',{token:(authToken ? `JWT ${JSON.parse(authToken!).item}` : null),email,restApiUrl});
      let headers: any = {
        "Content-Type": "application/json"
      }
      if (authToken) {
        headers = {...headers, "Authorization": `JWT ${JSON.parse(authToken!).item}`};
      }
      const dataJson = await fetch(`${restApiUrl}/rest/address_update/`,{
        method: "POST",
          headers,
          body: JSON.stringify(variables),
      })
      const data = await dataJson.json();

      console.log('checkout create updatedCheckout 3',{data,email,restApiUrl});
      if (data?.id) {
        await this.localStorageHandler.setCheckout({
          ...(checkout? checkout : {}),
          ...(data?.token ? data : {})
        });
      }
      return {
        data,
        dataError: data?.message ? {
          error:[{"message":data?.message,"field":data?.field,"code":data?.code}],
          type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS
        } : undefined
      };
    }
    console.error('Error: setShippingAddressRest checkout not found');
    return {
      data: null,
      dataError: {
        error: [{'message':'checkout not found'}],
        type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS
      }
    };
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

  setBillingAddressRest = async ({
    checkoutId,
    billingAddress,
    billingAsShipping,
    selectedBillingAddressId,
    restApiUrl
  }: SetBillingAddressJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = await LocalStorageHandler.getCheckout();
    console.log('checkout create updatedCheckout 1',{checkout,checkoutId,email,restApiUrl});

    if (checkout && checkoutId) {
      const variables = {
        checkoutId,
        // email,
        billingAddress
      };

      const authToken = await getAuthToken();
      console.log('checkout create updatedCheckout 2',{token:(authToken ? `JWT ${JSON.parse(authToken!).item}` : null),email,restApiUrl});

      await fetch(`${restApiUrl}/rest/address_update/`,{
        method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": authToken ? `JWT ${JSON.parse(authToken!).item}` : null,
          },
          body: JSON.stringify(variables),
      })
      .then((res) => res.json())
      .then(async (data) => {

        console.log('checkout create updatedCheckout 3',{data,email,restApiUrl});
        if (data?.id) {
          await this.localStorageHandler.setCheckout({
            ...(checkout ? checkout : {}),
            ...(data?.token ? data : {}),
            billingAsShipping: !!billingAsShipping,
            selectedBillingAddressId,
          });
        }
        return {
          data,
          dataError: data?.message ? {error:[{"message":data?.message,"field":data?.field,"code":data?.code}]} : null
        };
      })
      .catch((error) => {
        console.error('Error: setBillingAddressRest', error);
        return {
          data: null,
          dataError: {error}
        };
      });
    }
    console.error('Error: setBillingAddressRest checkout not found');
    return {
      data: null,
      dataError: {
        error: [{'message':'checkout not found'}],
        type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS
      }
    };
  };

  setBillingAddressWithEmail = async ({
    checkoutId,
    email,
    billingAddress,
    selectedBillingAddressId,
  }: SetBillingAddressWithEmailJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const {
      data,
      error,
    } = await this.apolloClientManager.setBillingAddressWithEmail(
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

  setBillingAddressWithEmailRest = async ({
    checkoutId,
    billingAddress,
    email,
    selectedBillingAddressId,
    restApiUrl
  }: SetBillingAddressWithEmailJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = await LocalStorageHandler.getCheckout();
    console.log('checkout create updatedCheckout 1',{checkout,checkoutId,email,restApiUrl});

    if (checkout && checkoutId) {
      const variables = {
        checkoutId,
        // email,
        billingAddress
      };

      const authToken = await getAuthToken();
      console.log('checkout create updatedCheckout 2',{token:(authToken ? `JWT ${JSON.parse(authToken!).item}` : null),email,restApiUrl});

      await fetch(`${restApiUrl}/rest/address_update/`,{
        method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": authToken ? `JWT ${JSON.parse(authToken!).item}` : null,
          },
          body: JSON.stringify(variables),
      })
      .then((res) => res.json())
      .then(async (data) => {

        console.log('checkout create updatedCheckout 3',{data,email,restApiUrl});
        if (data?.id) {
          await this.localStorageHandler.setCheckout({
            ...checkout,
            availablePaymentGateways: data?.availablePaymentGateways,
            billingAddress: data?.billingAddress,
            billingAsShipping: false,
            email: data?.email,
            selectedBillingAddressId,
          });
        }
        return {
          data,
          dataError: data?.message ? {error:[{"message":data?.message,"field":data?.field,"code":data?.code}]} : null
        };
      })
      .catch((error) => {
        console.error('Error: setBillingAddressRest', error);
        return {
          data: null,
          dataError: {error}
        };
      });
    }
    console.error('Error: setBillingAddressRest checkout not found');
    return {
      data: null,
      dataError: {
        error: [{'message':'checkout not found'}],
        type: DataErrorCheckoutTypes.SET_SHIPPING_ADDRESS
      }
    };
  };

  updateCheckoutPayment = async ({
    checkoutId,
    gatewayId,
    useCashback,
    isRecalculate,
    cashbackType
  }: PaymentMethodUpdateJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.updateCheckoutPayment(
      checkoutId,
      gatewayId,
      useCashback,
      isRecalculate,
      cashbackType
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
      shippingAddress: data?.shippingAddress
    });
    return { data };
  };

  updateCheckoutPaymentRest = async ({
    checkoutId,
    gatewayId,
    useCashback,
    isRecalculate,
    cashbackType,
    restApiUrl
  }: PaymentMethodUpdateJobInput): PromiseCheckoutJobRunResponse => {

    try {
      const resJson = await fetch(`${restApiUrl}/rest/checkout_payment_method/`,{
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            checkoutId,
            gatewayId,
            useCashback,
            isRecalculate,
            cashbackType
          }),
      });
      const res = await resJson.json();
      if(res?.message){
        return {
          dataError: {
            error: [{message: res?.message}],
            type: DataErrorCheckoutTypes.SET_SHIPPING_METHOD,
          },
        };
      }
      if(res?.id){
        setTimeout(async () => {
          const checkout = LocalStorageHandler.getCheckout();
        const updatedCheckout = {
          ...checkout,
          ...res
        }
  
        await this.localStorageHandler.setCheckout({
          ...updatedCheckout,
          promoCodeDiscount: res,
          shippingMethod: res?.shippingMethod,
          availableShippingMethods: res?.availableShippingMethods,
          shippingAddress: res?.shippingAddress
        });
        },0);
  
        return {
          data:{checkoutPaymentMethodUpdate:{checkout:updatedCheckout}}
        };
      }
      return {data: res};
      
    } catch (error) {
      console.error('error while updating checkout payment method:',error);
      return {
        dataError: {
          error,
          type: DataErrorCheckoutTypes.SET_SHIPPING_METHOD,
        },
      };
    }

  };

  setShippingMethod = async ({
    checkoutId,
    shippingMethodId,
  }: SetShippingMethodJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.setShippingMethod(
      shippingMethodId,
      checkoutId
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
  }: AddPromoCodeJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = await LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.addPromoCode(
      promoCode,
      checkoutId
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
      ...(checkout?._W ? checkout?._W : checkout),
      promoCodeDiscount: data?.promoCodeDiscount,
    });
    return { data };
  };

  addPromoCodeRest = async ({
    checkoutId,
    promoCode,
    restApiUrl
  }: AddPromoCodeJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = await LocalStorageHandler.getCheckout();

    const resData = await fetch(`${restApiUrl}/rest/add_promo_code/`,{
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({checkoutId,promoCode}),
    });
    const res = await resData.json();

    console.log('addPromoCodeRest response:', res);

    if (res?.message) {
      return {
        data: {
          errors: [res?.message],
        },
        dataError: {
          type: DataErrorCheckoutTypes.ADD_PROMO_CODE,
        },
      };
    }

    await this.localStorageHandler.setCheckout({
      ...(checkout ? checkout : {}),
      ...(res?.token ? res : {}),
    });
    return { data: res };
  };

  removePromoCode = async ({
    checkoutId,
    promoCode,
  }: RemovePromoCodeJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = await LocalStorageHandler.getCheckout();

    const { data, error } = await this.apolloClientManager.removePromoCode(
      promoCode,
      checkoutId
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
      ...(checkout?._W ? checkout?._W : checkout),
      promoCodeDiscount: data?.promoCodeDiscount,
    });
    return { data };
  };

  removePromoCodeRest = async ({
    checkoutId,
    promoCode,
    restApiUrl
  }: RemovePromoCodeJobInput): PromiseCheckoutJobRunResponse => {
    const checkout = await LocalStorageHandler.getCheckout();

    const resData = await fetch(`${restApiUrl}/rest/remove_promo_code/`,{
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({checkoutId,promoCode})
    });
    const res = await resData.json();

    if (res?.message) {
      return {
        dataError: {
          error:[{message: res?.message}],
          type: DataErrorCheckoutTypes.REMOVE_PROMO_CODE,
        },
      };
    }

    await this.localStorageHandler.setCheckout({
      ...(checkout ? checkout : {}),
      ...(res?.token ? res : {}),
    });
    return { data: res };
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
    const payment = LocalStorageHandler.getPayment();

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
