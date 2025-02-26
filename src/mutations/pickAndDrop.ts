import { gql } from "@apollo/client";

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
