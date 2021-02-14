require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("debug", true);
// mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_ACCESS, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = require("../models");

const users = [
  { username: "username", password: "password", type: 0 },
  { username: "kelvin", password: "password", type: 1 },
];

const candidates = [
  { candidate: "candidate1", n_of_votes: 0 },
  { candidate: "candidate2", n_of_votes: 0 },
  { candidate: "candidate3", n_of_votes: 0 },
  { candidate: "candidate4", n_of_votes: 0 },
  { candidate: "candidate5", n_of_votes: 0 },
  { candidate: "candidate6", n_of_votes: 0 },
];

const seed = async () => {
  try {
    await db.User.remove();
    console.log("DROP ALL USERS");
    await db.Candidate.remove();
    console.log("DROP ALL Candidates");
    await Promise.all(
      users.map(async (user) => {
        const data = await db.User.create(user);
        await data.save();
      })
    );
    // console.log('CREATED USERS', JSON.stringify(users));
    await Promise.all(
      candidates.map(async (candidate) => {
        const data = await db.Candidate.create(candidate);
        await data.save();
      })
    );
    // console.log('CREATED POLLS', JSON.stringify(polls));
  } catch (err) {
    console.error(err);
  }
};

seed();
