const express = require("express");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.routes");

const app = express(); // this is server instance saved in variable named app. express is our server.

app.use(express.json()); // express itna capable nahi hai ki request ki body ko padh sake toh isi liye hum pehle json me convert karte hai taaki bechara padh sake use. // toh ye middle ware use kar rahe hai.

app.use(cookieParser());

app.use("/api/auth", authRouter);

module.exports = app;
