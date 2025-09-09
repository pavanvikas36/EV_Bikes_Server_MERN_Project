// Main Code
const express = require("express")
const Router = express.Router()
const {signupController, loginController} = require("../Controllers/authController.js")
const {signupValidater, loginValidater, validaterMiddleware} = require("../Validators/authValidator.js")

Router.post("/signup", signupValidater, validaterMiddleware, signupController)

Router.post("/login", loginValidater, validaterMiddleware, loginController)

module.exports = Router



// const express = require("express");
// const Router = express.Router();

// const { signupController, loginController } = require("../Controllers/authController.js");
// const { signupValidator } = require("../Validators/authValidator.js"); // <-- fixed spelling

// Router.post("/signup", signupValidator, signupController);
// Router.post("/login", loginController);

// module.exports = Router;
