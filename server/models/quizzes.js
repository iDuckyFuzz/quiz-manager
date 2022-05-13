const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  correct_answers: {
    type: Array,
  },
  incorrect_answers: {
    type: Array,
  },
});

const quizzes = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  questions: {
    type: [questionsSchema],
    require: true,
  },
});

module.exports = mongoose.model("quizzes", quizzes);
