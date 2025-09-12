// const jwt = require("jsonwebtoken")
// require("dotenv").config()
// const {UserModel} = require("../Models/authModel.js")

// exports.checkAuth = async (req, res, next) => {
//     const {authorization} = req.headers
//     // console.log(authorization)
//     const token = authorization.split(" ")[1]
//     try {
//         const decodeToken = await jwt.verify(token, process.env.jwt_scretkey_sign)
//         const checkUser = await UserModel.findById(decodeToken.id).select(["-password", "-createdAt", "-updatedAt", "-__v"])
//         if(checkUser){
//             req.userInfo = checkUser
//             next()
//         }else{
//             next({statusCode:403, message: "Invalid Token"})
//         }
//     } catch (error) {
//         console.log(error)
//         next({statusCode:403, message: error.message})
//     }
// }


// exports.checkRole = (...roles) => {
//     return async (req, res, next) => {
//         const checkuser = req.userInfo
//         const data = await UserModel.findById(checkuser.id).select("role")
//         if(roles.includes(data.role)){
//             next()
//         }else{
//             next({statusCode: 403, message: `Only ${roles.join(",")} Can Access`})
//         }
//     }
// }




const jwt = require("jsonwebtoken");
require("dotenv").config();
const { BuyerModel } = require("../Models/buyerModel.js");
const { DealerModel } = require("../Models/dealerModel.js");

exports.checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next({ statusCode: 401, message: "No token provided" });
  }

  const token = authorization.split(" ")[1];
  try {
    const decodeToken = jwt.verify(token, process.env.jwt_scretkey_sign);

    let checkUser;
    if (decodeToken.role === "buyer") {
      checkUser = await BuyerModel.findById(decodeToken.id).select([
        "-password",
        "-createdAt",
        "-updatedAt",
        "-__v",
      ]);
    } else if (decodeToken.role === "dealer") {
      checkUser = await DealerModel.findById(decodeToken.id).select([
        "-password",
        "-createdAt",
        "-updatedAt",
        "-__v",
      ]);
    } else {
      return next({ statusCode: 403, message: "Invalid role in token" });
    }

    if (checkUser) {
      req.userInfo = checkUser;
      next();
    } else {
      next({ statusCode: 403, message: "Invalid Token" });
    }
  } catch (error) {
    console.log(error);
    next({ statusCode: 403, message: error.message });
  }
};

exports.checkRole = (...roles) => {
  return async (req, res, next) => {
    const checkUser = req.userInfo;
    if (!checkUser) {
      return next({ statusCode: 403, message: "No user info found" });
    }

    if (roles.includes(checkUser.role)) {
      next();
    } else {
      next({ statusCode: 403, message: `Only ${roles.join(", ")} can access` });
    }
  };
};
