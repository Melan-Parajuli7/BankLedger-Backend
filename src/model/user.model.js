const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required....!!!"],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email Address....!!!",
      ],
      unique: [true, "Email Already Exists....!!!"],
    },
    name: {
      type: String,
      required: [true, "Username is required....!!!"],
    },
    password: {
      type: String,
      required: [true, "Password is required....!!!"],
      minlength: [6, "Password must contains 6 characters"],
      select: false,
    },
    systemUser: {
      type: Boolean,
      immutable: true,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10); // 10 resembles the number of salts
  this.password = hash;
  return;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
