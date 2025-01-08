// import { ApolloClient, InMemoryCache, HttpLink,ApolloLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { getCookie } from './utils';
// // import { useAuthStore } from '@store/auth-store';
// // const {token} = useAuthStore(state=>state)


// const httpLink = new HttpLink({
//   uri: '/graphql', // Replace with your GraphQL API endpoint
// });
// const authLink = setContext(async (_, { headers }) => {
//   const token = getCookie('jwt')
//   console.log('update client apollo with token: ',token)
//    return {
//       headers: {
//          ...headers,
//          authorization: token ? `Bearer ${token}` : "",
//       }
//   }
// });

// export const client = new ApolloClient({
//   link: ApolloLink.from([authLink, httpLink]),
//   cache: new InMemoryCache(),
// });
// ;