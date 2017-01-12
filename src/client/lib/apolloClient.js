import ApolloClient, { createNetworkInterface } from 'apollo-client'

export const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:8080/graphql'
  })
})

export const apolloMiddleware = apolloClient.middleware()

export const apolloReducer = apolloClient.reducer()

export default apolloClient