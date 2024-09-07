const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  account: {
    characters: [
      {
        type: String,
        require: true,
      },
    ],
    comics: [
      {
        type: String,
        require: true,
      },
    ],
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
