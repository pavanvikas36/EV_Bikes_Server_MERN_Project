const jwt = require("jsonwebtoken")
require("dotenv").config()
const {UserModel} = require("../Models/authModel.js")

exports.checkAuth = async (req, res, next) => {
    const {authorization} = req.headers
    // console.log(authorization)
    const token = authorization.split(" ")[1]
    try {
        const decodeToken = await jwt.verify(token, process.env.jwt_scretkey_sign)
        const checkUser = await UserModel.findById(decodeToken.id).select(["-password", "-createdAt", "-updatedAt", "-__v"])
        if(checkUser){
            req.userInfo = checkUser
            next()
        }else{
            next({statusCode:403, message: "Invalid Token"})
        }
    } catch (error) {
        console.log(error)
        next({statusCode:403, message: error.message})
    }
}


exports.checkRole = (...roles) => {
    return async (req, res, next) => {
        const checkuser = req.userInfo
        const data = await UserModel.findById(checkuser.id).select("role")
        if(roles.includes(data.role)){
            next()
        }else{
            next({statusCode: 403, message: `Only ${roles.join(",")} Can Access`})
        }
    }
}