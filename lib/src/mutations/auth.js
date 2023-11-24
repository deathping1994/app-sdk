"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIRM_ACCOUNT = exports.createOTPTokeMutation = exports.tokenRefreshMutation = exports.tokenVeryficationMutation = exports.tokenAuthMutation = void 0;
const client_1 = require("@apollo/client");
const auth_1 = require("../fragments/auth");
const errors_1 = require("../fragments/errors");
exports.tokenAuthMutation = client_1.gql `
  ${errors_1.accountErrorFragment}
  mutation TokenAuth($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      csrfToken
      refreshToken
      token
      errors: accountErrors {
        ...AccountError
      }
      user {
        id
      }
    }
  }
`;
exports.tokenVeryficationMutation = client_1.gql `
  ${errors_1.accountErrorFragment}
  mutation VerifyToken($token: String!) {
    tokenVerify(token: $token) {
      isValid
      payload
      user {
        id
      }
      errors: accountErrors {
        ...AccountError
      }
    }
  }
`;
exports.tokenRefreshMutation = client_1.gql `
  ${errors_1.accountErrorFragment}
  mutation RefreshToken($csrfToken: String, $refreshToken: String) {
    tokenRefresh(csrfToken: $csrfToken, refreshToken: $refreshToken) {
      token
      user {
        id
      }
      errors: accountErrors {
        ...AccountError
      }
    }
  }
`;
exports.createOTPTokeMutation = client_1.gql `
  mutation OTPAuthentication($phone: String!, $otp: String!, $checkoutId: ID) {
    CreateTokenOTP: otpTokenCreate(
      otp: $otp
      phone: $phone
      checkoutId: $checkoutId
    ) {
      token
      refreshToken
      csrfToken
      user {
        id
        email
        firstName
        lastName
        metadata {
          key
          value
        }
      }
      otpErrors {
        code
        field
        message
      }
    }
  }
`;
exports.CONFIRM_ACCOUNT = client_1.gql `
  ${auth_1.userFragment}
  mutation ConfirmAccountV2($otp: String!, $phone: String!) {
    confirmAccountV2(otp: $otp, phone: $phone) {
      token
      refreshToken
      csrfToken
      user {
        ...User
      }
      accountErrors {
        field
        message
      }
      errors {
        field
        message
      }
    }
  }
`;
//# sourceMappingURL=auth.js.map