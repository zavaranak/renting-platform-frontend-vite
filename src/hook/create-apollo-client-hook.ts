import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react";
import {
  HttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
export const useCreateApolloClient = () => {
  const httpLink = new HttpLink({
    uri: "/graphql",
  });
  const { token } = useAuthStore((state) => state);
  const [client, setClient] = useState(
    new ApolloClient({
      link: ApolloLink.from([httpLink]),
      cache: new InMemoryCache(),
    })
  );
  useEffect(() => {
    const initializeApolloClient = () => {
      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
            "apollo-require-preflight": true,
          },
        };
      });
      const newClient = new ApolloClient({
        link: ApolloLink.from([authLink, httpLink]),
        cache: new InMemoryCache(),
      });
      setClient(newClient);
    };

    initializeApolloClient();
  }, [token]);

  return client;
};
