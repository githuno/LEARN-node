import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ISSUE_DETAILS } from '../queries';

interface Props {
  issueId: string;
  repositoryName: string;
  owner: string;
}

interface IssueDetails {
  title: string;
  body: string;
  createdAt: string;
  author: {
    login: string;
  };
}

const IssueDetail: React.FC<Props> = ({ issueId, repositoryName, owner }) => {
  const { data, loading, error } = useQuery<{ node: IssueDetails }>(GET_ISSUE_DETAILS, {
    variables: { id: issueId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3>{data?.node.title} on {owner}/{repositoryName} Issues</h3>
      <p>Created at: {data?.node.createdAt}</p>
      <p>Author: {data?.node.author.login}</p>
      <p>{data?.node.body}</p>
    </div>
  );
};

export default IssueDetail;
