const express = require("express");
const cookieParser = require("cookie-parser");

const app = express(); // this is server instance saved in variable named app. express is our server.

app.use(express.json()); // express itna capable nahi hai ki request ki body ko padh sake toh isi liye hum pehle json me convert karte hai taaki bechara padh sake use. // toh ye middle ware use kar rahe hai.

app.use(cookieParser());

const authRouter = require("./routes/auth.routes");
const accountRouter = require("./routes/accounts.routes");

app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);

module.exports = app;
