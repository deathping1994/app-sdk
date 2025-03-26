import { gql } from "@apollo/client";

export const garmentCategoriesQuery = gql`
  query GarmentCategoriesQueryApp {
    garmentCategories(first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const servicesQuery = gql`
  query ServiceUnitsQueryApp($filter: ServiceUnitsFilterInput) {
    serviceUnits(first: 100, filter: $filter) {
      edges {
        node {
          id
          name
          tat
          thumbnail {
            url
          }
        }
      }
    }
  }
`;
