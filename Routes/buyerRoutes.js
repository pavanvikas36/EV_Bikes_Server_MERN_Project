const express = require("express")
const Router = express.Router()
const {viewAllVehicles, viewVehiclesById, addToWishlistById, removeFromWishlistById} = require("../Controllers/buyerController.js")
const {tokenValidater, validaterMiddleware} = require("../Validators/authValidator.js")
const { checkAuth, checkRole } = require("../Middlewares/authMiddleware.js")


Router.get("/viewAllVehicles", tokenValidater, validaterMiddleware, checkAuth, checkRole("buyer"), viewAllVehicles)
Router.get("/viewVehicles/:vehicleId", tokenValidater, validaterMiddleware, checkAuth, checkRole("buyer"), viewVehiclesById)
Router.post("/viewVehicles/addToWishlist/:vehicleId", tokenValidater, validaterMiddleware, checkAuth, checkRole("buyer"), addToWishlistById)
Router.delete("/viewVehicles/deleteWishlist/:vehicleId", tokenValidater, validaterMiddleware, checkAuth, checkRole("buyer"), removeFromWishlistById)


module.exports = Router