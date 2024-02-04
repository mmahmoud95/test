const User = require('./user');
const Post = require('./post');
const Like = require('./like');

const models = {
    User: User,
    Post: Post,
    Like: Like,
}

module.exports = models