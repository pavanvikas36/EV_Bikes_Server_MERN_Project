// Main Code
const {body, validationResult, header} = require("express-validator")

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

    // (req, res, next) => {
    //     const result = validationResult(req)
    //     // console.log(error)
    //     // console.log(result.isEmpty())
    //     if(!result.isEmpty()){
    //         // return res.status(400).json({message:"Validation error", error: result.errors})
    //         const err = {statusCode:400, message: "Validation error", errors: result.errors}
    //         next(err)
    //     }
    //     next()
    // }
]


const loginValidater = [
    body("email").trim().isEmail().withMessage("Required Email").normalizeEmail(),
    body("password").isString().withMessage("Required Password"),

    // (req, res, next) => {
    //     const results = validationResult(req)
    //     if(!results.isEmpty()){
    //         const err = {statusCode:400, message: "Validation error", errors: results.errors}
    //         next(err)
    //     }
    //     next()
    // }
]


const tokenValidater = [
    header("Authorization").isString().withMessage("Required Token")
]

const editProfileValidater = [
    body("name").optional().isLength({ min: 3, max: 50 }).trim().isString().withMessage("Required Name"),
    body("username").optional().isLength({ min: 3, max: 30 }).trim().isString().withMessage("Required Username"),
    body("email").optional().trim().isEmail().isLength({ max: 100 }).withMessage("Required Email").normalizeEmail(),
    // body("password").isLength({ min: 8, max: 20 }).isAlphanumeric().withMessage("Required Password"),
    body("password").optional()
        .isLength({ min: 8, max: 20 }).withMessage("Password must be 8–20 characters long")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[@$!%*?&#]/).withMessage("Password must contain at least one special character"),
]

const validaterMiddleware = (req, res, next) => {
        const results = validationResult(req)
        if(!results.isEmpty()){
            const err = {statusCode:400, message: "Validation error", errors: results.errors}
            // console.log("validator error",results.errors )
            next(err)
        }
        // console.log("VALIDATOR BODY:", req.body); // 👀
        next()
    }

module.exports = {signupValidater, loginValidater, tokenValidater, editProfileValidater, validaterMiddleware}



// New Code (Re writen Code)
// const { body, validationResult } = require("express-validator");

// const signupValidator = [
//   // Name validation
//   body("name")
//     .trim()
//     .isLength({ min: 3, max: 50 })
//     .withMessage("Name must be between 3 and 50 characters"),

//   // Username validation
//   body("username")
//     .trim()
//     .isLength({ min: 3, max: 30 })
//     .withMessage("Username must be between 3 and 30 characters"),

//   // Email validation
//   body("email")
//     .trim()
//     .isEmail()
//     .withMessage("Invalid email format")
//     .isLength({ max: 100 })
//     .withMessage("Email must not exceed 100 characters")
//     .normalizeEmail(),

//   // Password validation
//   body("password")
//     .isLength({ min: 8, max: 20 })
//     .withMessage("Password must be 8–20 characters long")
//     .matches(/[0-9]/)
//     .withMessage("Password must contain at least one number")
//     .matches(/[A-Z]/)
//     .withMessage("Password must contain at least one uppercase letter")
//     .matches(/[a-z]/)
//     .withMessage("Password must contain at least one lowercase letter")
//     .matches(/[@$!%*?&#]/)
//     .withMessage("Password must contain at least one special character"),

//   // Final validation handler
//   (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         status: 400,
//         message: "Validation error",
//         errors: errors.array(), // cleaner array instead of raw object
//       });
//     }

//     next();
//   },
// ];

// module.exports = { signupValidator };


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

