const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const tokenBackListModel = require('../model/blackList.model')


async function userMiddleware(req, res, next) {

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access , Token is missing",
    }); 
  }

  const isblackList = await tokenBackListModel.findOne({ token })

  if(isblackList){
    return res.status(401).json({
      message : "Unauthorized access , Token is Invalid"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized access, token is invalid",
    });
  }
}

async function authSystemUserMiddleware(req, res, next){

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access , Token is missing",
    });
  }

  const isblackList = await tokenBackListModel.findOne({ token })

  if(isblackList){
    return res.status(401).json({
      message : "Unauthorized access , Token is Invalid"
    })
  }

  try{
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId).select("+systemUser");
    if(!user.systemUser){
      return res.status(403).json({
        message : "Forbidden Access, not a System User"
      })
    }

    req.user = user
    return next()
  }catch(err){
    return res.status(401).json({
      message: "Unauthorized Access, Token is Missing"
    })
  }



}
module.exports = {
    userMiddleware,
    authSystemUserMiddleware
};
