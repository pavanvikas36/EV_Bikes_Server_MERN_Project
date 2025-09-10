const express = require("express")
const Router = express.Router()
const {checkAuth, checkRole} = require("../Middlewares/authMiddleware.js")
const {tokenValidater, validaterMiddleware} = require("../Validators/authValidator.js")
const {addVehicles, getAllVechicles, getVehiclesById} = require("../Controllers/dealerControllers.js")

Router.post("/vehicles", tokenValidater, validaterMiddleware, checkAuth, checkRole("dealer"), addVehicles)
Router.get("/getAllVehicles",tokenValidater, validaterMiddleware, checkAuth, checkRole("dealer"), getAllVechicles)
Router.get("/getVehiclesById/:vehicleId", tokenValidater, validaterMiddleware, checkAuth, checkRole("dealer"), getVehiclesById)

module.exports = Router