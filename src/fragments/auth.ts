import { gql } from "@apollo/client";

export const userAddressFragment = gql`
  fragment Address on Address {
    id
    firstName
    lastName
    companyName
    streetAddress1
    streetAddress2
    city
    postalCode
    cityArea
    country {
      code
      country
    }
    countryArea
    phone
    isDefaultBillingAddress
    isDefaultShippingAddress
    type {
      id
      type
      created
    }
  }
`;

export const userFragment = gql`
  ${userAddressFragment}
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
    client {
      clientCode
      id
    }
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
