const express = require("express")
const Router = express.Router()
const {viewAllVehicles, viewVehiclesById} = require("../Controllers/buyerController.js")
const {tokenValidater, validaterMiddleware} = require("../Validators/authValidator.js")
const { checkAuth, checkRole } = require("../Middlewares/authMiddleware.js")


Router.get("/viewAllVehicles", tokenValidater, validaterMiddleware, checkAuth, checkRole("buyer"), viewAllVehicles)
Router.get("/viewVehicles/:vehicleId", tokenValidater, validaterMiddleware, checkAuth, checkRole("buyer"), viewVehiclesById)

module.exports = Router