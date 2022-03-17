const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userId = new mongoose.Types.ObjectId();

const userData = {
  username: "george",
  email: "george1@mail.com",
  password: "1234paass1234",
  token: "",
};

const userId1 = new mongoose.Types.ObjectId();
const userData1 = {
  _id: userId1.toString(),
  username: "john",
  email: "john@mail.com",
  password: "john1234john",
  tokens: [
    {
      token: jwt.sign({ _id: userId1.toString() }, process.env.JWT_KEY),
    },
  ],
};

beforeAll(async () => {
  await new User(userData1).save();
});

afterAll(async () => {
  await User.remove();
  await await mongoose.disconnect();
});

it("Should sign up new user", async () => {
  const res = await request(app)
    .post("/users")
    .send({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    })
    .expect(201);
});

it("Should sign in user", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({
      email: userData.email,
      password: userData.password,
    })
    .expect(201);

  userData.tokens = res.body.user.tokens;
  console.log(userData.tokens);
});

it("Should sign out user", async () => {
  const res = await request(app)
    .post("/users/logout")
    .set("auth-token", userData.tokens[0].token)
    .expect(200);
});

it("Should delete user", async () => {
  const res = await request(app)
    .delete("/users/delete")
    .set("auth-token", userData1.tokens[0].token)
    .expect(200);
});
