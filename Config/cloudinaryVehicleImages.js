const cloudinary = require("cloudinary")
require("dotenv").config()

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_keyy,
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
    return uploadResult.url
}

module.exports = {cloudinaryImageUpload}