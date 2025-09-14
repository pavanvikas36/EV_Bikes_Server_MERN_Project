const cloudinary = require("cloudinary")
require("dotenv").config()

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret,
})

// Upload an image
async function cloudinaryImageUpload(file){
    const uploadResult = await cloudinary.uploader
        .upload(
            file
        )
        .catch((error) => {
            console.log(error);
        });
    return uploadResult
}

module.exports = {cloudinaryImageUpload}