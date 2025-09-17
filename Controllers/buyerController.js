const VehicleModel = require("../Models/vehicleModel.js")
const mongoose = require("mongoose"); 

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

// exports.viewVehiclesById = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const vehicle = await VehicleModel.findById(id);

//         if (!vehicle) {
//             return res.status(404).json({ message: "Vehicle Not Found" });
//         }

//         return res.json({
//             message: "Vehicle Details",
//             data: vehicle
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Vehicle Details Server Error",
//             error: error.message
//         });
//     }
// };



// Corrected viewVehiclesById function
exports.viewVehiclesById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Check if ID is provided
        if (!id) {
            return res.status(400).json({ message: "Vehicle ID is required" });
        }
        
        // Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid vehicle ID format" });
        }

        const vehicle = await VehicleModel.findById(id);

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle Not Found" });
        }

        return res.json({
            message: "Vehicle Details Retrieved Successfully",
            data: vehicle
        });
    } catch (error) {
        console.error("Vehicle Details Server Error:", error);
        return res.status(500).json({
            message: "Server Error While Fetching Vehicle Details",
            error: error.message
        });
    }
};
