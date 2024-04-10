import { gql } from '@apollo/client';

export const GET_REPOSITORY_ISSUES = gql`
  query GetRepositoryIssues($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      issues(first: 10, states: OPEN) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
`;

export const GET_ISSUE_DETAILS = gql`
  query GetIssueDetails($id: ID!) {
    node(id: $id) {
      ... on Issue {
        title
        body
        createdAt
        author {
          login
        }
      }
    }
  }
`;
