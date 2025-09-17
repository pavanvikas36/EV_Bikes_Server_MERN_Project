const express = require("express")
const Router = express.Router()
const {getProfile, editProfile} = require("../Controllers/userController.js")
const {tokenValidater, editProfileValidater, validaterMiddleware} = require("../Validators/authValidator.js")
const {checkAuth} = require("../Middlewares/authMiddleware.js")
const {upload} = require("../Utils/multerFileUpload.js")

Router.get("/profile", tokenValidater, validaterMiddleware, checkAuth, getProfile)

Router.put("/editProfile", upload.single("profilepic"), tokenValidater, editProfileValidater, validaterMiddleware, checkAuth, editProfile)

module.exports = Router