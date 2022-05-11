const mongoose = require("mongoose");

//tables in mongodb are called collections
const users = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  permissions: {
    type: Object,
    require: true,
  },
});

module.exports = mongoose.model("users", users);
