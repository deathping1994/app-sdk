import { DataErrorCheckoutTypes } from "../../api/Checkout/types";
import { ApolloClientManager } from "../../data/ApolloClientManager";
import { LocalStorageHandler } from "../../helpers/LocalStorageHandler";
import { DataErrorAuthTypes, DataErrorPickUpTypes } from "../../api/Auth/types";

import { JobRunResponse } from "../types";
import { JobsHandler } from "../JobsHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export enum AuthJobsEvents {
  SIGN_IN_TOKEN_REFRESHING,
}
export interface AuthJobsEventsValues {
  [AuthJobsEvents.SIGN_IN_TOKEN_REFRESHING]: boolean;
}

export type PromiseAuthJobRunResponse = Promise<
  JobRunResponse<DataErrorAuthTypes | DataErrorCheckoutTypes>
>;

export class AuthJobs extends JobsHandler<AuthJobsEventsValues> {
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

  provideUser = async (): PromiseAuthJobRunResponse => {
    const { data, error } = await this.apolloClientManager.getUser();

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.GET_USER,
        },
      };
    }

    return {
      data,
    };
  };

  registerAccount = async ({
    email,
    password,
    redirectUrl,
  }: {
    email: string;
    password: string;
    redirectUrl: string;
  }): PromiseAuthJobRunResponse => {
    const { data, error } = await this.apolloClientManager.registerAccount(
      email,
      password,
      redirectUrl
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.REGISTER_ACCOUNT,
        },
      };
    }

    return {
      data,
    };
  };

  resetPasswordRequest = async ({
    email,
    redirectUrl,
  }: {
    email: string;
    redirectUrl: string;
  }): PromiseAuthJobRunResponse => {
    const { error } = await this.apolloClientManager.resetPasswordRequest(
      email,
      redirectUrl
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.RESET_PASSWORD_REQUEST,
        },
      };
    }

    return {};
  };

  signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): PromiseAuthJobRunResponse => {
    const { data, error } = await this.apolloClientManager.signIn(
      email,
      password
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.SIGN_IN,
        },
      };
    }

    await this.localStorageHandler.setSignInToken(data?.token || null);
    await this.localStorageHandler.setCsrfToken(data?.csrfToken || null);

    return {
      data,
    };
  };

  signInMobile = async ({
    checkoutId,
    otp,
    phone,
  }: {
    checkoutId: any;
    otp: string;
    phone: string;
  }): PromiseAuthJobRunResponse => {
    const { data, error } = await this.apolloClientManager.signInMobile(
      checkoutId,
      otp,
      phone
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.SIGN_IN,
        },
      };
    }

    this.localStorageHandler.setSignInToken(data?.token || null);
    this.localStorageHandler.setCsrfToken(data?.csrfToken || null);
    this.localStorageHandler.setRefreshToken(data?.refreshToken || null);

    return {
      data,
    };
  };

  confirmAccountV2 = async ({
    otp,
    phone,
  }: {
    otp: string;
    phone: string;
  }): PromiseAuthJobRunResponse => {
    const { data, error } = await this.apolloClientManager.confirmAccountV2(
      otp,
      phone
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.SIGN_IN,
        },
      };
    }

    this.localStorageHandler.setSignInToken(data?.token || null);
    this.localStorageHandler.setCsrfToken(data?.csrfToken || null);
    this.localStorageHandler.setRefreshToken(data?.refreshToken || null);

    return {
      data,
    };
  };

  authTokenCreateV2 = async ({
    id,
    token,
  }: {
    id: string;
    token: string;
  }): PromiseAuthJobRunResponse => {
    const { data, error } = await this.apolloClientManager.authtokenCreateV2(
      id,
      token
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.SIGN_IN,
        },
      };
    }

    this.localStorageHandler.setSignInToken(data?.token || null);
    this.localStorageHandler.setCsrfToken(data?.csrfToken || null);
    this.localStorageHandler.setRefreshToken(data?.refreshToken || null);

    return {
      data,
    };
  };

  accountUpdate = async ({
    input,
  }: {
    input: any;
  }): PromiseAuthJobRunResponse => {
    const { data, error } = await this.apolloClientManager.accountUpdate(input);

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.SIGN_IN,
        },
      };
    }

    return {
      data,
    };
  };

  getCustomerDetailsWithId = async ({ id }) => {
    const { data, error } =
      await this.apolloClientManager.getCustomerDetailsWithId(id);

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.CUSTOMER_DETAILS_FETCH,
        },
      };
    }

    return {
      data,
    };
  };

  userExtraDataCreate = async ({ input }: { input: any }) => {
    const { data, error } = await this.apolloClientManager.userExtraDataCreate(
      input
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.CREATE_EXTRA_DATA,
        },
      };
    }

    return {
      data,
    };
  };

  userExtraDataUpdate = async ({ id, input }: { id: string; input: any }) => {
    const { data, error } = await this.apolloClientManager.userExtraDataUpdate(
      id,
      input
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.UPDATE_EXTRA_DATA,
        },
      };
    }

    return {
      data,
    };
  };

  userExtraDataDelete = async ({ id }: { id: string }) => {
    const { data, error } = await this.apolloClientManager.userExtraDataDelete(
      id
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.DELETE_EXTRA_DATA,
        },
      };
    }

    return {
      data,
    };
  };

  signOut = async (): PromiseAuthJobRunResponse => {
    await this.localStorageHandler.clear();

    await this.apolloClientManager.signOut();

    return {};
  };

  verifySignInToken = async () => {
    const wrappedToken = await AsyncStorage.getItem("token");
    if (!wrappedToken) {
      return {
        dataError: {
          error: new Error(
            "Verify sign in token impossible. No token to verify received."
          ),
          type: DataErrorAuthTypes.VERIFY_TOKEN,
        },
      };
    }
    const token = JSON.parse(wrappedToken).item;

    const { data, error } = await this.apolloClientManager.verifySignInToken({
      token,
    });
    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.VERIFY_TOKEN,
        },
      };
    }

    return {
      data,
    };
  };

  refreshSignInToken = async ({
    refreshToken,
  }: {
    refreshToken?: string;
  }): PromiseAuthJobRunResponse => {
    this.notifyEvent(AuthJobsEvents.SIGN_IN_TOKEN_REFRESHING, true);
    const wrappedCsrfToken = await AsyncStorage.getItem("csrf_token");
    const wrappedRefreshToken = await AsyncStorage.getItem("refresh_token");

    if (!wrappedCsrfToken && !wrappedRefreshToken) {
      return {
        dataError: {
          error: new Error(
            "Refresh sign in token impossible. No refresh token received."
          ),
          type: DataErrorAuthTypes.REFRESH_TOKEN,
        },
      };
    }

    const csrf = JSON.parse(wrappedCsrfToken!)?.item;
    const refresh = JSON.parse(wrappedRefreshToken!)?.item;

    const { data, error } = await this.apolloClientManager.refreshSignInToken({
      csrfToken: csrf,
      refreshToken: refresh,
    });
    if (error) {
      this.notifyEvent(AuthJobsEvents.SIGN_IN_TOKEN_REFRESHING, false);

      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.REFRESH_TOKEN,
        },
      };
    }

    await this.localStorageHandler.setSignInToken(data?.token || null);

    this.notifyEvent(AuthJobsEvents.SIGN_IN_TOKEN_REFRESHING, false);

    return {
      data,
    };
  };

  loginRunner = async ({
    phone,
    storeCode,
    password,
  }: {
    storeCode: any;
    password: string;
    phone: string;
  }): PromiseAuthJobRunResponse => {
    const { data, error } = await this.apolloClientManager.loginRunner(
      storeCode,
      password,
      phone
    );

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.SIGN_IN,
        },
      };
    }

    this.localStorageHandler.setSignInToken(data?.token || null);
    this.localStorageHandler.setCsrfToken(data?.csrfToken || null);
    this.localStorageHandler.setRefreshToken(data?.refreshToken || null);

    return {
      data,
    };
  };

  attachStoreToCustomer = async ({ input }) => {
    const { data, error } =
      await this.apolloClientManager.attachStoreToCustomer(input);

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorAuthTypes.ATTACH_STORE,
        },
      };
    }

    return {
      data,
    };
  };

  createPickup = async ({
    isExpress,
    pickupSlot,
    customer,
  }: {
    isExpress: boolean;
    pickupSlot: {
      date: any;
      startTime: any;
      endTime: any;
    };
    customer: string;
  }) => {
    const { data, error } = await this.apolloClientManager.createPickup({
      isExpress,
      pickupSlot,
      customer,
    });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorPickUpTypes.PICK_UP,
        },
      };
    }

    return {
      data,
    };
  };

  updatePickup = async ({ id, input }: { id: string; input: any }) => {
    const { data, error } = await this.apolloClientManager.updatePickup({
      id,
      input,
    });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorPickUpTypes.PICK_UP,
        },
      };
    }

    return {
      data,
    };
  };

  updateDropoff = async ({ id, input }: { id: string; input: any }) => {
    const { data, error } = await this.apolloClientManager.updateDropoff({
      id,
      input,
    });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorPickUpTypes.DROP_OFF,
        },
      };
    }

    return {
      data,
    };
  };

  setPickupFrequency = async ({
    isExpress,
    pickupSlot,
    startDate,
    endDate,
    daysOfWeek,
    frequencyType,
    customer,
  }: {
    isExpress?: boolean;
    pickupSlot: {
      date: any;
      startTime: any;
      endTime: any;
    };
    customer: string;
    startDate: any;
    endDate: any;
    daysOfWeek: any;
    frequencyType: any;
  }) => {
    const { data, error } =
      await this.apolloClientManager.createPickupFrequency({
        isExpress,
        pickupSlot,
        startDate,
        endDate,
        daysOfWeek,
        frequencyType,
        customer,
      });

    if (error) {
      return {
        dataError: {
          error,
          type: DataErrorPickUpTypes.PICK_UP,
        },
      };
    }

    return {
      data,
    };
  };
}
