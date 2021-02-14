// const { request, response } = require("express");
const express = require("express");
const router = express.Router();
// const signIn = require("../models/user");
const db = require("../models");

// router.post("/", (request, response) => {
//   const signInUser = new signIn({
//     email: request.body.email,
//     password: request.body.password,
//   });
//   signInUser
//     .save()
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((error) => {
//       response.json(error);
//     });
// });

router.post("/signin", async (req, res, next) => {
  try {
    console.log("signinnnnnnnnnnnn", req.body);
    const user = await db.User.findOne({
      username: req.body.username,
    });
    const valid = await user.comparePassword(req.body.password);
    console.log("valid", valid);
    if (valid) {
      return res.status(200).json({
        user,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    return next({ status: 400, message: "Invalid Username/Password" });
  }
});

router.post("/vote", async (req, res, next) => {
  try {
    console.log("voteee", req.body.user);
    const cand = await db.Candidate.findOne({
      candidate: req.body.candidate,
    });
    const user = await db.User.findOne({
      username: req.body.user.username,
    });
    user.vote = cand.id;
    user.save();
    cand.n_of_votes += 1;

    //   const valid = await user.comparePassword(req.body.password);
    //   console.log("valid", valid);
    //   if (valid) {
    //     return res.status(200).json({
    //       user,
    //     });
    //   } else {
    //     throw new Error();
    //   }
    cand.save();
    return res.status(200).json({ message: "voted" });
  } catch (err) {
    return next({ status: 400, message: "Invalid Username/Password" });
  }
});

router.get("/get_candidates", async (req, res, next) => {
  try {
    console.log("in get_candidates");
    const candidates = await db.Candidate.find();
    return res.status(200).json(candidates);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
