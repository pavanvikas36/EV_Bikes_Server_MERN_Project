const cloudinary = require('cloudinary').v2;
require("dotenv").config()

cloudinary.config({
    cloud_name: process.env.cloudinary_profile_cloud_name,
    api_key: process.env.cloudinary_profile_api_key,
    api_secret: process.env.cloudinary_profile_api_secret,
});

// Upload an image
async function cloudinaryFileUpload(file){
    const uploadResult = await cloudinary.uploader
        .upload(
            file
        )
        .catch((error) => {
            console.log(error);
        });
    return uploadResult.url
}

module.exports = {cloudinaryFileUpload}