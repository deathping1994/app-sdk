import { gql } from "@apollo/client";

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
