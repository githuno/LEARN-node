import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_ISSUES } from '../queries';
import IssueDetail from './IssueDetail';

interface Props {
  repositoryName: string;
  owner: string;
}

interface Node {
  id: string;
  title: string;
}

const IssueList: React.FC<Props> = ({ repositoryName, owner }) => {
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const { data, loading, error } = useQuery<{ repository: { issues: { edges: { node: Node }[] } } }>(GET_REPOSITORY_ISSUES, {
    variables: { name: repositoryName, owner: owner },
  });

  const handleBackClick = useCallback(() => {
    setSelectedIssueId(null);
  }, []);

  const handleIssueClick = useCallback((id: string) => {
    setSelectedIssueId(id);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (selectedIssueId) {
    return (
      <div>
        <button onClick={handleBackClick}>Back to Issues List</button>
		<IssueDetail issueId={selectedIssueId} repositoryName={repositoryName} owner={owner} />
      </div>
    );
  }

  return (
    <div>
      <h3>Latest Issues on {owner}/{repositoryName}</h3>
      <ul>
        {data?.repository.issues.edges.map(({ node }) => (
          <li key={node.id}>
            <button onClick={() => handleIssueClick(node.id)}>
              {node.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { IssueList };
