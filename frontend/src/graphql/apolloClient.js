import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, concat } from '@apollo/client'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';

import { sha256 } from 'crypto-hash';

const httpLink = createHttpLink({
    uri: "http://localhost:9000/graphql"
});

const authLink = new ApolloLink((operation, forward) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
        operation.setContext({
            headers: { 'Authorization': `Bearer ${user.token}` },
        });
    }
    return forward(operation)
});

const cache = new InMemoryCache()

const client = new ApolloClient({
    link: createPersistedQueryLink({ sha256, useGETForHashedQueries: true }).concat(authLink).concat(httpLink),
    cache: cache,
});

export default client