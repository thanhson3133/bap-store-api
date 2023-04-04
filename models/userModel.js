const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please add the user name!"],
    },
    email: {
      type: String,
      require: [true, "Please add the user email address!"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      require: [true, "Please add the user password!"],
      unique: [true, "Email address already taken"],
    },
    phone: {
      type: String,
      require: [true, "Please add the phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
