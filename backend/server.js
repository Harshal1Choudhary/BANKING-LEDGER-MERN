const app = require("./src/app");

// here we are starting the server, using listen method.
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
