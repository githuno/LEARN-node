import { useState, ChangeEvent, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_REPOSITORIES } from '../queries/repositories';
import { IssueList } from './IssueList';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (process.env.NODE_ENV !== 'production') {
  // Adds messages only in a dev environment
  // https://www.apollographql.com/docs/react/errors#%7B%22version%22%3A%223.9.10%22%2C%22message%22%3A14%2C%22args%22%3A%5B%22search%22%2C%22Query%22%2C%22either%20ensure%20all%20objects%20of%20type%20SearchResultItemConnection%20have%20an%20ID%20or%20a%20custom%20merge%20function%2C%20or%20%22%2C%22Query.search%22%2C%22%7B%5Cn%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemConnection%5C%22%2C%5Cn%20%20%5C%22edges%5C%22%3A%20%5B%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemEdge%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22node%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22__ref%5C%22%3A%20%5C%22Repository%3AMDEwOlJlcG9zaXRvcnkxNzM1OTExNQ%3D%3D%5C%22%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemEdge%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22node%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22__ref%5C%22%3A%20%5C%22Repository%3AMDEwOlJlcG9zaXRvcnk5NDQwNDg2MA%3D%3D%5C%22%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemEdge%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22node%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22__ref%5C%22%3A%20%5C%22Repository%3AMDEwOlJlcG9zaXRvcnkxMDY2MDYzMDY%3D%5C%22%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemEdge%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22node%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22__ref%5C%22%3A%20%5C%22Repository%3AMDEwOlJlcG9zaXRvcnkyMjYzODY5Njg%3D%5C%22%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemEdge%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22node%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22__ref%5C%22%3A%20%5C%22Repository%3AMDEwOlJlcG9zaXRvcnkzNTEzMDA3Nw%3D%3D%5C%22%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemEdge%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22node%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22__ref%5C%22%3A%20%5C%22Repository%3AMDEwOlJlcG9zaXRvcnk4ODk3NzM4MA%3D%3D%5C%22%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemEdge%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22node%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22%22%2C%22%7B%5Cn%20%20%5C%22edges%5C%22%3A%20%5B%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemEdge%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22node%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22__ref%5C%22%3A%20%5C%22Repository%3AMDEwOlJlcG9zaXRvcnkxNzM1OTExNQ%3D%3D%5C%22%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemEdge%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22node%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22__ref%5C%22%3A%20%5C%22Repository%3AMDEwOlJlcG9zaXRvcnk5NDQwNDg2MA%3D%3D%5C%22%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemEdge%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22node%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22__ref%5C%22%3A%20%5C%22Repository%3AMDEwOlJlcG9zaXRvcnkxMDY2MDYzMDY%3D%5C%22%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemEdge%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22node%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22__ref%5C%22%3A%20%5C%22Repository%3AMDEwOlJlcG9zaXRvcnkyMjYzODY5Njg%3D%5C%22%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemEdge%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22node%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22__ref%5C%22%3A%20%5C%22Repository%3AMDEwOlJlcG9zaXRvcnkzNTEzMDA3Nw%3D%3D%5C%22%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemEdge%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22node%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22__ref%5C%22%3A%20%5C%22Repository%3AMDEwOlJlcG9zaXRvcnk4ODk3NzM4MA%3D%3D%5C%22%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%7D%2C%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22__typename%5C%22%3A%20%5C%22SearchResultItemEdge%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22node%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22__ref%5C%22%3A%20%5C%22Repository%3AMDEwOlJlcG9zaXRvcnkxMDkwNz%22%5D%7D
  loadDevMessages();
  loadErrorMessages();
}

interface Search {
    __typename: 'SearchResultItemConnection';
    edges: { node: Node }[];
    pageInfo: { endCursor: string, hasNextPage: boolean };
}

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
	const [executeSearch, { data, loading, error, fetchMore }] = useLazyQuery<{ search: Search }>(SEARCH_REPOSITORIES);

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
    }, []);

    const handleSearchSubmit = useCallback(() => {
        executeSearch({ variables: { query: searchTerm } });
    }, [executeSearch, searchTerm]);

    const handleShowMore = useCallback(() => {
		if (data?.search.pageInfo.endCursor) {
			fetchMore({
				variables: {
					cursor: data.search.pageInfo.endCursor,
				},
				updateQuery: (prevResult, { fetchMoreResult }) => {
					if (!fetchMoreResult) return prevResult;
					return {
						search: {
							__typename: prevResult.search.__typename,
							edges: [...prevResult.search.edges, ...fetchMoreResult.search.edges],
							pageInfo: fetchMoreResult.search.pageInfo,
						},
					};
				},
			});
		}
	}, [data, fetchMore]);

    const handleRepoClick = useCallback((repoName: string) => {
        setSelectedRepo(repoName);
        setViewMode(ViewMode.ISSUES);
    }, []);

    const handleBackClick = useCallback(() => {
        setViewMode(ViewMode.SEARCH);
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

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
				{data?.search.edges.map(({ node }, index) => (
					<li key={`${node.id}-${index}`}>
					<button onClick={() => handleRepoClick(node.nameWithOwner)}>{node.nameWithOwner}</button>
					</li>
				))}
			</ul>
            {data?.search.pageInfo.hasNextPage && <button onClick={handleShowMore}>Show More</button>}
        </div>
    );
};

export { SearchRepositories };
