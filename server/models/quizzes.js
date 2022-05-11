const mongoose = require("mongoose");

//tables in mongodb are called collections
const quizzes = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  questions: {
    type: Array,
    require: true,
  },
});

module.exports = mongoose.model("quizzes", quizzes);
