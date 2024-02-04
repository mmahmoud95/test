const mongoose = require('mongoose');
const { Schema } = mongoose;

const Like = new Schema({
    // make filed called like
    like: Boolean,
    // make it to what client made it
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    // and see what post client like it
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }
},
{
    // this to delte timestaps and __v in mongooes 
    timestamps: false,
    versionKey: false
});

const like = mongoose.model("Like", Like);
module.exports = like;