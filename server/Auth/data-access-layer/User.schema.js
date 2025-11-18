const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  UserName: {
    type: String,
    required: true,
    trim: true,
  },

  Email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Email must be in the format username@gmail.com"],
  },

  Password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
