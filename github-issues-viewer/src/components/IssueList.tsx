import React, { useState } from 'react';
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (selectedIssueId) {
    return (
      <div>
        <button onClick={() => setSelectedIssueId(null)}>Back to Issues List</button>
        <IssueDetail issueId={selectedIssueId} />
      </div>
    );
  }

  return (
	<ul>
	  {data?.repository.issues.edges.map(({ node }) => (
		<li key={node.id}>
		  <button onClick={() => setSelectedIssueId(node.id)} style={{background: 'none', border: 'none', padding: 0, color: '#069', textDecoration: 'underline', cursor: 'pointer'}}>
			{node.title}
		  </button>
		</li>
	  ))}
	</ul>
  );
};

export { IssueList };
