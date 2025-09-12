// const mongoose = require("mongoose");

// const dealerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     default: "dealer",
//   },
//   profilepic: { type: String },
// }, { timestamps: true });

// const DealerModel = mongoose.model("dealers", dealerSchema);

// module.exports = { DealerModel };



const mongoose = require("mongoose");

const dealerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "dealer" },
  profilepic: { type: String },
}, { timestamps: true });

const DealerModel = mongoose.model("dealers", dealerSchema);

module.exports = { DealerModel };
