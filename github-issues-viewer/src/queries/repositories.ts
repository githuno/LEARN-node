import { gql } from '@apollo/client';

export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $cursor: String) {
    search(query: $query, type: REPOSITORY, first: 10, after: $cursor) {
      edges {
        node {
          ... on Repository {
            id
            nameWithOwner
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
