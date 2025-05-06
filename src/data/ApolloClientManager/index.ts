import { ApolloClient } from "@apollo/client";

import { AddressTypes } from "src";
import {
  UpdateCheckoutAddressType,
  UpdateCheckoutAddressTypeVariables,
} from "src/mutations/gqlTypes/UpdateCheckoutAddressType";
import {
  ConfirmAccountV2,
  ConfirmAccountV2Variables,
} from "src/mutations/gqlTypes/CreateAccountV2";
import {
  AddCheckoutLine,
  AddCheckoutLineVariables,
  AddCheckoutLine_checkoutLinesUpdate_checkout,
} from "src/mutations/gqlTypes/AddCheckoutLineMutation";
import {
  RemoveCheckoutLine,
  RemoveCheckoutLineVariables,
} from "src/mutations/gqlTypes/RemoveCheckoutLine";
import {
  UpdateCheckoutPaymentMethod,
  UpdateCheckoutPaymnetMethodVariables,
} from "src/mutations/gqlTypes/PaymentMethodUpdate";
import {
  CheckoutPaymentMethodUpdate,
  CheckoutPaymentMethodUpdateVariables,
} from "src/mutations/gqlTypes/CheckoutPaymentMethodUpdate";
import { Checkout } from "../../fragments/gqlTypes/Checkout";
import { Payment } from "../../fragments/gqlTypes/Payment";
import { User } from "../../fragments/gqlTypes/User";
import { CountryCode } from "../../gqlTypes/globalTypes";
import {
  ICheckoutAddress,
  ICheckoutModel,
  ICheckoutModelLine,
  IPaymentModel,
  LocalStorageHandler,
} from "../../helpers/LocalStorageHandler";
import * as AuthMutations from "../../mutations/auth";
import * as UserMutations from "../../mutations/user";
import * as CheckoutMutations from "../../mutations/checkout";
import * as WishlistMutations from "../../mutations/wishlist";
import * as LaundreeeMutations from "../../mutations/laundreee";
import {
  AddCheckoutPromoCode,
  AddCheckoutPromoCodeVariables,
} from "../../mutations/gqlTypes/AddCheckoutPromoCode";
import {
  CompleteCheckout,
  CompleteCheckoutVariables,
} from "../../mutations/gqlTypes/CompleteCheckout";
import {
  CreateCheckout,
  CreateCheckoutVariables,
} from "../../mutations/gqlTypes/CreateCheckout";
import {
  CreateCheckoutPayment,
  CreateCheckoutPaymentVariables,
} from "../../mutations/gqlTypes/CreateCheckoutPayment";
import {
  RemoveCheckoutPromoCode,
  RemoveCheckoutPromoCodeVariables,
} from "../../mutations/gqlTypes/RemoveCheckoutPromoCode";
import {
  RegisterAccount,
  RegisterAccountVariables,
} from "../../mutations/gqlTypes/RegisterAccount";
import {
  ResetPasswordRequest,
  ResetPasswordRequestVariables,
} from "../../mutations/gqlTypes/ResetPasswordRequest";
import {
  TokenAuth,
  TokenAuthVariables,
} from "../../mutations/gqlTypes/TokenAuth";
import {
  VerifyToken,
  VerifyTokenVariables,
} from "../../mutations/gqlTypes/VerifyToken";
import {
  RefreshToken,
  RefreshTokenVariables,
} from "../../mutations/gqlTypes/RefreshToken";
import {
  UpdateCheckoutBillingAddress,
  UpdateCheckoutBillingAddressVariables,
} from "../../mutations/gqlTypes/UpdateCheckoutBillingAddress";
import {
  UpdateCheckoutBillingAddressWithEmail,
  UpdateCheckoutBillingAddressWithEmailVariables,
} from "../../mutations/gqlTypes/UpdateCheckoutBillingAddressWithEmail";
import {
  UpdateCheckoutLine,
  UpdateCheckoutLineVariables,
} from "../../mutations/gqlTypes/UpdateCheckoutLine";
import {
  UpdateCheckoutShippingAddress,
  UpdateCheckoutShippingAddressVariables,
} from "../../mutations/gqlTypes/UpdateCheckoutShippingAddress";
import {
  UpdateCheckoutShippingMethod,
  UpdateCheckoutShippingMethodVariables,
} from "../../mutations/gqlTypes/UpdateCheckoutShippingMethod";
import * as CheckoutQueries from "../../queries/checkout";
import { CheckoutDetails } from "../../queries/gqlTypes/CheckoutDetails";
import {
  CheckoutProductVariants,
  CheckoutProductVariants_productVariants,
} from "../../queries/gqlTypes/CheckoutProductVariants";
import { UserCheckoutDetails } from "../../queries/gqlTypes/UserCheckoutDetails";
import { UserDetails } from "../../queries/gqlTypes/UserDetails";
import * as UserQueries from "../../queries/user";
import { axiosRequest, filterNotEmptyArrayItems } from "../../utils";
import {
  CreatePaymentInput,
  CompleteCheckoutInput,
  VerifySignInTokenInput,
  RefreshSignInTokenInput,
  CreatePickupInput,
  CreatePickupFrequencyInput,
} from "./types";
import {
  OTPAuthentication,
  OTPAuthenticationVariables,
} from "../../mutations/gqlTypes/OTPAuthentication";
import { Wishlist, WishlistVariables } from "../../queries/gqlTypes/Wishlist";
import { getWishlist } from "../../queries/wishlist";
import {
  wishlistAddProduct,
  wishlistAddProductVariables,
} from "../../mutations/gqlTypes/wishlistAddProduct";
import {
  wishlistRemoveProduct,
  wishlistRemoveProductVariables,
} from "../../mutations/gqlTypes/wishlistRemoveProduct";
import {
  BASE_URL_REST,
  REST_API_ENDPOINTS,
  REST_API_METHODS_TYPES,
  dummyCheckoutFields,
  getDBIdFromGraphqlId,
} from "../../consts";
import {
  garmentCategoriesQuery,
  garmentsQuery,
  servicesQuery,
} from "src/mutations/launMutations";

export class ApolloClientManager {
  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  subscribeToUserChange = (
    next: (value: User | null) => void,
    error?: (error: any) => void,
    complete?: () => void
  ) => {
    this.client
      .watchQuery<UserDetails, any>({
        fetchPolicy: "cache-and-network",
        query: UserQueries.getUserDetailsQuery,
      })
      .subscribe(value => next(value.data?.me), error, complete);
  };

  getWishlistItems = async (first: number) => {
    const { data, errors } = await this.client.query<
      Wishlist,
      WishlistVariables
    >({
      query: getWishlist,
      variables: {
        first,
      },
      fetchPolicy: "network-only",
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    return {
      data: data.wishlist,
    };
  };

  addWishlistItems = async (productId: string) => {
    const { data, errors } = await this.client.mutate<
      wishlistAddProduct,
      wishlistAddProductVariables
    >({
      mutation: WishlistMutations.WishlistAddProduct,
      variables: {
        productId,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    return {
      data: data?.WishlistAddProduct?.wishlist,
    };
  };

  removeWishlistItems = async (productId: string) => {
    const { data, errors } = await this.client.mutate<
      wishlistRemoveProduct,
      wishlistRemoveProductVariables
    >({
      mutation: WishlistMutations.WishlistRemoveProduct,
      variables: {
        productId,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    return {
      data: data?.WishlistRemoveProduct?.wishlist,
    };
  };

  getUser = async () => {
    const { data, errors } = await this.client.query<UserDetails, any>({
      fetchPolicy: "network-only",
      query: UserQueries.getUserDetailsQuery,
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    return {
      data: data?.me,
    };
  };

  registerAccount = async (
    email: string,
    password: string,
    redirectUrl: string
  ) => {
    const { data, errors } = await this.client.mutate<
      RegisterAccount,
      RegisterAccountVariables
    >({
      fetchPolicy: "no-cache",
      mutation: UserMutations.registerAccount,
      variables: {
        email,
        password,
        redirectUrl,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.accountRegister?.accountErrors.length) {
      return {
        error: data.accountRegister.accountErrors,
      };
    }
    return {
      data: {
        requiresConfirmation: data?.accountRegister?.requiresConfirmation,
      },
    };
  };

  resetPasswordRequest = async (email: string, redirectUrl: string) => {
    const { data, errors } = await this.client.mutate<
      ResetPasswordRequest,
      ResetPasswordRequestVariables
    >({
      fetchPolicy: "no-cache",
      mutation: UserMutations.resetPasswordRequest,
      variables: {
        email,
        redirectUrl,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.requestPasswordReset?.accountErrors.length) {
      return {
        error: data.requestPasswordReset.accountErrors,
      };
    }
    return {};
  };

  signIn = async (email: string, password: string) => {
    const { data, errors } = await this.client.mutate<
      TokenAuth,
      TokenAuthVariables
    >({
      fetchPolicy: "no-cache",
      mutation: AuthMutations.tokenAuthMutation,
      variables: {
        email,
        password,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.tokenCreate?.errors.length) {
      return {
        error: data.tokenCreate.errors,
      };
    }
    return {
      data: {
        csrfToken: data?.tokenCreate?.csrfToken,
        token: data?.tokenCreate?.token,
        user: data?.tokenCreate?.user,
      },
    };
  };

  confirmAccountV2 = async (otp: string, phone: string) => {
    const { data, errors } = await this.client.mutate<
      ConfirmAccountV2,
      ConfirmAccountV2Variables
    >({
      fetchPolicy: "no-cache",
      mutation: AuthMutations.CONFIRM_ACCOUNT,
      variables: {
        otp,
        phone,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.confirmAccountV2?.errors.length) {
      return {
        error: data.confirmAccountV2.errors,
      };
    }
    if (data?.confirmAccountV2?.accountErrors.length) {
      return {
        error: data.confirmAccountV2.accountErrors,
      };
    }
    return {
      data: {
        csrfToken: data?.confirmAccountV2?.csrfToken,
        token: data?.confirmAccountV2?.token,
        refreshToken: data?.confirmAccountV2?.refreshToken,
        user: data?.confirmAccountV2?.user,
      },
    };
  };

  accountUpdate = async input => {
    const { data, errors } = await this.client.mutate<any, any>({
      fetchPolicy: "no-cache",
      mutation: AuthMutations.UPDATE_ACCOUNT,
      variables: {
        input,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.accountUpdate?.accountErrors?.length) {
      return {
        error: data?.accountUpdate?.accountErrors,
      };
    }
    return {
      data: {
        user: data?.accountUpdate?.user,
      },
    };
  };

  signInMobile = async (checkoutId: any, otp: string, phone: string) => {
    const { data, errors } = await this.client.mutate<
      OTPAuthentication,
      OTPAuthenticationVariables
    >({
      fetchPolicy: "no-cache",
      mutation: AuthMutations.createOTPTokeMutation,
      variables: {
        checkoutId,
        otp,
        phone,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.CreateTokenOTP?.otpErrors.length) {
      return {
        error: data.CreateTokenOTP.otpErrors,
      };
    }
    return {
      data: {
        csrfToken: data?.CreateTokenOTP?.csrfToken,
        token: data?.CreateTokenOTP?.token,
        refreshToken: data?.CreateTokenOTP?.refreshToken,
        user: data?.CreateTokenOTP?.user,
      },
    };
  };

  loginRunner = async (storeCode: any, password: string, phone: string) => {
    const { data, errors } = await this.client.mutate<any, any>({
      fetchPolicy: "no-cache",
      mutation: AuthMutations.runnerLoginMutation,
      variables: {
        storeCode,
        password,
        phone,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.runnerLogin?.runnerErrors?.length) {
      return {
        error: data.runnerLogin.runnerErrors,
      };
    }
    return {
      data: {
        csrfToken: data?.runnerLogin?.csrfToken,
        token: data?.runnerLogin?.accessToken,
        refreshToken: data?.runnerLogin?.refreshToken,
        // user: data?.runnerLogin?.user,
      },
    };
  };

  attachStoreToCustomer = async (input: any) => {
    const { data, errors } = await this.client.mutate<any, any>({
      fetchPolicy: "no-cache",
      mutation: AuthMutations.attachStoreToCustomerMutation,
      variables: {
        input,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.attachStore?.attachStoreError?.length) {
      return {
        error: data.attachStore.attachStoreError,
      };
    }
    return {
      data: {
        user: data?.attachStore?.user,
        message: data?.attachStore?.message,
      },
    };
  };

  signOut = async () => {
    await this.client.resetStore();
  };

  verifySignInToken = async ({ token }: VerifySignInTokenInput) => {
    const { data, errors } = await this.client.mutate<
      VerifyToken,
      VerifyTokenVariables
    >({
      fetchPolicy: "no-cache",
      mutation: AuthMutations.tokenVeryficationMutation,
      variables: {
        token,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.tokenVerify?.errors.length) {
      return {
        error: data.tokenVerify.errors,
      };
    }
    return {
      data: {
        isValid: data?.tokenVerify?.isValid,
        payload: data?.tokenVerify?.payload,
        user: data?.tokenVerify?.user,
      },
    };
  };

  refreshSignInToken = async ({
    csrfToken,
    refreshToken,
  }: RefreshSignInTokenInput) => {
    const { data, errors } = await this.client.mutate<
      RefreshToken,
      RefreshTokenVariables
    >({
      fetchPolicy: "no-cache",
      mutation: AuthMutations.tokenRefreshMutation,
      variables: {
        csrfToken,
        refreshToken,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.tokenRefresh?.errors.length) {
      return {
        error: data.tokenRefresh.errors,
      };
    }
    return {
      data: {
        token: data?.tokenRefresh?.token,
        user: data?.tokenRefresh?.user,
      },
    };
  };

  updateCheckoutMeta = async (checkout: any, metaInput: any) => {
    try {
      if (checkout?.id && metaInput) {
        const variables = {
          checkoutId: checkout?.id,
          input: metaInput,
        };
        const { data, errors } = await this.client.mutate<any, any>({
          fetchPolicy: "no-cache",
          mutation: CheckoutMutations.updateCheckoutMetaData,
          variables,
        });
        if (data) {
          const latestCheckoutMetadata = data?.updateMetadata?.item?.metadata;
          const updatedCheckout = {
            ...checkout,
            metadata: latestCheckoutMetadata,
          };
          return {
            data: this.constructCheckoutModel(updatedCheckout),
          };
        }
        if (errors?.length) {
          return {
            error: errors,
          };
        }
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  getCheckout = async (
    isUserSignedIn: boolean,
    checkoutToken: string | null
  ) => {
    let checkout: Checkout | null;
    try {
      console.log("in getCheckout");
      checkout = await new Promise((resolve, reject) => {
        if (isUserSignedIn) {
          const observable = this.client.watchQuery<UserCheckoutDetails, any>({
            fetchPolicy: "network-only",
            query: CheckoutQueries.userCheckoutDetails,
          });
          observable.subscribe(
            result => {
              const { data, errors } = result;
              if (errors?.length) {
                reject(errors);
              } else {
                resolve(data.me?.checkout);
              }
            },
            error => {
              reject(error);
            }
          );
        } else if (checkoutToken) {
          const observable = this.client.watchQuery<CheckoutDetails, any>({
            fetchPolicy: "network-only",
            query: CheckoutQueries.checkoutDetails,
            variables: {
              token: checkoutToken,
            },
          });
          observable.subscribe(
            result => {
              const { data, errors } = result;
              if (errors?.length) {
                reject(errors);
              } else {
                resolve(data.checkout);
              }
            },
            error => {
              reject(error);
            }
          );
        } else {
          resolve(null);
        }
      });

      if (checkout) {
        return {
          data: this.constructCheckoutModel(checkout),
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
    return {};
  };

  getRefreshedCheckoutLines = async (
    checkoutlines: ICheckoutModelLine[] | null
  ) => {
    const idsOfMissingVariants = checkoutlines
      ?.filter(line => !line.variant || !line.totalPrice)
      .map(line => line.variant.id);
    const linesWithProperVariant =
      checkoutlines?.filter(line => line.variant && line.totalPrice) || [];

    let variants: CheckoutProductVariants_productVariants | null | undefined;
    if (idsOfMissingVariants && idsOfMissingVariants.length) {
      try {
        const observable = this.client.watchQuery<CheckoutProductVariants, any>(
          {
            query: CheckoutQueries.checkoutProductVariants,
            variables: {
              ids: idsOfMissingVariants,
            },
          }
        );
        variants = await new Promise((resolve, reject) => {
          observable.subscribe(
            result => {
              const { data, errors } = result;
              if (errors?.length) {
                reject(errors);
              } else {
                resolve(data.productVariants);
              }
            },
            error => {
              reject(error);
            }
          );
        });
      } catch (error) {
        return {
          error,
        };
      }
    }

    const linesWithMissingVariantUpdated = variants
      ? variants.edges.map(edge => {
          const existingLine = checkoutlines?.find(
            line => line.variant.id === edge.node.id
          );
          const variantPricing = edge.node.pricing?.price;
          const totalPrice = variantPricing
            ? {
                gross: {
                  ...variantPricing.gross,
                  amount:
                    variantPricing.gross.amount * (existingLine?.quantity || 0),
                },
                net: {
                  ...variantPricing.net,
                  amount:
                    variantPricing.net.amount * (existingLine?.quantity || 0),
                },
              }
            : null;

          return {
            id: existingLine?.variant?.id,
            quantity: existingLine?.quantity || 0,
            totalPrice,
            variant: {
              attributes: edge.node.attributes,
              id: edge.node.id,
              isAvailable: edge.node.isAvailable,
              name: edge.node.name,
              pricing: edge.node.pricing,
              product: edge.node.product,
              quantityAvailable: edge.node.quantityAvailable,
              metadata: edge?.node?.metadata,
              sku: edge.node.sku,
            },
          };
        })
      : [];

    const linesWithProperVariantUpdated = linesWithProperVariant.map(line => {
      const variantPricing = line.variant.pricing?.price;
      const totalPrice = variantPricing
        ? {
            gross: {
              ...variantPricing.gross,
              amount: variantPricing.gross.amount * line.quantity,
            },
            net: {
              ...variantPricing.net,
              amount: variantPricing.net.amount * line.quantity,
            },
          }
        : null;

      return {
        id: line.id,
        quantity: line.quantity,
        totalPrice,
        variant: line.variant,
      };
    });

    return {
      data: [
        ...linesWithMissingVariantUpdated,
        ...linesWithProperVariantUpdated,
      ],
    };
  };

  createCheckout = async (input: any) => {
    try {
      const variables = {
        checkoutInput: input,
      };
      const { data, errors } = await this.client.mutate<
        CreateCheckout,
        CreateCheckoutVariables
      >({
        mutation: CheckoutMutations.createCheckoutMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutCreate?.errors.length) {
        return {
          error: data?.checkoutCreate?.errors,
        };
      }
      if (data?.checkoutCreate?.checkout) {
        return {
          data: data?.checkoutCreate?.checkout,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
    return {};
  };

  getCustomerCheckouts = async (customerId: string) => {
    console.log("customerId-getCustomerCheckouts", customerId);
    if (customerId) {
      const { data, errors } = await this.client.query<any, any>({
        fetchPolicy: "network-only",
        query: CheckoutQueries.customerCheckouts,
        variables: {
          first: 1,
          filter: {
            customerId: [customerId],
          },
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      return {
        data: data?.customers?.edges?.[0]?.node?.checkout,
      };
    }
  };

  getCustomerCarts = async (customerId: string) => {
    console.log("customerId-getCustomerCart", customerId);
    if (customerId) {
      const { data, errors } = await this.client.query<any, any>({
        fetchPolicy: "network-only",
        query: CheckoutQueries.customerCarts,
        variables: {
          first: 1,
          filter: {
            customerId: [customerId],
          },
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      return {
        data: data?.customers?.edges?.[0]?.node?.cart,
      };
    }
  };

  getCustomerCheckoutsWithDetails = async (customerId: string) => {
    console.log("customerId-getCustomerCheckoutsWithDetails", customerId);
    if (customerId) {
      const { data, errors } = await this.client.query<any, any>({
        fetchPolicy: "network-only",
        query: CheckoutQueries.customerCheckoutsWithDetails,
        variables: {
          first: 1,
          filter: {
            customerId: [customerId],
          },
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      return {
        data: data?.customers?.edges?.[0]?.node?.checkout,
      };
    }
  };

  getCustomerCheckoutByToken = async (token: string) => {
    console.log("checkoutId-getCustomerCheckoutByToken", token);
    if (token) {
      const { data, errors } = await this.client.query<any, any>({
        fetchPolicy: "network-only",
        query: CheckoutQueries.customerCheckoutByToken,
        variables: {
          token,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      return {
        data: data?.checkout,
      };
    }
  };

  checkoutLineUpdate = async (checkoutId: string, lines: any[]) => {
    const { data, errors } = await this.client.mutate<any, any>({
      fetchPolicy: "no-cache",
      mutation: CheckoutMutations.updateCheckoutLineMutation,
      variables: {
        checkoutId,
        lines,
      },
    });

    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.checkoutLinesUpdate?.checkoutErrors?.length) {
      return {
        error: data?.checkoutLinesUpdate?.checkoutErrors,
      };
    }
    return {
      data: data?.checkoutLinesUpdate?.checkout,
    };
  };

  checkoutLineAdd = async (checkoutId: string, lines: any[]) => {
    const { data, errors } = await this.client.mutate<any, any>({
      fetchPolicy: "no-cache",
      mutation: CheckoutMutations.addCheckoutLineMutation,
      variables: {
        checkoutId,
        lines,
      },
    });
    if (errors?.length) {
      return {
        error: errors,
      };
    }
    if (data?.checkoutLinesAdd?.checkoutErrors?.length) {
      return {
        error: data?.checkoutLinesAdd?.checkoutErrors,
      };
    }
    return {
      data: data?.checkoutLinesAdd?.checkout,
    };
  };

  createCheckoutRest = async (
    lines?: any,
    isRecalculate: boolean,
    tags?: string[],
    checkoutMetadataInput?: any
  ) => {
    try {
      const fullUrl = `${BASE_URL_REST}${REST_API_ENDPOINTS.CREATE_CHECKOUT}`;
      const createCheckoutInput = {
        checkoutInput: {
          isRecalculate,
          lines: lines || [],
          email: "dummy@dummy.com",
          tags: tags || [],
          ...(checkoutMetadataInput
            ? { checkoutMetadataInput: checkoutMetadataInput }
            : {}),
        },
      };
      const res = await axiosRequest(
        fullUrl,
        REST_API_METHODS_TYPES.POST,
        createCheckoutInput
      );
      if (res?.axiosError) {
        return {
          error: res?.axiosError,
        };
      }
      const createCheckoutRes = res?.data;
      const updatedCheckout = {
        ...dummyCheckoutFields,
        ...createCheckoutRes,
      };
      if (res?.data?.errors) {
        return {
          error: res?.data?.errors,
        };
      }
      if (res?.data?.errors?.length) {
        return {
          error: res?.data?.errors,
        };
      }
      if (updatedCheckout) {
        return {
          data: this.constructCheckoutModel(updatedCheckout),
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
    return {};
  };

  setCartItem = async (checkout: ICheckoutModel) => {
    const checkoutId = checkout.id;
    const { lines } = checkout;

    if (checkoutId && lines) {
      const alteredLines = lines.map(line => ({
        quantity: line.quantity,
        variantId: line.variant.id,
      }));

      try {
        const { data, errors } = await this.client.mutate<
          UpdateCheckoutLine,
          UpdateCheckoutLineVariables
        >({
          mutation: CheckoutMutations.updateCheckoutLineMutation,
          variables: {
            checkoutId,
            lines: alteredLines,
          },
        });

        if (errors?.length) {
          return {
            error: errors,
          };
        }
        if (data?.checkoutLinesUpdate?.errors.length) {
          return {
            error: data?.checkoutLinesUpdate?.errors,
          };
        }
        if (data?.checkoutLinesUpdate?.checkout) {
          return {
            data: this.constructCheckoutModel(
              data.checkoutLinesUpdate.checkout
            ),
          };
        }
      } catch (error) {
        return {
          error,
        };
      }
    }
    return {};
  };

  setCartItemTwo = async (
    variantId: string,
    quantity: number,
    checkout: ICheckoutModel
  ) => {
    const checkoutId = checkout.id;
    const lines = [
      {
        variantId,
        quantity,
      },
    ];
    if (checkoutId) {
      try {
        const { data, errors } = await this.client.mutate<
          AddCheckoutLine,
          AddCheckoutLineVariables
        >({
          mutation: CheckoutMutations.ADD_CHECKOUT_LINE_MUTATION,
          variables: {
            checkoutId,
            lines,
          },
        });

        if (errors?.length) {
          return {
            error: errors,
          };
        }
        if (data?.checkoutLinesAdd?.errors.length) {
          return {
            error: data?.checkoutLinesAdd?.errors,
          };
        }
        if (data?.checkoutLinesAdd?.checkout) {
          return {
            data: this.constructCheckoutModel(data.checkoutLinesAdd.checkout),
          };
        }
      } catch (error) {
        return {
          error,
        };
      }
    }
    return {};
  };

  addItemRest = async (
    variantId: string,
    quantity: number,
    prevQuantity: number,
    updateShippingMethod: boolean = true,
    isRecalculate = false,
    line_item?: any,
    checkoutMetadataInput?: any,
    checkout?: any
  ) => {
    console.log("initialCheckout-LocalStorageHandler", checkout);
    if (checkout?.id || checkout?._W?.id) {
      try {
        const dbVariantId = getDBIdFromGraphqlId(variantId, "ProductVariant");
        const input = {
          checkoutId: checkout?.token,
          lines: [
            {
              quantity,
              variantId: String(dbVariantId),
            },
          ],
          isRecalculate,
          ...(checkoutMetadataInput
            ? { checkoutMetadataInput: checkoutMetadataInput }
            : {}),
        };
        const fullUrl = `${BASE_URL_REST}${REST_API_ENDPOINTS.ADD_TO_CART}`;
        const res = await axiosRequest(
          fullUrl,
          REST_API_METHODS_TYPES.POST,
          input
        );
        if (res?.axiosError) {
          return {
            error: res?.axiosError,
          };
        }
        if (res?.data?.errors?.length) {
          return {
            errors: res?.data?.errors,
          };
        }
        if (res?.data?.token) {
          const updatedLines = res?.data?.lines.map((line: any) => {
            const productData = {
              ...line.variant.product,
              metadata: line?.variant?.product?.metadata || [],
              tags: line?.variant?.product?.tags?.map((tagname: string) => ({
                name: tagname,
                __typename: "TagType",
              })),
            };
            const quantityAvailableValue =
              line?.variant?.id === variantId &&
              line_item?.variant?.quantityAvailable
                ? line_item?.variant?.quantityAvailable
                : line.variant.quantityAvailable || 50;

            const updatedLineVariantAttributes = line?.variant?.attributes?.map(
              (item: any) => {
                return {
                  ...item,
                  values: item.values?.map((valueItem: any) => ({
                    ...valueItem,
                    value: valueItem.value || valueItem.name,
                  })),
                };
              }
            );
            const lineWithProduct = {
              ...line,
              variant: {
                ...line.variant,
                attributes: updatedLineVariantAttributes,
                product: productData,
                quantityAvailable: quantityAvailableValue,
              },
            };
            return lineWithProduct;
          });
          const updatedCheckout = {
            ...checkout,
            ...res.data,
            lines: updatedLines,
          };

          console.log("@@@@@@updatedCheckout", updatedCheckout);

          if (updatedCheckout) {
            return {
              data: this.constructCheckoutModel(updatedCheckout),
            };
          }
        }
      } catch (error) {
        return {
          error,
        };
      }
    }
    return {};
  };

  updateItemRest = async (
    variantId: string,
    quantity: number,
    isRecalculate = false,
    line_item?: any,
    checkoutMetadataInput?: any,
    checkout?: any
  ) => {
    console.log("initialCheckout-LocalStorageHandler-updateItemRest", checkout);
    if (checkout?.id || checkout?._W?.id) {
      try {
        const dbVariantId = getDBIdFromGraphqlId(variantId, "ProductVariant");
        if (dbVariantId && quantity) {
          const input = {
            checkoutId: checkout?.token,
            lines: [
              {
                quantity,
                variantId: String(dbVariantId),
              },
            ],
            isRecalculate,
            ...(checkoutMetadataInput
              ? { checkoutMetadataInput: checkoutMetadataInput }
              : {}),
          };
          const fullUrl = `${BASE_URL_REST}${REST_API_ENDPOINTS.UPDATE_CART}`;
          const res = await axiosRequest(
            fullUrl,
            REST_API_METHODS_TYPES.POST,
            input
          );
          if (res?.axiosError) {
            return {
              error: res?.axiosError,
            };
          }
          if (res?.data?.errors?.length) {
            return {
              errors: res?.data?.errors,
            };
          }

          if (res?.data?.token) {
            const updatedLines = res?.data?.lines.map((line: any) => {
              const productData = {
                ...line.variant.product,
                metadata: line?.variant?.product?.metadata || [],
                tags: line?.variant?.product?.tags?.map((tagname: string) => ({
                  name: tagname,
                  __typename: "TagType",
                })),
              };
              const quantityAvailableValue =
                line?.variant?.id === variantId &&
                line_item?.variant?.quantityAvailable
                  ? line_item?.variant?.quantityAvailable
                  : line.variant.quantityAvailable || 50;

              const updatedLineVariantAttributes =
                line?.variant?.attributes?.map((item: any) => {
                  return {
                    ...item,
                    values: item.values?.map((valueItem: any) => ({
                      ...valueItem,
                      value: valueItem.value || valueItem.name,
                    })),
                  };
                });

              const lineWithProduct = {
                ...line,
                variant: {
                  ...line.variant,
                  attributes: updatedLineVariantAttributes,
                  product: productData,
                  quantityAvailable: quantityAvailableValue,
                },
              };
              return lineWithProduct;
            });
            const updatedCheckout = {
              ...checkout,
              ...res.data,
              lines: updatedLines,
            };

            console.log("@@@@@@updatedCheckout", updatedCheckout);

            if (updatedCheckout) {
              return {
                data: this.constructCheckoutModel(updatedCheckout),
              };
            }
          }
        }
      } catch (error) {
        return {
          error,
        };
      }
    }
    return {};
  };

  updateItemsWithLineRest = async (
    linesToAdd: any,
    isRecalculate = false,
    checkoutMetadataInput?: any,
    checkout?: any
  ) => {
    console.log(
      "initialCheckout-LocalStorageHandler-updateItemsWithLineRest",
      checkout
    );
    if (checkout?.id || checkout?._W?.id) {
      try {
        if (linesToAdd) {
          const input = {
            checkoutId: checkout?.token,
            lines: linesToAdd,
            isRecalculate,
            ...(checkoutMetadataInput
              ? { checkoutMetadataInput: checkoutMetadataInput }
              : {}),
          };

          const fullUrl = `${BASE_URL_REST}${REST_API_ENDPOINTS.UPDATE_CART}`;
          const res = await axiosRequest(
            fullUrl,
            REST_API_METHODS_TYPES.POST,
            input
          );
          if (res?.axiosError) {
            return {
              error: res?.axiosError,
            };
          }
          if (res?.data?.errors?.length) {
            return {
              errors: res?.data?.errors,
            };
          }

          if (res?.data?.token) {
            const updatedLines = res?.data?.lines.map((line: any) => {
              const productData = {
                ...line.variant.product,
                metadata: line?.variant?.product?.metadata || [],
                tags: line?.variant?.product?.tags?.map((tagname: string) => ({
                  name: tagname,
                  __typename: "TagType",
                })),
              };
              const quantityAvailableValue =
                line.variant.quantityAvailable || 50;

              const updatedLineVariantAttributes =
                line?.variant?.attributes?.map((item: any) => {
                  return {
                    ...item,
                    values: item.values?.map((valueItem: any) => ({
                      ...valueItem,
                      value: valueItem.value || valueItem.name,
                    })),
                  };
                });

              const lineWithProduct = {
                ...line,
                variant: {
                  ...line.variant,
                  attributes: updatedLineVariantAttributes,
                  product: productData,
                  quantityAvailable: quantityAvailableValue,
                },
              };
              return lineWithProduct;
            });
            const updatedCheckout = {
              ...checkout,
              ...res.data,
              lines: updatedLines,
            };

            console.log("@@@@@@updatedCheckout", updatedCheckout);

            if (updatedCheckout) {
              return {
                data: this.constructCheckoutModel(updatedCheckout),
              };
            }
          }
        }
      } catch (error) {
        return {
          error,
        };
      }
    }
    return {};
  };

  removeItemRest = async (
    variantId: string,
    updateShippingMethod = true,
    isRecalculate = false,
    line_item?: any,
    checkoutMetadataInput?: any,
    checkout?: any
  ) => {
    console.log("initialCheckout-LocalStorageHandler-removeItemRest", checkout);
    if (checkout?.id || checkout?._W?.id) {
      try {
        const dbVariantId = getDBIdFromGraphqlId(variantId, "ProductVariant");
        if (dbVariantId) {
          const input = {
            checkoutId: checkout?.token,
            lines: [
              {
                quantity: 0,
                variantId: String(dbVariantId),
              },
            ],
            isRecalculate,
            ...(checkoutMetadataInput
              ? { checkoutMetadataInput: checkoutMetadataInput }
              : {}),
          };
          const fullUrl = `${BASE_URL_REST}${REST_API_ENDPOINTS.UPDATE_CART}`;
          const res = await axiosRequest(
            fullUrl,
            REST_API_METHODS_TYPES.POST,
            input
          );
          if (res?.axiosError) {
            return {
              error: res?.axiosError,
            };
          }
          if (res?.data?.errors?.length || !res?.data?.token) {
            return {
              errors: res?.data?.errors,
            };
          }
          const updatedLines = res?.data?.lines.map((line: any) => {
            const productData = {
              ...line.variant.product,
              metadata: line?.variant?.product?.metadata || [],
              tags: line?.variant?.product?.tags?.map((tagname: string) => ({
                name: tagname,
                __typename: "TagType",
              })),
            };

            const updatedLineVariantAttributes = line?.variant?.attributes?.map(
              (item: any) => {
                return {
                  ...item,
                  values: item.values?.map((valueItem: any) => ({
                    ...valueItem,
                    value: valueItem.value || valueItem.name,
                  })),
                };
              }
            );
            const lineWithProduct = {
              ...line,
              variant: {
                ...line.variant,
                attributes: updatedLineVariantAttributes,
                product: productData,
                quantityAvailable: line_item?.variant?.quantityAvailable || 50,
              },
            };
            return lineWithProduct;
          });
          const updatedCheckout = {
            ...checkout,
            ...res.data,
            lines: updatedLines,
          };
          console.log("@@@@@@updatedCheckout", updatedCheckout);

          if (updatedCheckout) {
            return {
              data: this.constructCheckoutModel(updatedCheckout),
            };
          }
        }
      } catch (error) {
        return {
          error,
        };
      }
    }
    return {};
  };

  checkoutPaymentsInfo = async (checkout: ICheckoutModel) => {
    const checkoutId = checkout.id;
    if (checkoutId) {
      try {
        const { data, errors } = await this.client.query<any, any>({
          query: CheckoutMutations.CHECKOUT_PAYMENTS,
          fetchPolicy: "no-cache",
          variables: {
            token: checkout?.token,
          },
        });
        console.log("resssssssssssscheckoutPaymentsInfo", data);
        if (data?.checkout?.token) {
          const updatedCheckoutDetails = {
            ...checkout,
            ...data.checkout,
          };
          return {
            data: this.constructCheckoutModel(updatedCheckoutDetails),
          };
        }
        if (errors) {
          return { errors };
        }
      } catch (error) {}
    }
    return {};
  };

  removeCartTwo = async (variantId: string, checkout: ICheckoutModel) => {
    const checkoutId = checkout.id;
    const { lines } = checkout;

    const line = lines?.find(line => line.variant.id === variantId);
    const lineId = line?.id;

    if (checkoutId && lineId) {
      try {
        const { data, errors } = await this.client.mutate<
          RemoveCheckoutLine,
          RemoveCheckoutLineVariables
        >({
          mutation: CheckoutMutations.REMOVE_CHECKOUT_LINE_MUTATION,
          variables: {
            checkoutId,
            lineId,
          },
        });

        if (errors?.length) {
          return {
            error: errors,
          };
        }
        if (data?.checkoutLineDelete?.errors.length) {
          return {
            error: data?.checkoutLineDelete?.errors,
          };
        }
        if (data?.checkoutLineDelete?.checkout) {
          return {
            data: this.constructCheckoutModel(
              data?.checkoutLineDelete?.checkout
            ),
          };
        }
      } catch (error) {
        return {
          error,
        };
      }
    }
    return {};
  };

  setShippingAddress = async (
    shippingAddress: ICheckoutAddress,
    email: string,
    checkoutId: string,
    isRecalculate = true
  ) => {
    try {
      const variables = {
        checkoutId,
        email,
        isRecalculate,
        shippingAddress: {
          city: shippingAddress.city,
          companyName: shippingAddress.companyName,
          country:
            CountryCode[
              shippingAddress?.country?.code as keyof typeof CountryCode
            ],
          countryArea: shippingAddress.countryArea,
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          phone: shippingAddress.phone,
          postalCode: shippingAddress.postalCode,
          streetAddress1: shippingAddress.streetAddress1,
          streetAddress2: shippingAddress.streetAddress2,
        },
      };
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutShippingAddress,
        UpdateCheckoutShippingAddressVariables
      >({
        mutation: CheckoutMutations.updateCheckoutShippingAddressMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      // if (data?.checkoutEmailUpdate?.errors.length) {
      //   return {
      //     error: data?.checkoutEmailUpdate?.errors,
      //   };
      // }
      if (data?.checkoutShippingAddressUpdate?.errors.length) {
        return {
          error: data?.checkoutShippingAddressUpdate?.errors,
        };
      }
      if (data?.checkoutShippingAddressUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel(
            data.checkoutShippingAddressUpdate.checkout
          ),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  setAddressType = async (addressId: string, type: AddressTypes) => {
    try {
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutAddressType,
        UpdateCheckoutAddressTypeVariables
      >({
        mutation: CheckoutMutations.updateCheckoutAddressType,
        variables: { addressId, type },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (
        data?.addressTypeUpdate?.addressLink?.id &&
        data?.addressTypeUpdate?.addressLink?.type
      ) {
        return { data };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  getCMSBlocks = async (group?: string) => {
    try {
      const { data, errors } = await this.client.query<any, any>({
        query: AuthMutations.cmsBlockQuery,
        fetchPolicy: "no-cache",
        variables: {
          filter: group
            ? {
                group,
              }
            : {},
        },
      });
      console.log("cmsblockquery", data);
      if (data?.cmsBlocks?.edges) {
        return {
          data: data?.cmsBlocks?.edges,
        };
      }
      if (errors) {
        return { errors };
      }
    } catch (error) {}
  };

  setBillingAddress = async (
    billingAddress: ICheckoutAddress,
    checkoutId: string
  ) => {
    try {
      const variables = {
        billingAddress: {
          city: billingAddress.city,
          companyName: billingAddress.companyName,
          country:
            CountryCode[
              billingAddress?.country?.code as keyof typeof CountryCode
            ],
          countryArea: billingAddress.countryArea,
          firstName: billingAddress.firstName,
          lastName: billingAddress.lastName,
          phone: billingAddress.phone,
          postalCode: billingAddress.postalCode,
          streetAddress1: billingAddress.streetAddress1,
          streetAddress2: billingAddress.streetAddress2,
        },
        checkoutId,
      };
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutBillingAddress,
        UpdateCheckoutBillingAddressVariables
      >({
        mutation: CheckoutMutations.updateCheckoutBillingAddressMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutBillingAddressUpdate?.errors.length) {
        return {
          error: data?.checkoutBillingAddressUpdate?.errors,
        };
      }
      if (data?.checkoutBillingAddressUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel(
            data.checkoutBillingAddressUpdate.checkout
          ),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  setBillingAddressWithEmail = async (
    billingAddress: ICheckoutAddress,
    email: string,
    checkoutId: string
  ) => {
    try {
      const variables = {
        billingAddress: {
          city: billingAddress.city,
          companyName: billingAddress.companyName,
          country:
            CountryCode[
              billingAddress?.country?.code as keyof typeof CountryCode
            ],
          countryArea: billingAddress.countryArea,
          firstName: billingAddress.firstName,
          lastName: billingAddress.lastName,
          phone: billingAddress.phone,
          postalCode: billingAddress.postalCode,
          streetAddress1: billingAddress.streetAddress1,
          streetAddress2: billingAddress.streetAddress2,
        },
        checkoutId,
        email,
      };
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutBillingAddressWithEmail,
        UpdateCheckoutBillingAddressWithEmailVariables
      >({
        mutation:
          CheckoutMutations.updateCheckoutBillingAddressWithEmailMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutEmailUpdate?.errors.length) {
        return {
          error: data?.checkoutEmailUpdate?.errors,
        };
      }
      if (data?.checkoutBillingAddressUpdate?.errors.length) {
        return {
          error: data?.checkoutBillingAddressUpdate?.errors,
        };
      }
      if (data?.checkoutBillingAddressUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel(
            data.checkoutBillingAddressUpdate.checkout
          ),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  updateCheckoutPayment = async (
    checkoutId: string,
    gatewayId: string,
    useCashback: boolean,
    isRecalculate = true
  ) => {
    try {
      const { data, errors } = await this.client.mutate<
        CheckoutPaymentMethodUpdate,
        CheckoutPaymentMethodUpdateVariables
      >({
        mutation: CheckoutMutations.updateCheckoutPaymentMethodMutation,
        variables: {
          checkoutId,
          gatewayId,
          useCashback,
          isRecalculate,
        },
      });
      console.log("dsfbdsfd", data);

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.checkoutPaymentMethodUpdate?.errors.length) {
        return {
          error: data?.checkoutPaymentMethodUpdate?.errors,
        };
      }
      if (data?.checkoutPaymentMethodUpdate?.checkout) {
        return {
          data: data.checkoutPaymentMethodUpdate.checkout,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  setShippingMethod = async (
    shippingMethodId: string,
    checkoutId: string,
    isRecalculate = true
  ) => {
    try {
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutShippingMethod,
        UpdateCheckoutShippingMethodVariables
      >({
        mutation: CheckoutMutations.updateCheckoutShippingMethodMutation,
        variables: {
          checkoutId,
          shippingMethodId,
          isRecalculate,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutShippingMethodUpdate?.errors?.length) {
        return {
          error: data?.checkoutShippingMethodUpdate?.errors,
        };
      }
      if (data?.checkoutShippingMethodUpdate?.checkout) {
        return {
          data: data.checkoutShippingMethodUpdate.checkout,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  addPromoCode = async (
    promoCode: string,
    checkoutId: string,
    isRecalculate = true
  ) => {
    try {
      const { data, errors } = await this.client.mutate<
        AddCheckoutPromoCode,
        AddCheckoutPromoCodeVariables
      >({
        mutation: CheckoutMutations.addCheckoutPromoCode,
        variables: { checkoutId, promoCode, isRecalculate },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutAddPromoCode?.errors.length) {
        return {
          error: data?.checkoutAddPromoCode?.errors,
        };
      }
      if (data?.checkoutAddPromoCode?.checkout) {
        return {
          data: this.constructCheckoutModel(data.checkoutAddPromoCode.checkout),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  removePromoCode = async (
    promoCode: string,
    checkoutId: string,
    isRecalculate = true
  ) => {
    try {
      const { data, errors } = await this.client.mutate<
        RemoveCheckoutPromoCode,
        RemoveCheckoutPromoCodeVariables
      >({
        mutation: CheckoutMutations.removeCheckoutPromoCode,
        variables: { checkoutId, promoCode, isRecalculate },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutRemovePromoCode?.errors.length) {
        return {
          error: data?.checkoutRemovePromoCode?.errors,
        };
      }
      if (data?.checkoutRemovePromoCode?.checkout) {
        return {
          data: this.constructCheckoutModel(
            data.checkoutRemovePromoCode.checkout
          ),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  createPayment = async ({
    checkoutId,
    paymentInput,
  }: {
    checkoutId: string;
    paymentInput: any;
  }) => {
    try {
      const variables = {
        checkoutId,
        paymentInput,
      };
      const { data, errors } = await this.client.mutate<
        CreateCheckoutPayment,
        CreateCheckoutPaymentVariables
      >({
        mutation: CheckoutMutations.createCheckoutPaymentMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutPaymentCreate?.errors.length) {
        return {
          error: data?.checkoutPaymentCreate?.errors,
        };
      }
      if (data?.checkoutPaymentCreate?.payment) {
        return {
          data: this.constructPaymentModel(data.checkoutPaymentCreate.payment),
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  completeCheckout = async ({
    checkoutId,
    paymentData,
    redirectUrl,
    storeSource,
  }: CompleteCheckoutInput) => {
    try {
      const paymentDataString = paymentData && JSON.stringify(paymentData);

      const { data, errors } = await this.client.mutate<
        CompleteCheckout,
        CompleteCheckoutVariables
      >({
        mutation: CheckoutMutations.completeCheckoutMutation,
        variables: {
          checkoutId,
          paymentData: paymentDataString,
          redirectUrl,
          storeSource,
        },
      });

      console.log("xxxxxxxcheckoutcomplete", data);

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutComplete?.errors.length) {
        return {
          error: data?.checkoutComplete?.errors,
        };
      }
      if (data?.checkoutComplete) {
        return {
          data: data.checkoutComplete,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  checkoutAddCustomDisount = async ({ input }: { input: any }) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.checkoutCustomDiscountAddMutation,
        variables: {
          input,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutCustomDiscountAdd?.errors?.length) {
        return {
          error: data?.checkoutCustomDiscountAdd?.errors,
        };
      }
      if (data?.checkoutCustomDiscountAdd?.checkouts) {
        return {
          data: data.checkoutCustomDiscountAdd.checkouts,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
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
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.checkoutUpdateDataMutation,
        variables: {
          checkoutId,
          input,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutUpdateData?.errors?.length) {
        return {
          error: data?.checkoutUpdateData?.errors,
        };
      }
      if (data?.checkoutUpdateData?.checkout) {
        return {
          data: data.checkoutUpdateData.checkout,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  checkoutLineUpdateData = async ({
    checkoutLineId,
    input,
  }: {
    checkoutLineId: string;
    input: any;
  }) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.checkoutLineUpdateDataMutation,
        variables: {
          checkoutLineId,
          input,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutLineUpdateData?.errors?.length) {
        return {
          error: data?.checkoutLineUpdateData?.errors,
        };
      }
      if (data?.checkoutLineUpdateData?.checkout) {
        return {
          data: data.checkoutLineUpdateData.checkout,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  completeCheckoutMultiple = async ({
    checkoutIds,
  }: {
    checkoutIds: {
      checkoutId: string;
    }[];
  }) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.completeCheckoutMultipleMutation,
        variables: {
          checkoutIds,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.checkoutMultipleComplete?.errors.length) {
        return {
          error: data.checkoutMultipleComplete.errors,
        };
      }
      if (data?.checkoutMultipleComplete) {
        return {
          data: data.checkoutMultipleComplete,
        };
      }
      return {};
    } catch (error) {
      return {
        error,
      };
    }
  };

  //Create Cart
  createCart = async ({ customerId }: { customerId: string }) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.cartCreateMutation,
        variables: {
          customerId,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.cartCreate?.errors?.length) {
        return {
          error: data?.cartCreate?.errors,
        };
      }
      if (data?.cartCreate) {
        return {
          data: data.cartCreate,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  // Pick And Drop
  createPickup = async ({
    isExpress,
    pickupSlot,
    customer,
  }: CreatePickupInput) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: AuthMutations.pickupCreateMutation,
        variables: {
          pickupCreateInput: {
            status: "SCHEDULED",
            customer,
            isExpress,
            slot: pickupSlot,
          },
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.pickUpCreate?.pickUpErrors?.length) {
        return {
          error: data?.pickUpCreate?.pickUpErrors,
        };
      }
      if (data?.pickUpCreate) {
        return {
          data: data.pickUpCreate,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  checkoutLineAddonCreate = async input => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.addOnsLineCreateMutation,
        variables: {
          input,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.addOnsLineCreate?.addOnsErrors?.length) {
        return {
          error: data.addOnsLineCreate.addOnsErrors,
        };
      }
      if (data?.addOnsLineCreate?.checkout) {
        return {
          data: data.addOnsLineCreate.checkout,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  checkoutLineAddonDelete = async (id: string) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.addOnsLineDelete,
        variables: {
          id,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.addOnsLineDelete?.addOnsErrors?.length) {
        return {
          error: data.addOnsLineDelete.addOnsErrors,
        };
      }
      if (data?.addOnsLineDelete?.checkout) {
        return {
          data: data.addOnsLineDelete.checkout,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  checkoutSublineUpdate = async (
    checkoutLineId: string,
    sublines: any[],
    replace: boolean = false
  ) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.checkoutSublineUpdateMutation,
        variables: {
          checkoutLineId,
          replace,
          sublines,
        },
      });
      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.checkoutSublinesUpdate?.checkoutErrors?.length) {
        return {
          error: data.checkoutSublinesUpdate.checkoutErrors,
        };
      }
      if (data?.checkoutSublinesUpdate?.checkout) {
        return {
          data: data.checkoutSublinesUpdate.checkout,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  checkoutLineAddExtraData = async (checkoutLineId: string, input: any) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.checkoutLineAddExtraData,
        variables: {
          checkoutLineId,
          input,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.checkoutLineAddExtraData?.checkoutErrors?.length) {
        return {
          error: data.checkoutLineAddExtraData.checkoutErrors,
        };
      }
      if (data?.checkoutLineAddExtraData?.checkoutLine) {
        return {
          data: data.checkoutLineAddExtraData.checkoutLine,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  checkoutExpressAdd = async (checkoutIds: string) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.checkoutExpressAddMutation,
        variables: {
          checkoutIds,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.checkoutExpressAdd?.checkoutErrors?.length) {
        return {
          error: data.checkoutExpressAdd.checkoutErrors,
        };
      }
      if (data?.checkoutExpressAdd?.checkouts) {
        return {
          data: data.checkoutExpressAdd.checkouts,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  checkoutExpressRemove = async (checkoutIds: string) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.checkoutExpressRemoveMutation,
        variables: {
          checkoutIds,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.checkoutExpressRemove?.checkoutErrors?.length) {
        return {
          error: data.checkoutExpressRemove.checkoutErrors,
        };
      }
      if (data?.checkoutExpressRemove?.checkouts) {
        return {
          data: data.checkoutExpressRemove.checkouts,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  checkoutLineExpressAdd = async (
    checkoutLineId: string,
    price: string,
    checkoutIds: string[]
  ) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.checkoutLineExpressAddMutation,
        variables: {
          checkoutLineId,
          price,
          checkoutIds,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.checkoutLineExpressAdd?.checkoutErrors?.length) {
        return {
          error: data.checkoutLineExpressAdd.checkoutErrors,
        };
      }
      if (data?.checkoutLineExpressAdd?.checkouts) {
        return {
          data: data.checkoutLineExpressAdd.checkouts,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  checkoutLineExpressRemove = async (checkoutLineId: string) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.checkoutLineExpressRemoveMutation,
        variables: {
          checkoutLineId,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.checkoutLineExpressRemove?.checkoutErrors?.length) {
        return {
          error: data.checkoutLineExpressRemove.checkoutErrors,
        };
      }
      if (data?.checkoutLineExpressRemove?.checkout) {
        return {
          data: data.checkoutLineExpressRemove.checkout,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  checkoutLineDeleteExtraData = async (
    checkoutLineId: string,
    key: string[]
  ) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.checkoutLineDeleteExtraData,
        variables: {
          checkoutLineId,
          key,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.checkoutLineDeleteExtraData?.checkoutErrors?.length) {
        return {
          error: data.checkoutLineDeleteExtraData.checkoutErrors,
        };
      }
      if (data?.checkoutLineDeleteExtraData?.checkoutLine) {
        return {
          data: data.checkoutLineDeleteExtraData.checkoutLine,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  checkoutDeleteExtraData = async (extraDataId: string) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.checkoutExtraDataDeleteMutation,
        variables: {
          extraDataId,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.checkoutDeleteExtraData?.checkoutErrors?.length) {
        return {
          error: data.checkoutDeleteExtraData.checkoutErrors,
        };
      }
      if (data?.checkoutDeleteExtraData?.checkout) {
        return {
          data: data.checkoutDeleteExtraData.checkout,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  checkoutLineImageAudioDelete = async (extraDataId: string) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: CheckoutMutations.checkoutLineImageAudioDeleteMutation,
        variables: {
          extraDataId,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.checkoutLineImageAudioDelete?.checkoutErrors?.length) {
        return {
          error: data.checkoutLineImageAudioDelete.checkoutErrors,
        };
      }
      if (data?.checkoutLineImageAudioDelete?.checkoutLine) {
        return {
          data: data.checkoutLineImageAudioDelete.checkoutLine,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  createPickupFrequency = async ({
    isExpress,
    pickupSlot,
    startDate,
    endDate,
    daysOfWeek,
    frequencyType,
    customer,
  }: CreatePickupFrequencyInput) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: AuthMutations.createPickupFrequencyMutation,
        variables: {
          frequencyInput: {
            isExpress,
            slot: pickupSlot,
            startDate,
            endDate,
            daysOfWeek,
            frequencyType,
            customer,
          },
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.createFrequencyForPickup?.pickUpErrors?.length) {
        return {
          error: data?.createFrequencyForPickup?.pickUpErrors,
        };
      }
      if (data?.createFrequencyForPickup) {
        return {
          data: data.createFrequencyForPickup,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  getRunnerPickups = async (filters: any, sortBy: any) => {
    try {
      const { data, errors } = await this.client.query<any, any>({
        query: AuthMutations.runnerPickups,
        variables: {
          filter: filters,
          sortBy: sortBy,
        },
        fetchPolicy: "network-only",
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      // if (data?.pickUps?.edges?.length) {
      //   return {
      //     error: data?.createFrequencyForPickup?.pickUpErrors,
      //   };
      // }
      if (data?.pickUps?.edges?.length) {
        return {
          data: data?.pickUps?.edges?.map(edge => edge?.node),
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  getRunnerDropoffs = async (filters: any, sortBy: any) => {
    try {
      const { data, errors } = await this.client.query<any, any>({
        query: AuthMutations.runnerDropoffs,
        variables: {
          filter: filters,
          sortBy: sortBy,
        },
        fetchPolicy: "network-only",
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      if (data?.dropOffs?.edges?.length) {
        return {
          data: data?.dropOffs?.edges?.map(edge => edge?.node),
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  getGarmentCategories = async () => {
    try {
      const { data, errors } = await this.client.query<any, any>({
        query: garmentCategoriesQuery,
        fetchPolicy: "network-only",
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      return {
        data: data?.garmentCategoriesQuery,
      };
    } catch (error) {
      return {
        error,
      };
    }
  };

  getGarments = async filter => {
    try {
      const { data, errors } = await this.client.query<any, any>({
        query: garmentsQuery,
        fetchPolicy: "network-only",
        variables: {
          filter,
        },
      });
    } catch (err) {}
  };

  getServices = async filter => {
    try {
      const { data, errors } = await this.client.query<any, any>({
        query: servicesQuery,
        fetchPolicy: "network-only",
        variables: {
          filter,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }
      return {
        data: data?.serviceUnits,
      };
    } catch (error) {
      return {
        error,
      };
    }
  };

  // Pick And Drop
  updatePickup = async ({ id, input }) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: LaundreeeMutations.pickupUpdate,
        variables: {
          id,
          input,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.pickUpUpdate?.pickUpErrors?.length) {
        return {
          error: data?.pickUpUpdate?.pickUpErrors,
        };
      }
      if (data?.pickUpUpdate) {
        return {
          data: data.pickUpUpdate?.pickUp,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  updateDropoff = async ({ id, input }) => {
    try {
      const { data, errors } = await this.client.mutate<any, any>({
        mutation: LaundreeeMutations.dropoffUpdate,
        variables: {
          id,
          input,
        },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      }

      if (data?.dropOffUpdate?.dropOffErrors?.length) {
        return {
          error: data?.dropOffUpdate?.dropOffErrors,
        };
      }
      if (data?.dropOffUpdate?.dropOff) {
        return {
          data: data.dropOffUpdate?.dropOff,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  };

  private constructCheckoutModel = (
    checkout: Checkout | AddCheckoutLine_checkoutLinesUpdate_checkout | any
  ): ICheckoutModel => ({
    ...checkout,
    availableShippingMethods: checkout?.availableShippingMethods
      ? checkout?.availableShippingMethods.filter(filterNotEmptyArrayItems)
      : [],
    lines: checkout?.lines
      ?.filter(item => item?.quantity && item.variant.id)
      .map(item => {
        const itemVariant = item?.variant;

        return {
          id: item!.id,
          quantity: item!.quantity,
          // quantityAfterDiscount: item?.quantityAfterDiscount,
          totalPrice: item?.totalPrice,
          variant: {
            attributes: itemVariant?.attributes,
            id: itemVariant!.id,
            isAvailable: itemVariant?.isAvailable,
            metadata: itemVariant?.metadata,
            name: itemVariant?.name,
            pricing: itemVariant?.pricing,
            product: itemVariant?.product,
            quantityAvailable: itemVariant?.quantityAvailable,
            sku: itemVariant?.sku,
            // @ts-ignore
            images: itemVariant?.images,
          },
        };
      }),
    promoCodeDiscount: {
      discount: checkout?.discount,
      discountName: checkout?.discountName,
      voucherCode: checkout?.voucherCode,
    },
  });

  private constructPaymentModel = ({
    id,
    gateway,
    token,
    creditCard,
    total,
  }: Payment): IPaymentModel => ({
    creditCard,
    gateway,
    id,
    token,
    total,
  });
}
