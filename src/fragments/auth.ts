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
    avatar {
      url
    }
    tags {
      name
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
