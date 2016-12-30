import db from '../../db/lib/db'

/**
 *  Resolvers are functions mapped to the defined schema
 *  (fieldName: (root, args, context, info) => result)
 *  http://dev.apollodata.com/tools/graphql-tools/resolvers.html
 * 
 *  `root`: result returned from the resolver of parent field. This argument 
 *  is what enables the nested nature of GraphQL.
 *  `args`: an object with the arguments passed into the field in the query.
 *  `context`: this is an object shared by all resolvers in a particular query 
 *  and is used to contain per-request state including auth info, dataloader 
 *  and anything else that should be taken into account when resolving the query
 */

const resolverMap = {
    Query: {
        async posts() {
            return db
                .select('*')
                .from('posts')
        },
        async authors() {
            return db
                .select('*')
                .from('authors')
        }
    },
    Mutation: {
        async upvotePost(_, { id, amount }) { 
            await db
                .increment('voteCount', amount || 1)
                .from('posts')
                .where({ id })

            return db
                .select('*')
                .from('posts')
                .where({ id })
                .first()
        }
    },
    Author: {
        async posts(author) {
            return db
                .select('*')
                .from('posts')
                .where({ id: author.id })
        },
    },
    Post: {
        async author(post) {
            return db
                .select('*')
                .from('authors')
                .where({ id: post.authorId })
                .first()
        }
    }
}

export default resolverMap