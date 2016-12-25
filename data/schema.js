import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const schema = `
# TYPES
# -----------------------------

# Here is a description for Author 
# that will be parsed in GraphiQL
type Author {
    # Here is a field description 
    # that will also be parsed
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

# QUERIES ALLOWED
# -----------------------------

type Query {
    posts: [Post],
    authors: [Author]
}

# MUTATIONS ALLOWED
# -----------------------------

type Mutation {
    upvotePost (
        postId: Int!
    ): Post
}

# ROOT
# -----------------------------

schema {
    query: Query 
    mutation: Mutation
}
`

export default makeExecutableSchema({
    typeDefs: schema,
    resolvers
})