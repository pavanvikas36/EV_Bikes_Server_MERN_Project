const {UserModel} = require("../Models/authModel.js")

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
        const userId = req.userInfo
        if(name || username || email || password){
            const updateUser = await UserModel.findByIdAndUpdate(userId, {name, username, password, email})
            console.log(updateUser)
            res.send("Update Sucessfully")
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = {getProfile, editProfile}