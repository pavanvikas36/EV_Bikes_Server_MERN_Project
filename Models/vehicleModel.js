const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dealerName: { type: String, required: true },   // ✅ added
    dealerEmail: { type: String, required: true },  // ✅ added
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    fuelType: { type: String, enum: ["Petrol", "Diesel", "Electric", "Hybrid"], required: true },
    transmission: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ url: { type: String } }],
    createdAt: { type: Date, default: Date.now }
});

const VehicleModel = mongoose.model("Vehicle", vehicleSchema);

module.exports = VehicleModel;
