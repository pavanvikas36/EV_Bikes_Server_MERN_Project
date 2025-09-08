const express = require("express")
const Router = express.Router()
const {signupController, loginController} = require("../Controllers/authController.js")
const {signupValidater} = require("../Validators/authValidator.js")

Router.post("/signup", signupValidater, signupController)

Router.post("/login", loginController)

module.exports = Router