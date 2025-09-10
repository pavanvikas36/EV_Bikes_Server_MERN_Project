const {UserModel} = require("../Models/authModel.js")
const bcryptjs = require("bcryptjs")
const {cloudinaryFileUpload} = require("../Utils/cloudinary.js")
const fs = require("fs")

const getProfile = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.userInfo.id)
        return res.json(user)
    } catch (error) {
        next({statusCode: 400, message: "Somthig went wrong"})
    }
}

const editProfile = async (req, res) => {
    try {
        const {name, username, email, password} = req.body
        const profileimage = req.file
        const fileurl = await cloudinaryFileUpload(profileimage.path)
        fs.unlinkSync(profileimage.path)
        console.log(fileurl)
        const userId = req.userInfo
        if(name || username || email || password){
            const hashPassword = await bcryptjs.hashSync(password, 12)
            const updateUser = await UserModel.findByIdAndUpdate(userId, {name, username, password: hashPassword, email, profilepic: fileurl}, {new: true})
            console.log(updateUser)
            res.json({message: "Update Sucessfully", updateUser})
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = {getProfile, editProfile}