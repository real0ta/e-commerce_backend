const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { userThree, userFour } = require("./data");
beforeAll(async () => {
  await new User(userFour).save();
});

afterAll(async () => {
  await User.deleteOne({ email: userFour.email });
  await User.deleteOne({ email: userThree.email });
  await await mongoose.disconnect();
});

it("Should sign up new user", async () => {
  const res = await request(app)
    .post("/users")
    .send({
      username: userThree.username,
      email: userThree.email,
      password: userThree.password,
    })
    .expect(201);
});

it("Should not find user and sign in", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({
      email: "userData.email",
      password: userThree.password,
    })
    .expect(404);
});

it("Should not sign in user", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({
      email: userThree.email,
      password: "userThree.password",
    })
    .expect(404);
});

it("Should sign in user", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({
      email: userThree.email,
      password: userThree.password,
    })
    .expect(201);

  userThree.token = res.body.token;
  expect(res.body).toMatchObject({
    username: userThree.username,
    email: userThree.email,
    token: userThree.token,
  });
});

it("Should not sign out user", async () => {
  const res = await request(app)
    .post("/users/logout")
    .set("auth-token", "userData..token")
    .expect(401);
});

it("Should log out user", async () => {
  const res = await request(app)
    .post("/users/logout")
    .set("auth-token", userThree.token)
    .expect(200);

  expect(res.body).toMatchObject({
    username: userThree.username,
    email: userThree.email,
  });
});

it("Should delete user", async () => {
  const res = await request(app)
    .delete("/users/delete")
    .set("auth-token", userFour.tokens[0].token)
    .expect(200);

  expect(res.body).toMatchObject({
    username: userFour.username,
    email: userFour.email,
  });
});
