const jwt = require("jsonwebtoken")
require("dotenv").config()

async function generateToken(user, req, res, next){
    try {
        const token = await jwt.sign({id: user._id, name: user.name}, process.env.jwt_scretkey_sign, {expiresIn: "24h"})
        return token
    } catch (error) {
        console.log(error)
        next({statusCode: 400, message: "Somthing Went Wrong"})
    }
}

module.exports = {generateToken}