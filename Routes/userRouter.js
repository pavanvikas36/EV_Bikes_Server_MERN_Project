const express = require("express")
const Router = express.Router()
const {getProfile, editProfile} = require("../Controllers/userController.js")
const {tokenValidater, editProfileValidater, validaterMiddleware} = require("../Validators/authValidator.js")
const {checkAuth} = require("../Middlewares/authMiddleware.js")

Router.get("/profile", tokenValidater, validaterMiddleware, checkAuth, getProfile)

Router.put("/editProfile", tokenValidater, editProfileValidater, validaterMiddleware, editProfile)

module.exports = Router