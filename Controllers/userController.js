// Main Code
// const {UserModel} = require("../Models/authModel.js")
// const bcryptjs = require("bcryptjs")
// const {cloudinaryFileUpload} = require("../Utils/cloudinary.js")
// const fs = require("fs")

// const getProfile = async (req, res, next) => {
//     try {
//         const user = await UserModel.findById(req.userInfo.id)
//         return res.json(user)
//     } catch (error) {
//         next({statusCode: 400, message: "Somthig went wrong"})
//     }
// }

// const editProfile = async (req, res) => {
//     try {
//         const {name, username, email, password} = req.body
//         const profileimage = req.file
//         const fileurl = await cloudinaryFileUpload(profileimage.path)
//         fs.unlinkSync(profileimage.path)
//         console.log(fileurl)
//         const userId = req.userInfo
//         if(name || username || email || password){
//             const hashPassword = await bcryptjs.hashSync(password, 12)
//             const updateUser = await UserModel.findByIdAndUpdate(userId, {name, username, password: hashPassword, email, profilepic: fileurl}, {new: true})
//             console.log(updateUser)
//             res.json({message: "Update Sucessfully", updateUser})
//         }
//     } catch (error) {
//         res.json(error)
//     }
// }

// module.exports = {getProfile, editProfile}




const bcryptjs = require("bcryptjs");
const { BuyerModel } = require("../Models/buyerModel.js");
const { DealerModel } = require("../Models/dealerModel.js");
const { cloudinaryFileUpload } = require("../Utils/cloudinary.js");
const fs = require("fs");

// ✅ Get Profile
const getProfile = async (req, res, next) => {
  try {
    let user;
    if (req.userInfo.role === "buyer") {
      user = await BuyerModel.findById(req.userInfo.id).select(
        "-password -createdAt -updatedAt -__v"
      );
    } else if (req.userInfo.role === "dealer") {
      user = await DealerModel.findById(req.userInfo.id).select(
        "-password -createdAt -updatedAt -__v"
      );
    } else {
      return next({ statusCode: 400, message: "Invalid role" });
    }

    if (!user) {
      return next({ statusCode: 404, message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    next({ statusCode: 400, message: "Something went wrong" });
  }
};

// ✅ Edit Profile
const editProfile = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    let fileUrl;

    // Handle profile image upload
    if (req.file) {
      fileUrl = await cloudinaryFileUpload(req.file.path);
      fs.unlinkSync(req.file.path);
    }

    // Hash password only if updated
    let hashPassword;
    if (password) {
      hashPassword = await bcryptjs.hash(password, 12);
    }

    const updateData = {
      ...(name && { name }),
      ...(username && { username }),
      ...(email && { email }),
      ...(password && { password: hashPassword }),
      ...(fileUrl && { profilepic: fileUrl }),
    };

    let updatedUser;
    if (req.userInfo.role === "buyer") {
      updatedUser = await BuyerModel.findByIdAndUpdate(
        req.userInfo.id,
        updateData,
        { new: true }
      ).select("-password -createdAt -updatedAt -__v");
    } else if (req.userInfo.role === "dealer") {
      updatedUser = await DealerModel.findByIdAndUpdate(
        req.userInfo.id,
        updateData,
        { new: true }
      ).select("-password -createdAt -updatedAt -__v");
    } else {
      return next({ statusCode: 400, message: "Invalid role" });
    }

    if (!updatedUser) {
      return next({ statusCode: 404, message: "User not found" });
    }

    return res.json({ message: "Updated successfully", user: updatedUser });
  } catch (error) {
    next({ statusCode: 400, message: error.message });
  }
};

module.exports = { getProfile, editProfile };
