import React, { useState, ChangeEvent } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_REPOSITORIES } from '../queries/repositories';
import { IssueList } from './IssueList';

interface Node {
	id: string;
	nameWithOwner: string;
}

enum ViewMode {
	SEARCH,
	ISSUES
}

const SearchRepositories = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [viewMode, setViewMode] = useState(ViewMode.SEARCH);
	const [selectedRepo, setSelectedRepo] = useState('');
	const [executeSearch, { data, loading, error, fetchMore }] = useLazyQuery<{ search: { edges: { node: Node }[]; pageInfo: { endCursor: string, hasNextPage: boolean } } }>(SEARCH_REPOSITORIES);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setSearchTerm(event.target.value);
	};

	const handleSearchSubmit = () => {
		executeSearch({ variables: { query: searchTerm } });
	};

	const handleShowMore = () => {
		if (data?.search.pageInfo.endCursor) {
			fetchMore({
				variables: {
					cursor: data.search.pageInfo.endCursor,
				},
				updateQuery: (prevResult, { fetchMoreResult }) => {
					if (!fetchMoreResult) return prevResult;
					return {
						search: {
							edges: [...prevResult.search.edges, ...fetchMoreResult.search.edges],
							pageInfo: fetchMoreResult.search.pageInfo,
						},
					};
				},
			});
		}
	};

	const handleRepoClick = (repoName: string) => {
		setSelectedRepo(repoName);
		setViewMode(ViewMode.ISSUES);
	};

	const handleBackClick = () => {
		setViewMode(ViewMode.SEARCH);
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :</p>;

	if (viewMode === ViewMode.ISSUES) {
		const [owner, repositoryName] = selectedRepo.split('/');
		return (
			<div>
				<button onClick={handleBackClick}>Back to search</button>
				<IssueList owner={owner} repositoryName={repositoryName} />
			</div>
		);
	}

	return (
		<div>
			<input type="text" onChange={handleSearchChange} value={searchTerm} />
			<button onClick={handleSearchSubmit}>Search</button>
			<ul>
				{data?.search.edges.map(({ node }) => (
					<li key={node.id}>
						<button onClick={() => handleRepoClick(node.nameWithOwner)}>{node.nameWithOwner}</button>
					</li>
				))}
			</ul>
			{data?.search.pageInfo.hasNextPage && <button onClick={handleShowMore}>Show More</button>}
		</div>
	);
};

export { SearchRepositories };
