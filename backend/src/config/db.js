const mongoose = require("mongoose");

// Mongoose is the package used to connect express server to Mongo.
function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Server is connected to DB"))
    .catch((err) => {
      console.log(`Some error occured, Error: ${err}`);
      process.exit(1); // Important, since we don't want to keep consuming the resources when DB is throwing error.
    });
}

module.exports = connectToDB;
