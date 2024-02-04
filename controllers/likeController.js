const models = require('../models/index');


exports.UserLike = async (req, res) => {
    const _id = req.currentUser;
    const postId = req.params.postId;
    try {
        // see if there any like with id and postId
        const createLike = await models.Like.findOne({
            author: _id,
            postId: postId
        })
       
        // if there are no like create on with the information below
        if (createLike) {
            // if user like found delete it
            const deleteLike = await models.Like.findOneAndDelete({
                author: _id,
                postId: postId
            })
            res.status(200).json({ message: "LIke Delete it seeccesfuly" });
        }else {
            const createUserLike = await models.Like.create({
                author: _id,
                postId: postId
            })
            res.status(200).json({ message: "LIke add it seeccesfuly" });
        }

    } catch (e) {
        res.status(500).json(e)
    }
}
// count how mutch like in one post
exports.countlikes = async (req, res)=>{
    const postId = req.params.postId;
    try {
        // see if there any like with id and postId
        const cuntlike = await models.Like.find({
            postId: postId
        }) 
        res.status(200).json(cuntlike)
    }catch(e){
    res.status(200).json(e)
}   
}

