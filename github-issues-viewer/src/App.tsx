import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';
import { SearchRepositories } from './components/SearchRepositories';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <SearchRepositories />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
