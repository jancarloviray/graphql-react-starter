import ApolloClient, { createNetworkInterface } from 'apollo-client'

const __API_PORT__ = process.env.API_PORT

export const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: `http://localhost:${__API_PORT__}/graphql`
  })
})

export const apolloMiddleware = apolloClient.middleware()

export const apolloReducer = apolloClient.reducer()

export default apolloClient
