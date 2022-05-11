const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

userRoutes.route("/quiz").get(function (req, res) {
  let db_connect = dbo.getDb("webbiskools");
  db_connect
    .collection("quizzes")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

userRoutes.route("/quiz/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("quizzes").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

userRoutes.route("/quiz/delete/:id").delete((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("quizzes").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    res.json(obj);
  });
});

// This section will help you create a new record.
userRoutes.route("/quiz/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    title: req.body.title,
    questions: req.body.questions,
  };
  db_connect.collection("quizzes").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

userRoutes.route("/login").post(async function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { username: req.body.username };
  db_connect.collection("users").findOne(myquery, async function (err, result) {
    if (err) throw err;

    if (req.body.username === "" || req.body.password === "") {
      res.json({
        response: "invalid credentials entered",
      });
    }

    try {
      const isMatch = await bcrypt.compare(req.body.password, result.password);
      res.json({
        response: "Details match!",
        authenticated: isMatch,
        permissions: result.permissions,
        user: result.name,
      });
    } catch (error) {
      res.json({
        response: "invalid credentials entered",
      });
    }
  });
});

module.exports = userRoutes;
