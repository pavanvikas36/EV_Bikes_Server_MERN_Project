const bcryptjs = require("bcryptjs");
const { UserModel } = require("../Models/authModel.js");
const {generateToken} = require("../Utils/tokens.js")

const signupController = async (req, res, next) => {
  try {
    const { name, username, email, password, role } = req.body;
    const hashPassword = await bcryptjs.hashSync(password, 12);
    const user = await UserModel.create({
      name: name,
      username: username,
      email: email,
      password: hashPassword,
      role: "dealer",
    });
    res.json(user);
  } catch (error) {
    const err = { statusCode: 400, message: error.message };
    next(err);
  }
};

const loginController = async(req, res, next) => {
  try {
    const {email, password} = req.body
    const findUser = await UserModel.findOne({email: email})
    const decryptPassword = await bcryptjs.compare(password, findUser.password)
    const user = await UserModel.findById(findUser._id).select(["-password", "-createdAt", "-updatedAt", "-__v"])
    if(decryptPassword){
      const token = await generateToken(findUser)
      return res.status(200).json({message: "Login Sucessfully", user, token})
    }else{
      return res.status(400).json({message: "Invalid Email And Password"})
    }
  } catch (error) {
    const err = { statusCode: 400, message: error.message };
    next(err);
  }
};

module.exports = { signupController, loginController };

// New Code (Re writen the main code)
// const bcryptjs = require("bcryptjs");
// const { UserModel } = require("../Models/authModel.js");

// const signupController = async (req, res, next) => {
//   try {
//     const { name, username, email, password, role } = req.body;

//     // check if user already exists
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // hash password (async version)
//     const hashPassword = await bcryptjs.hash(password, 12);

//     // create new user
//     const user = new UserModel({
//       name,
//       username,
//       email,
//       password: hashPassword,
//       role: role || "dealer", // default role
//     });

//     const result = await user.save();

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: result._id,
//         name: result.name,
//         username: result.username,
//         email: result.email,
//         role: result.role,
//       },
//     });
//   } catch (error) {
//     console.error("Signup Error:", error.message);
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// };

// const loginController = (req, res) => {
//   res.send("Login API");
// };

// module.exports = { signupController, loginController };
