const express = require("express")
const Router = express.Router()
const {checkAuth, checkRole} = require("../Middlewares/authMiddleware.js")
const {tokenValidater, validaterMiddleware} = require("../Validators/authValidator.js")
const {addVehicles, getAllVechicles, getVehiclesById, updateVehicle, deleteVehicle} = require("../Controllers/dealerControllers.js")
const { upload } = require("../Utils/multerFileUpload.js")

Router.post("/vehicles", upload.array("images",5), tokenValidater, validaterMiddleware, checkAuth, checkRole("dealer"),  addVehicles)
Router.get("/getAllVehicles",tokenValidater, validaterMiddleware, checkAuth, checkRole("dealer"), getAllVechicles)
Router.get("/getVehiclesById/:vehicleId", tokenValidater, validaterMiddleware, checkAuth, checkRole("dealer"), getVehiclesById)
Router.put("/updateVehicle/:vehicleId", tokenValidater, validaterMiddleware, checkAuth, checkRole("dealer"), updateVehicle)
Router.delete("/deleteVehicle/:vehicleId", tokenValidater, validaterMiddleware, checkAuth, checkRole("dealer"), deleteVehicle)


module.exports = Router