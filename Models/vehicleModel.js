// Orginal Code
const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
    dealerId:{type:mongoose.Schema.Types.ObjectId, ref:"User", require:true},
    brand:{type:String, require:true},
    model:{type:String, require:true},
    price:{type:Number, require:true},
    fuelType:{type:String, enum:["Petrol", "Diesel", "Electric", "Hybrid"], require:true},
    description:{type:String, require:true},
    images:[{type:String}],
    createdAt:{type:Date, default:Date.now}
})

const VehicleModel = mongoose.model("Vehicle", vehicleSchema)

module.exports = VehicleModel


// Changes Code 
// const mongoose = require("mongoose");

// const vehicleSchema = new mongoose.Schema({
//   dealerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   brand: { type: String, required: true },
//   model: { type: String, required: true },
//   price: { type: Number, required: true },
//   fuelType: { type: String, enum: ["Petrol", "Diesel", "Electric", "Hybrid"], required: true },
//   transmission: { type: String, enum: ["Manual", "Automatic"], required: true },
//   description: { type: String, required: true },
//   images: [
//     {
//       url: { type: String, required: true },
//       public_id: { type: String, required: true }
//     }
//   ],
//   createdAt: { type: Date, default: Date.now }
// });

// const VehicleModel = mongoose.model("Vehicle", vehicleSchema);
// module.exports = VehicleModel;



// GPT Code
// const mongoose = require("mongoose");

// const vehicleSchema = new mongoose.Schema({
//   dealerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   carDetails: {
//     brand: { type: String, required: true },
//     model: { type: String, required: true },
//     price: { type: Number, required: true },
//     fuelType: { type: String, required: true },
//     transmission: { type: String, required: true },
//     description: { type: String, required: true }
//   },
//   images: [
//     {
//       url: String,
//       public_id: String
//     }
//   ]
// }, { timestamps: true });

// module.exports = mongoose.model("Vehicle", vehicleSchema);
