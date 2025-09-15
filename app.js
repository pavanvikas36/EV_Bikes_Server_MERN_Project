const express = require("express")
const app = express()
require("dotenv").config()
const authRoutes = require("./Routes/authRoutes.js")
const profileRouter = require("./Routes/userRouter.js")
const dealerRouter = require("./Routes/dealerRoutes.js")
const buyerRouter = require("./Routes/buyerRoutes.js")
const {errorHandler} = require("./Middlewares/errorMiddleware.js")
const connectDB = require("./Config/database.js")
const cors = require("cors")
const fs = require("fs")
connectDB()

app.use(cors({
    origin: "http://localhost:5173",
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

const checkFolder = fs.existsSync("Uploads")
if(checkFolder == false){
    fs.mkdirSync("Uploads")
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", authRoutes)
app.use("/user", profileRouter)
app.use("/dealers", dealerRouter)
app.use("/buyer", buyerRouter)

app.use(errorHandler)

app.listen(process.env.port, () => {
    console.log("Server Started On Port No " + process.env.port)
})



// New Re Writen Code
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const authRoutes = require("./Routes/authRoutes.js");
// const connectDB = require("./Config/database.js");

// const app = express();

// // Connect Database
// connectDB();

// // Middleware
// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/auth", authRoutes);

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);

//   res.status(err.status || 500).json({
//     status: err.status || 500,
//     message: err.message || "Internal Server Error",
//     errors: err.errors || []
//   });
// });

// // Start Server
// const port = process.env.port || 5000;
// app.listen(port, () => {
//   console.log(`🚀 Server started on port ${port}`);
// });
