const models = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

// all controllers for User CRUD

exports.register = async (req ,res)=>{
    // take localhost
    const httpHost =  req.protocol + "://" + req.get('host')
    // take form requst body what i wnat
    const {name, email, password } = req.body;

    //hasing password saving in database
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        // go in database and create user with avater
        const regUser = await models.User.create({
            name,
            email,
            avatar: req.file ?  httpHost  + '/public/images/' + req.file.filename : null,
            password: hashPassword
        });
        res.status(200).json({message:'Create Email Secssesfully'});
    } catch (e) {   
        console.error(e);
        res.status(401).json({message: "something rong habend"})
    }
};

exports.login = async (req, res) => {
     // take form requst body what i wnat
    const { email, password } = req.body;
    try {
        const user = await models.User.findOne({email});
        // compare the password from register to real password using bcrypt module
        const authPassword = await bcrypt.compare(password, user.password);
        // if authPassword is true sgin data useing JWt module and print it in json body
        if (authPassword) {
            const token = jwt.sign({_id: user._id, name: user.name, email: user.email}, process.env.JWT_SECRET);
            // here we take token to save it in loaclStorg 
            res.status(200).json({accessToken: token});
        }else {
            res.status(401).json({ message: "بريد إلكتروني أو كلمة مرور غير صالحة" });
        };

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during login", error: error.message });
    }
};


exports.updatePorfile = async (req, res) => {
     // take form requst body what i wnat
    const { name, password } = req.body;
    // see if the user loged in useing meddilwhere jwt and named currentUser to use it anywhere
    const _id = req.currentUser
    try {   
            // make random hash for password for meore secorty 
            const hashPassword = await bcrypt.hash(password, 10);
            // take the name and update it 
            const userUpdate = await models.User.updateOne({_id},{ 
                name,
                password: hashPassword,
            })
            // if is loged in true make update 
            if(userUpdate){
                res.status(200).json({message: 'You Update your profile'});
            }else{
                res.status(404).json({message: "Cant update"})
            }
    } catch (e) {
        res.status(500).json(e);
    }
};
exports.updatauserAvatar = async (req, res) => {
    //take host 
    const httpHost = req.protocol + "://" + req.get('host');
    // take curent user
    const _id = req.currentUser
    try {   
        const upavatar = await models.User.updateOne({_id},{
            //named  the file 
            avatar: httpHost + '/public/images/' + req.file.filename,
        })
        res.status(200).json({message: 'update avater secsefuly'})
    } catch (e) {
        res.status(500).json({message: 'You shuild loged in'})
    }
}
exports.getUserPost = async (req, res) => {
    //take auhter use jwt you shuld tkae the same name in Post schema 
    const author = req.currentUser
    try {
        // find if user in data base or not 
        const user = await models.Post.find({author}).populate({ path: 'author', select: 'name avatar'})
        // if not logied in or there are not post
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({data: user});
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserId = async (req, res) => {
    const _id = req.currentUser
    try {
        const findPoist = await models.User.findOne({_id})
        res.status(200).json({avatar: findPoist.avatar, name:findPoist.name})

    } catch (e) {
        res.status(403).json(e)
    }

}