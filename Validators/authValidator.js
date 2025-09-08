const {body, validationResult} = require("express-validator")

const signupValidater = [
    body("name").isLength({ min: 3, max: 50 }).trim().isString().withMessage("Required Name"),
    body("username").isLength({ min: 3, max: 30 }).trim().isString().withMessage("Required Username"),
    body("email").trim().isEmail().isLength({ max: 100 }).withMessage("Required Email").normalizeEmail(),
    // body("password").isLength({ min: 8, max: 20 }).isAlphanumeric().withMessage("Required Password"),
    body("password")
        .isLength({ min: 8, max: 20 }).withMessage("Password must be 8–20 characters long")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[@$!%*?&#]/).withMessage("Password must contain at least one special character"),

    (req, res, next) => {
        const result = validationResult(req)
        // console.log(error)
        // console.log(result.isEmpty())
        if(!result.isEmpty()){
            return res.status(400).json({message:"Validation error", error: result.errors})
        }
        next()
    }
]

module.exports = {signupValidater}


// const { body } = require("express-validator");

// // Signup Validator Middleware
// const signupValidator = [
//   body("name")
//     .isString().withMessage("Name must be a string")
//     .isLength({ min: 3, max: 50 }).withMessage("Name must be 3–50 characters long")
//     .trim(),

//   body("username")
//     .isString().withMessage("Username must be a string")
//     .isLength({ min: 3, max: 30 }).withMessage("Username must be 3–30 characters long")
//     .trim(),

//   body("email")
//     .isEmail().withMessage("Invalid email format")
//     .isLength({ max: 100 }).withMessage("Email must not exceed 100 characters")
//     .normalizeEmail(),

//   body("password")
//     .isLength({ min: 8, max: 20 }).withMessage("Password must be 8–20 characters long")
//     .matches(/[0-9]/).withMessage("Password must contain at least one number")
//     .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
//     .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
//     .matches(/[@$!%*?&#]/).withMessage("Password must contain at least one special character")
// ];

// module.exports = { signupValidator };

