import bookshelf from '../lib/bookshelf'

export const Authors = bookshelf.Model.extend({
    tableName: 'authors',
    posts: () => this.hasMany(Posts),
})

export const Posts = bookshelf.Model.extend({
    tableName: 'posts',
    author: () => this.belongsTo(Authors),
}, {
  async upVote(id, amount = 1){
    await this.query()
      .where({ id })
      .increment('voteCount', amount)
    
    return await this.where({ id }).fetch()
  }
})