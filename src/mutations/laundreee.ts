import { gql } from "@apollo/client";

export const pickupUpdate = gql`
  mutation PickupUpdateApp($id: ID!, $input: PickUpCreateInput) {
    pickUpUpdate(id: $id, input: $input) {
      pickUp {
        id
        additionalNotes(first: 50) {
          edges {
            node {
              file
              id
              note
              created
            }
          }
        }
        slot {
          date
          startTime
          endTime
        }
      }
      pickUpErrors {
        code
        field
        message
      }
    }
  }
`;

export const dropoffUpdate = gql`
  mutation DropoffUpdateApp($id: ID!, $input: DropOffCreateInput) {
    dropOffUpdate(id: $id, input: $input) {
      dropOff {
        id
        dropOffDate
        status
        runner {
          id
          phone
          client {
            clientCode
            id
          }
        }
      }
      dropOffErrors {
        message
        code
        field
      }
    }
  }
`;

export const createUserExtraDataMutation = gql`
  mutation UserExtraDataCreateApp($input: UserExtraDataInput!) {
    userExtraDataCreate(input: $input) {
      userExtraData {
        id
        key
        value
      }
      UserExtraDataErrors {
        field
        message
      }
    }
  }
`;

export const updateUserExtraDataMutation = gql`
  mutation UserExtraDataUpdateApp($id: ID!, $input: UserExtraDataInput!) {
    userExtraDataUpdate(id: $id, input: $input) {
      userExtraData {
        id
        key
        value
      }
      UserExtraDataErrors {
        field
        message
      }
    }
  }
`;

export const deleteUserExtraDataMutation = gql`
  mutation UserExtraDataDelete($id: ID!) {
    userExtraDataDelete(id: $id) {
      userExtraData {
        id
        key
        value
      }
      UserExtraDataErrors {
        field
        message
      }
    }
  }
`;
