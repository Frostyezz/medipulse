import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV !== "development"
      ? "https://medipulse.vercel.app/api/graphql"
      : "http://localhost:3000/api/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
