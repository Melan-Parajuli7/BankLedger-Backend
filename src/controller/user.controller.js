const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const tokenBackListModel = require('../model/blackList.model')
const emailService = require('../service/email.service')


async function userRegisterController(req, res) {
    const { name, email, password } = req.body;

    const isExist = await userModel.findOne({ email: email });

    if (isExist) {
        return res.status(422).json({
            message: "Email already used to register....!!!",
            status: "Failed to register with this email"
        });
    }

    const user = await userModel.create({
        email, name, password
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    });

    res.cookie('token', token);
    res.status(201).json({
        user: {
            id: user._id,
            email: user.email,
            name: user.name
        }, 
        token
    });

    await emailService.sendRegistrationEmail(user.email, user.name);
}

async function userLoginController(req , res){

    const {email ,password } = req.body;

    const user = await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({
            message : "Invaid Email or Passowrd"
        })
    }

    const isValidPassowrd = await user.comparePassword(password);

    if(!isValidPassowrd){
        return res.status(401).json({
            message : "Invaid Email or Passowrd"
        })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    });

    res.cookie('token', token);
    res.status(201).json({
        user: {
            id: user._id,
            email: user.email,
            name: user.name
        }
    });


}

async function userLogoutController(req, res){

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(400).json({
            message : "User Logout Successfully"
        })
    }
    

    await tokenBackListModel.create({
        token : token
    })

    res.clearCookie("token")

    res.status(200).json({
        message : "User Logout Successfully"
    })


}
module.exports = {
    userRegisterController, 
    userLoginController,
    userLogoutController
}