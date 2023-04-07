import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://api.ss.dev/resource/api/" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

// export default client;

// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri: "https://api.ss.dev/resource/api/",
//   }),
// });

export default client;
