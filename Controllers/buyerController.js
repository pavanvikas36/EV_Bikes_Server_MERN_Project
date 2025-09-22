const VehicleModel = require("../Models/vehicleModel.js")
const { BuyerModel } = require("../Models/buyerModel.js")
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
}

exports.viewVehiclesById = async (req, res, next) => {
    try {
        const { vehicleId } = req.params;  // ✅ match route param

        // Check if ID is provided
        if (!vehicleId) {
            return res.status(400).json({ message: "Vehicle ID is required" });
        }

        // Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
            return res.status(400).json({ message: "Invalid vehicle ID format" });
        }

        const vehicle = await VehicleModel.findById(vehicleId);

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

exports.addToWishlistById = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const buyerId = req.userInfo.id;

    // Validate vehicleId
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: "Invalid Vehicle Id Format" });
    }

    // Get vehicle details
    const vehicle = await VehicleModel.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle Not Found" });
    }

    // Find buyer
    const buyer = await BuyerModel.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer Not Found" });
    }

    // Check if already in wishlist
    if (buyer.wishlist.some(item => item.vehicleId.toString() === vehicleId)) {
      return res.status(400).json({ message: "Vehicle Already In Wishlist" });
    }

    // ✅ Push full vehicle snapshot
    buyer.wishlist.push({
      vehicleId: vehicle._id,
      brand: vehicle.brand,
      model: vehicle.model,
      price: vehicle.price,
      fuelType: vehicle.fuelType,
      transmission: vehicle.transmission,
      description: vehicle.description,
      images: vehicle.images
    });

    await buyer.save();

    return res.json({
      message: "Vehicle added to wishlist successfully",
      wishlist: buyer.wishlist
    });
  } catch (error) {
    console.error("Add to Wishlist Error:", error);
    return res.status(500).json({
      message: "Server Error While Adding To Wishlist",
      error: error.message
    });
  }
};

exports.viewAllWishlist = async (req, res) => {
  try {
    const buyerId = req.userInfo.id;

    // Find buyer
    const buyer = await BuyerModel.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer Not Found" });
    }

    // Check if wishlist is empty
    if (!buyer.wishlist || buyer.wishlist.length === 0) {
      return res.json({ message: "Wishlist is empty", wishlist: [] });
    }

    return res.json({
      message: "Wishlist retrieved successfully",
      wishlist: buyer.wishlist
    });
  } catch (error) {
    console.error("View Wishlist Error:", error);
    return res.status(500).json({
      message: "Server Error While Fetching Wishlist",
      error: error.message
    });
  }
};


exports.removeFromWishlistById = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const buyerId = req.userInfo.id;

    // Validate vehicleId
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: "Invalid Vehicle Id Format" });
    }

    // Find buyer
    const buyer = await BuyerModel.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer Not Found" });
    }

    // Check if vehicle exists in wishlist
    const exists = buyer.wishlist.some(
      (item) => item.vehicleId.toString() === vehicleId
    );
    if (!exists) {
      return res.status(404).json({ message: "Vehicle Not Found In Wishlist" });
    }

    // ✅ Remove vehicle from wishlist
    buyer.wishlist = buyer.wishlist.filter(
      (item) => item.vehicleId.toString() !== vehicleId
    );

    await buyer.save();

    return res.json({
      message: "Vehicle removed from wishlist successfully",
      wishlist: buyer.wishlist,
    });
  } catch (error) {
    console.error("Remove from Wishlist Error:", error);
    return res.status(500).json({
      message: "Server Error While Removing From Wishlist",
      error: error.message,
    });
  }
};
