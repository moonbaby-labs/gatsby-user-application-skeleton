import React, { ReactElement } from "react"
import { useAuth0 } from "@auth0/auth0-react";
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from "@apollo/client";

export default function AppProvider(props: {children: ReactElement}) {
  const { getAccessTokenSilently } = useAuth0();
  const { children } = props;

  const getToken = async () => {
      try {
          return await getAccessTokenSilently();
      } catch (err) {
          console.log(err);
          return '';
      }
  }

  const token = getToken();

  const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
          uri: process.env.GATSBY_GRAPHQL_HOST,
          headers: {
            Authorization: `Bearer ${token}`
          },
          fetch
      })
  });

  return <ApolloProvider client={client}>{ children }</ApolloProvider>
}