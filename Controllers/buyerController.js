const VehicleModel = require("../Models/vehicleModel.js")

exports.viewAllVehicles = async (req, res, next) => {
    try {
        const vechiles = await VehicleModel.find()
        return res.json({message: "All Vehicles", data: vechiles})
    } catch (error) {
        return res.status(500).json({
            message: "All vehicles server error",
            error: error.message
        })
    }
    // res.send("All Vehicles")
}

exports.viewVehiclesById = async (req, res, next) => {
    try {
        const {id} = req.params
        const vehicle = await VehicleModel.findById(id)

        if(!vehicle){
            return res.status(404).json({message: "Vehicle Not Found"})
        }

        return res.json({message: "Vechile Detils", data: vehicle})
    } catch (error) {
        return res.status(500).json({
            message: "Vechile Details Server Error",
            error: error.message
        })
    }
    // res.send("Vehicle Details")
}