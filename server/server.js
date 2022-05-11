const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const User = require("./models/users");
const Quizzes = require("./models/quizzes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(cors());

//connect to mongodb database//
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected!"));

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
app.use(express.Router());

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

app.get("/quiz", async (req, res) => {
  const quizzes = await Quizzes.find();
  res.json(quizzes);
});

app.get("/quiz/:id", async (req, res) => {
  const quizzes = await Quizzes.findById(req.params.id);
  res.json(quizzes);
});

app.delete("/quiz/delete/:id", async (req, res) => {
  const id = req.params.id;
  const quizzes = await Quizzes.deleteOne({ id });
  res.json(quizzes);
});

app.post("/quiz/add", async (req, res) => {
  const quizzes = await Quizzes.create(req.body);
  res.json(quizzes);
});

app.post("/login", async (req, res) => {
  if (req.body.password === null || req.body.password === "") {
    res.json({
      response: "Please enter a valid password!",
    });
  } else if (req.body.name === null || req.body.name === "") {
    res.json({
      response: "Please enter a valid username!",
    });
  } else if (req.body.email === null || req.body.email === "") {
    res.json({
      response: "Please enter a valid Email address!",
    });
  } else {
    try {
      const user = await User.findOne({ email: req.body.email });
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      console.log(isMatch);

      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };
        res.cookie("jwt", token, cookieOptions);
        res.cookie("hi", "hello");

        console.log(req.cookies);

        res.json({
          response: "Details match!",
          authenticated: isMatch,
          user: user.username,
        });
      } else {
        console.log("here");
        res.json({
          response: "Username or Password incorrect!",
        });
      }
    } catch (error) {
      console.log("or here");
      res.json({
        response: "Username or Password incorrect!",
      });
    }
    // console.log(req.body.name, req.body.email, req.body.password);
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
