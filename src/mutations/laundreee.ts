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
        error
      }
    }
  }
`;
