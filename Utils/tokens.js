const jwt = require("jsonwebtoken")
require("dotenv").config()

async function generateToken(user, req, res, next){
    try {
        const token = await jwt.sign({id: user._id, name: user.name, role: user.role}, process.env.jwt_scretkey_sign, {expiresIn: "24h"})
        return token
    } catch (error) {
        console.log(error)
        next({statusCode: 400, message: "Somthing Went Wrong"})
    }
}

module.exports = {generateToken}

// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// function generateToken(user) {
//   try {
//     if (!user.role) throw new Error("User role is missing");

//     const payload = {
//       id: user._id,
//       name: user.name,
//       role: user.role, // important for checkRole
//     };

//     const token = jwt.sign(payload, process.env.jwt_scretkey_sign, {
//       expiresIn: "24h",
//     });

//     return token;
//   } catch (error) {
//     console.log("Token generation error:", error.message);
//     throw new Error("Something went wrong while generating token");
//   }
// }

// module.exports = { generateToken };
