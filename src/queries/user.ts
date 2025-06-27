import { gql } from "@apollo/client";

import { userFragment } from "../fragments/auth";

export const getUserDetailsQuery = gql`
  ${userFragment}
  query UserDetails {
    me {
      ...User
    }
  }
`;

export const getUserDetailsWithId = gql`
  ${userFragment}
  query CustomerDetailsWithIdApp($id: ID!) {
    user(id: $id) {
      ...User
    }
  }
`;
