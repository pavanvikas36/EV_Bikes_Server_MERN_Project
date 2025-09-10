const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dtcam6kvz',
    api_key: '391623324884167',
    api_secret: '9pm1cN2b8VlYenY6RDJt5y4-YRI',
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