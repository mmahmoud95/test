const {validationResult, body } = require('express-validator');
// make all what ahuld be not empty  in register
const userValidatResult = ()=>{
    return [
        body('name').notEmpty().withMessage('حقل الاسم مطلوب'),
        body('email').notEmpty().isEmail().withMessage('حقل البريد مطلوب'),
        body('password').notEmpty().withMessage('حقل كلمه المرور مطلوب'),
        body('password').isLength({min: 5}).withMessage('حقل كلمه المرور اقل من من 5 خانات'),
    ]
};
// validate when user update profile name and password 
const UpdateuserValidatResult = ()=>{
    return [
        body('name').notEmpty().withMessage('حقل الاسم مطلوب'),
        body('password').notEmpty().withMessage('حقل كلمه المرور مطلوب'),
        body('password').isLength({min: 5}).withMessage('حقل كلمه المرور اقل من من 5 خانات'),
    ]
};
// make all what ahuld be not empty  in post
const PostValidatResult = ()=>{
    return [
        body('title').notEmpty().withMessage('حقل  مطلوب'),
        body('discraption').notEmpty().withMessage('حقل مطلوب'),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()) {
        return next()
    }
    return res.status(400).json({errors: errors.array()})
}
module.exports = {
    userValidatResult,
    validate,
    PostValidatResult,
    UpdateuserValidatResult
}