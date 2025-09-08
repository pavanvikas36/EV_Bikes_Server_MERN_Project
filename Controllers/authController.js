// const bcryptjs = require("bcryptjs")
// const {UserModel} = require("../Models/authModel.js")

// const signupController = async (req, res, next) => {
//     try {
//         const {name, username, email, password, role} = req.body
//         const hashPassword = await bcryptjs.hashSync(password, 12)
//         const user = await UserModel.create({
//             name: name,
//             username: username,
//             email: email,
//             password: hashPassword,
//             role: "dealer"
//         })
//        // const result = await user.save()
//        // res.json(result)
//         res.json(user)
//     } catch (error) {
//         console.log(error)
//         res.status(400).send("Somthing Went Wrong")
//     }
// }

// const loginController = (req, res) => {
//     res.send("Login API")
// }

// module.exports = {signupController, loginController}



const bcryptjs = require("bcryptjs");
const { UserModel } = require("../Models/authModel.js");

const signupController = async (req, res, next) => {
  try {
    const { name, username, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password (async version)
    const hashPassword = await bcryptjs.hash(password, 12);

    // create new user
    const user = new UserModel({
      name,
      username,
      email,
      password: hashPassword,
      role: role || "dealer", // default role
    });

    const result = await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result._id,
        name: result.name,
        username: result.username,
        email: result.email,
        role: result.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const loginController = (req, res) => {
  res.send("Login API");
};

module.exports = { signupController, loginController };
