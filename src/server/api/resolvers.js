import { find, filter } from 'lodash'
import knex from './connector'

/**
 * Resolvers:
 * 
 *  These functions mapped to the defined schema
 *  http://dev.apollodata.com/tools/graphql-tools/resolvers.html
 * 
 *  Resolver Function Signature:
 *  fieldName: (root, args, context, info) => result
 * 
 *      root: result returned from the resolver on the parent
 *      field, or if in top-level, the Query field, the
 *      rootValue passed from server configuration:
 *      http://dev.apollodata.com/tools/graphql-server/setup.html#graphqlOptions
 *      This argument is what enables the nested nature of
 *      GraphQL queries
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
 *
 *  Note that resolvers are operated like a tree. Check this link:
 *  http://dev.apollodata.com/tools/graphql-tools/resolvers.html#Resolver-root-argument
 */

const resolverMap = {
    Query: {
        posts() {
            return knex.select().from('posts')
        },
        authors() {
            return knex.select().from('authors')
        }
    },
    Mutation: {
        upvotePost(_, { id, amount }) {
            return knex('posts')
                .where({ id })
                .increment('votes', amount || 1)
                .then(() => {
                    return knex('posts').where({ id }).select('*').first()
                })
        }
    },
    Author: {
        posts(author) {
            return knex('posts').where({ id: author.id }).select('*')
        },
    },
    Post: {
        author(post) {
            return knex('authors').where({ 'id': post.authorId }).select('*').first()
        }
    }
}

export default resolverMap