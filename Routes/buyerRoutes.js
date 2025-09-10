const express = require("express")
const Router = express.Router()
const {viewAllVehicles} = require("../Controllers/buyerController.js")

Router.get("/viewAllVehicles", viewAllVehicles)

module.exports = Router