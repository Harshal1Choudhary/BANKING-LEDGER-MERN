require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");

connectToDB(); // This will connect to mongo database

// here we are starting the server, using listen method.
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
