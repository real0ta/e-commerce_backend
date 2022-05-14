const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const mongoose = require("mongoose");
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
    .post("/user/")
    .send({
      username: userThree.username,
      email: userThree.email,
      password: userThree.password,
    })
    .expect(201);
});

it("Should not find user and sign in", async () => {
  const res = await request(app)
    .post("/user/login")
    .send({
      email: "userData.email",
      password: userThree.password,
    })
    .expect(404);
});

it("Should not sign in user", async () => {
  const res = await request(app)
    .post("/user/login")
    .send({
      email: userThree.email,
      password: "userThree.password",
    })
    .expect(404);
});

it("Should sign in user", async () => {
  const res = await request(app)
    .post("/user/login")
    .send({
      email: userThree.email,
      password: userThree.password,
    })
    .expect(201);
});

it("Should delete user", async () => {
  const res = await request(app)
    .delete("/user/delete")
    .set("Authentication", userFour.tokens[0].token)
    .expect(200);

  expect(res.body).toMatchObject({
    username: userFour.username,
    email: userFour.email,
  });
});
