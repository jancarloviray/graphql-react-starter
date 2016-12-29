import { find, filter } from 'lodash'
import { Authors, Posts } from '../../db/model'

/**
 * Resolvers:
 * 
 *  These functions are mapped to the defined schema
 *  signature: fieldName: (root, args, context, info) => result
 *  http://dev.apollodata.com/tools/graphql-tools/resolvers.html
 * 
 *      root: result returned from the resolver on the parent
 *      field, or if in top-level like the Query field, the
 *      rootValue passed from server configuration.
 *      This argument is what enables the nested nature of
 *      GraphQL queries.
 *
 *      args: an object with the arguments passed into the field
 *      in the query. For example, author(name: "Ada"), the args
 *      would be: {"name":"Ada"}
 *
 *      context: this is an object shared by all resolvers in a
 *      particular query and is used to contain *per-request state*
 *      including auth info, dataloader instances and anything else
 *      that should be taken into account when resolving the query
 *
 *      info: the argument should only be used in advanced cases,
 *      but it contains information about the execution state of
 *      the query, including field name, path to field from root, etc
 */

const resolverMap = {
    Query: {
        async posts() {
            const posts = await new Posts().fetchAll()
            return posts ? posts.toJSON() : posts
        },
        async authors() {
            const authors = await new Authors().fetchAll()
            return authors ? authors.toJSON() : authors
        }
    },
    Mutation: {
        async upvotePost(_, { id, amount }) {
            const post = await Posts.upVote(id, amount)
            return post ? post.toJSON() : post
        }
    },
    Author: {
        async posts(author) {
            const posts = await new Posts({ id: author.id }).fetchAll()
            return posts ? posts.toJSON() : posts
        },
    },
    Post: {
        async author(post) {
            const author = await new Authors({ id: post.authorId }).fetch()
            return author ? author.toJSON() : author
        }
    }
}

export default resolverMap