import { gql } from "@apollo/client";
import { userFragment } from "../fragments/auth";

import { accountErrorFragment } from "../fragments/errors";

export const tokenAuthMutation = gql`
  ${accountErrorFragment}
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

export const runnerLoginMutation = gql`
  mutation runnerloginApp(
    $storeCode: String!
    $password: String!
    $phone: String!
  ) {
    runnerLogin(phone: $phone, password: $password, storeCode: $storeCode) {
      runnerErrors {
        message
        code
        field
      }
      accessToken
      csrfToken
      refreshToken
    }
  }
`;

export const tokenVeryficationMutation = gql`
  ${accountErrorFragment}
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

export const tokenRefreshMutation = gql`
  ${accountErrorFragment}
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

export const createOTPTokeMutation = gql`
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

export const CONFIRM_ACCOUNT = gql`
  ${userFragment}
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

export const UPDATE_ACCOUNT = gql`
  ${userFragment}
  mutation accountUpdate($input: CustomerInput!) {
    accountUpdate(input: $input) {
      user {
        ...User
      }
      accountErrors {
        field
        message
        code
      }
    }
  }
`;

export const pickupCreateMutation = gql`
  mutation PickupCreateApp($pickupCreateInput: PickUpCreateInput) {
    pickUpCreate(input: $pickupCreateInput) {
      pickUp {
        id
        createdOn
        updatedAt
        status
        isExpress
        frequency {
          daysOfWeek
          endDate
          frequencyType
          id
          isExpress
          slot {
            id
            created
            date
            endTime
            startTime
          }
          startDate
          status
        }
        slot {
          id
          created
          date
          endTime
          startTime
        }
      }
      pickUpErrors {
        field
        message
        code
      }
    }
  }
`;

export const createPickupFrequencyMutation = gql`
  mutation CreatePickupFrequencyApp($frequencyInput: FrequencyInput) {
    createFrequencyForPickup(input: $frequencyInput) {
      frequency {
        id
        isExpress
        slot {
          date
          endTime
          startTime
          frequencySet(first: 100) {
            edges {
              node {
                frequencyType
              }
            }
          }
        }
        frequencyType
        status
        daysOfWeek
        startDate
        endDate
        createdAt
        updatedAt
      }
      pickUpErrors {
        field
        message
        code
      }
      errors {
        field
        message
      }
    }
  }
`;

export const cmsBlockQuery = gql`
  query CMSBlockQueryApp($filter: CmsBlockFilterInput) {
    cmsBlocks(first: 100, filter: $filter) {
      edges {
        node {
          id
          group
          key
          value
        }
      }
    }
  }
`;

export const runnerPickups = gql`
  query RunnerPickupsApp($filter: PickupFilterInput, $sortBy: PickupSorter) {
    pickUps(first: 100, filter: $filter, sortBy: $sortBy) {
      edges {
        node {
          id
          isExpress
          slot {
            date
            startTime
            endTime
          }
          cancelReason
          status
          store {
            clientCode
            clientName
            id
          }
          customer {
            id
            phone
            firstName
            lastName
            defaultShippingAddress {
              city
              cityArea
              countryArea
              firstName
              lastName
              postalCode
              streetAddress1
              streetAddress2
            }
          }
        }
      }
    }
  }
`;

export const runnerDropoffs = gql`
  query RunnerDropoffsApp($filter: DropOffFilterInput, $sortBy: DropoffSorter) {
    dropOffs(first: 100, filter: $filter, sortBy: $sortBy) {
      edges {
        node {
          id
          runner {
            id
          }
          status
          dropOffDate
          order {
            id
            total {
              gross {
                amount
              }
            }
            paymentStatus
            isPaid
            isExpress
            client {
              clientCode
              clientName
              id

              coordinates {
                lat
                lng
              }
            }
            user {
              id
              firstName
              lastName
              phone
              defaultShippingAddress {
                city
                cityArea
                countryArea
                firstName
                lastName
                phone
                postalCode
                streetAddress1
                streetAddress2
              }
              client {
                clientCode
              }
            }
          }
        }
      }
    }
  }
`;
