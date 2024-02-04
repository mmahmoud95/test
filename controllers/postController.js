const mongoose = require('mongoose');
const models = require('../models/index');
const fs = require('fs')

exports.newPost = async (req, res) => {
    const httpHost = req.protocol + "://" + req.get('host');
    const { title, discraption, like } = req.body;
    const _id = req.currentUser
    try {
        const newPost = await models.Post.create({
            img: httpHost + '/public/images/' + req.file.filename,
            title,
            discraption,
            like,
            author: _id,
            });
        res.status(200).json({ message: 'post add seecss' })
    } catch (e) {
        res.status(500).json({message: 'You Shuold Add Image'})
    }
};

exports.updateMyPost = async (req, res) => {
    const httpHost = req.protocol + "://" + req.get('host');
    const {title, discraption} = req.body;
    const _id = req.params.postId;
    try {
        await models.Post.updateOne(
            { _id },
            {
            img: httpHost + '/public/images/' + req.file.filename, 
            title, 
            discraption}
        );
        res.status(200).json({ message: 'updated' })
    } catch (e) {
        res.status(500).json(e)
    }
};
exports.deleteMyPostg = async (req, res)=> {
    const _id = req.params.postId
    const author = req.currentUser
    try {
        const findPoist = await models.Post.findOne({_id}).populate({ path: 'author', select: '_id'})
        if(findPoist){
        const deleteMypost = await models.Post.deleteOne({_id})
        const deleteLike = await models.Like.deleteOne({author})
        res.status(200).json({message: 'delete it seecces'})
    }else{
        res.status(400).json({message: 'Post is not exsest'})
    }
    } catch (e) {
        res.status(500).json(e)
    }
}
exports.findUserId = async (req, res) => {
    try {
        const findPoist = await models.Post.findOne().populate({ path: 'author', select: '_id'})
        res.status(200).json(findPoist)

    } catch (e) {
        res.status(200).json(e)
    }

}

exports.getAllPost = async (req, res) => {
    try {
        const user = await models.Post.find().populate({ path: 'author', select: 'name avatar'})
        res.status(200).json({data: user})
    } catch (e) {
        res.status(401).json(e)
    }
};

exports.getOnePost = async (req, res) => {
    const _id  = req.params.postId
    try {
         const getPost = await models.Post.findById({_id}).populate({ path: 'author', select: 'name avatar'})
        res.status(200).json({data:  getPost})
    } catch (e) {
        res.status(200).json(e)
    }
}


