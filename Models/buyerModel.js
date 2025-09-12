// const mongoose = require("mongoose");

// const buyerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     default: "buyer",
//   },
//   profilepic: { type: String },
// }, { timestamps: true });

// const BuyerModel = mongoose.model("buyers", buyerSchema);

// module.exports = { BuyerModel };


const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "buyer" },
  profilepic: { type: String },
}, { timestamps: true });

const BuyerModel = mongoose.model("buyers", buyerSchema);

module.exports = { BuyerModel };
