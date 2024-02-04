const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },
    img:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    discraption:{
        type: String,
        required: true,
    },
},{ 
    timestamps: true,
    versionKey: false
});

const modle = mongoose.model('Post', Post);
module.exports = modle;