import { gql } from "@apollo/client";

import { checkoutAddressFragment } from "./checkout";

export const userFragment = gql`
  ${checkoutAddressFragment}
  fragment User on User {
    id
    email
    firstName
    lastName
    isStaff
    phone
    extraData {
      id
      key
      value
    }
    avatar {
      url
    }
    tags {
      name
      __typename
    }
    metadata {
      key
      value
    }
    defaultShippingAddress {
      ...Address
    }
    defaultBillingAddress {
      ...Address
    }
    addresses {
      ...Address
    }
  }
`;
