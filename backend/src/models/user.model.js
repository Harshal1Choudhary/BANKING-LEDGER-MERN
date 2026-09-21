const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required to create a user."],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address",
      ],
      unique: [true, "Email already exists."],
    },
    name: {
      type: String,
      required: [true, "Name is required for creating an account."],
    },
    password: {
      type: String,
      required: [true, "Password is required for creating an account"],
      minlength: [6, "Password should contain more than 6 characters"],
      select: false, //Koi bhi query me by default nahi aane dega iss field ko, jab tk explcitly nahi bulaya jaaye.
    },
  },
  { timestamps: true },
);

// middleware jo bolta hai ki save k pehle isko function ko chalado
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // agar password wali field me changes nahi hai schema k, toh aage badho

  const hash = await bcrypt.hash(this.password, 10); // nahi toh hash me conver krdo
  this.password = hash;
});

// ye userSchema me method attact krdi hamesha k liye, comparePassword naamse. ye compare krti hai incoming vs existing password ko

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// module.exports = mongoose.model("User", userSchema);
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
