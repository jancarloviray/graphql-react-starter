import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

// Separate GraphQL schema by types. In a real

const types = [`
# This description for Author will be parsed in GraphiQL
type Author {
    # This description also will be parsed
    id: Int!
    firstName: String
    lastName: String
    posts: [Post]
}

type Post {
    id: Int!
    title: String 
    author: Author 
    votes: Int
}
`]

const queries = [`
type Query {
    posts: [Post],
    authors: [Author]
}
`]

const mutations = [`
type Mutation {
    upvotePost (
        postId: Int!
    ): Post
}
`]

const root = [`
schema {
    query: Query 
    mutation: Mutation
}
`]

const schema = [
    ...types,
    ...queries,
    ...mutations,
    ...root
]

export default makeExecutableSchema({
    typeDefs: schema,
    resolvers
})