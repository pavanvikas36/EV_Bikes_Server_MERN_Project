const express = require("express")
const app = express()
require("dotenv").config()
const authRoutes = require("./Routes/authRoutes.js")
const connectDB = require("./Config/database.js")

connectDB()

app.use(express.json())
app.use(express.urlencoded(true))

app.use("/auth", authRoutes)

app.listen(process.env.port, () => {
    console.log("Server Started On Port No " + process.env.port)
})