// const mongoose = require("mongoose")

// const authSchema = new mongoose.Schema({
//     name: {type:String, require:true},
//     username: {type:String, require:true, unique:true},
//     email: {type:String, require:true, unique:true},
//     password: {type:String, require:true},
//     role: {
//         type:String, 
//         require:true,
//         enum:["buyer", "dealer"],
//         default: "buyer"
//     },
//     profilepic: {type:String}
// }, {timestamps:true})

// const UserModel = mongoose.model("users", authSchema)

// module.exports = {UserModel}