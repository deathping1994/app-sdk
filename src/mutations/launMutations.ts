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

export const garmentsQuery = gql`
  query GetGarmentsApp($filter: GarmentFilterInput) {
    garments(first: 100, filter: $filter) {
      edges {
        node {
          id
          name
          price
          icon {
            url
          }
          shortCode
          garmentType
          measurementUnit
          services(first: 100) {
            edges {
              node {
                id
                category {
                  name
                }
              }
            }
          }
          productSet(first: 100) {
            edges {
              node {
                name
                id
                category {
                  name
                }
                variants {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
