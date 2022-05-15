const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(email) {
      if (!validator.isEmail(email)) {
        throw new Error("Email is not valid!");
      }
    },
  },
  role: {
    type: String,
    default: "User",
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Your password is too common");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.statics.findAndCompareUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Unable to login!");
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new Error("Unable to login!");
    }
    return user;
  } catch (er) {
    // return(er)
  }
};

userSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  } catch (err) {
    console.log(err);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
