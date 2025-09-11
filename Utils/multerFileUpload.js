const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "Uploads"))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: {fileSize: 5 * 1024 * 1024},
  fileFilter: (req, file, cb) => {
    if(file.mimetype.startsWith("images/")){
      cb(null, true)
    }else{
      cb(new Error("Only image files are allowed!"), false)
    }
  }
})

module.exports = {upload}