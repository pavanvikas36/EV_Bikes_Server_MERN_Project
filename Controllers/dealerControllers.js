const VehicleModel = require("../Models/vehicleModel.js")
const {cloudinaryImageUpload} = require("../Config/cloudinaryVehicleImages.js")
const fs = require("fs")

// Orginal Code
exports.addVehicles = async (req, res) => {
    console.log("REQ BODY:", req.body);
    try {
        const {brand, model, price, fuelType, transmission, description} = req.body

        if(!brand || !model || !price || !fuelType || !transmission || !description){
            return res.status(400).json({message: "All required fields must be provided"})
        }

        let uploadImages = []
        if(req.files && req.files.length > 0){
            for(let file of req.files) {
                const result = await cloudinaryImageUpload.uploader.upload(file.path, {folder: "vehicles"})
                uploadImages.push({url: result.secure_url, public_id: result.public_id})

                // Delete local file after upload to Cloudinary
                fs.unlinkSync(file.path)
            }
        }
        const vehicle = new VehicleModel({
            dealerId: req.userInfo.id,
            brand,
            model,
            price,
            fuelType,
            transmission,
            description,
            images: uploadImages
        })
        const savedVehicle = await vehicle.save()
        return res.status(201).json({message: "Vehicle Added Successfully", data: savedVehicle})

    } catch (error) {
        console.error("Vehicle POST Error:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}



exports.getAllVechicles = async (req, res) => {
    try {
        const vehicles = await VehicleModel.find({dealerId: req.userInfo.id})
        return res.json({message: "All Vehicles", data: vehicles})
    } catch (error) {
        return res.status(500).json({ message: "All Vehicles Server Error", error: error.message });
    }
}



exports.getVehiclesById = async (req, res) => {
    try {
        const {vehicleId} = req.params
        const vehicle = await VehicleModel.findOne({_id: vehicleId, dealerId: req.userInfo.id})

        if(!vehicle) return res.status(400).json({message: "Vehicle Not Found"})
        
        return res.json({message: "Vehicle Details", data: vehicle})
    } catch (error) {
        return res.status(500).json({ message: "Vechile Not Found Server Error", error: error.message });
    }
}


exports.updateVehicle = async (req, res) => {
    try {
        const {vehicleId} = req.params
        const updates = req.body

        // prevent accidental overwrite of images
        // if(updates.images){
        //     delete updates.images
        // }

        const vehicle = await VehicleModel.findByIdAndUpdate({_id: vehicleId, dealerId: req.userInfo.id}, updates, {new: true})

        if(!vehicle){
            return res.status(404).json({message: "Vehicle not found or not authorized"})
        }
        return res.json({ message: "Vehicle Updated Successfully", data: vehicle });
    } catch (error) {
        return res.status(500).json({ message: "Vechile Not Found Server Error", error: error.message })
    }
}



exports.deleteVehicle = async (req, res) => {
    try {
        const {vehicleId} = req.params

        const vechile = await VehicleModel.findOne({_id: vehicleId, dealerId: req.userInfo.id})
        if(!vechile) return res.status(404).json({message: "Vehicle not found or not authorized"})
        
        // Delete images from Cloudinary
        for (let img of vechile.images) {
            await cloudinaryImageUpload.uploader.destroy(img.public_id)
        }
        await vechile.deleteOne()
        return res.json({ message: "Vehicle Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}


