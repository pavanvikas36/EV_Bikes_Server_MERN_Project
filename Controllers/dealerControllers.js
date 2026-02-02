const VehicleModel = require("../Models/vehicleModel.js")
const {cloudinaryImageUpload} = require("../Config/cloudinaryVehicleImages.js")
const fs = require("fs")

exports.addVehicles = async (req, res) => {
    try {
        const {brand, model, price, fuelType, transmission, description} = req.body

        if(!brand || !model || !price || !fuelType || !transmission || !description){
            return res.status(400).json({message: "All required fields must be provided"})
        }

        let uploadImages = []
        if(req.files && req.files.length > 0){
            for(let file of req.files) {
                const result = await cloudinaryImageUpload(file.path, {folder: "vehicles"})
                uploadImages.push({url: result.url, public_id: result.public_id})

                // Delete local file after upload to Cloudinary
                fs.unlinkSync(file.path);
            }
        }
        console.log(uploadImages)
        console.log(req.userInfo)
        const vehicle = new VehicleModel({
            dealerId: req.userInfo.id,
            dealerName: req.userInfo.name,
            dealerEmail: req.userInfo.email,
            brand,
            model,
            price,
            fuelType,
            transmission,
            description,
            images: uploadImages
        })
        console.log(vehicle)
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


// exports.updateVehicle = async (req, res) => {
//     try {
//         const {vehicleId} = req.params
//         const updates = req.body

//         const vehicle = await VehicleModel.findByIdAndUpdate({_id: vehicleId, dealerId: req.userInfo.id}, updates, {new: true})

//         if(!vehicle){
//             return res.status(404).json({message: "Vehicle not found or not authorized"})
//         }
//         return res.json({ message: "Vehicle Updated Successfully", data: vehicle });
//     } catch (error) {
//         return res.status(500).json({ message: "Vechile Not Found Server Error", error: error.message })
//     }
// }

exports.updateVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const updatedVehicle = await VehicleModel.findOneAndUpdate(
      {
        _id: vehicleId,
        dealerId: req.userInfo.id,
      },
      {
        $set: {
          brand: req.body.brand,
          model: req.body.model,
          price: req.body.price,
          fuelType: req.body.fuelType,
          transmission: req.body.transmission,
          description: req.body.description,
        },
      },
      {
        new: true,
        runValidators: false, // 🔥 KEY FIX
      }
    );

    if (!updatedVehicle) {
      return res.status(404).json({
        message: "Vehicle not found or not authorized",
      });
    }

    return res.json({
      message: "Vehicle Updated Successfully",
      data: updatedVehicle,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Vehicle Update Server Error",
      error: error.message,
    });
  }
};


exports.deleteVehicle = async (req, res) => {
  try {
    const {vehicleId} = req.params; // ✅ get actual id

    const vehicle = await VehicleModel.findOne({
      _id: vehicleId,
      dealerId: req.userInfo.id, // ensure dealer is authorized
    });

    if (!vehicle) {
      return res
        .status(404)
        .json({ message: "Vehicle not found or not authorized" });
    }

    // ✅ Delete images from Cloudinary
    if (vehicle.images && vehicle.images.length > 0) {
      for (let img of vehicle.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    // ✅ Delete vehicle from DB
    await vehicle.deleteOne();

    return res.json({ message: "Vehicle Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};


