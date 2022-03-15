const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const mongoose = require("mongoose");

afterAll(async () => {
  await mongoose.disconnect();
});

it("Should sign up new user", async () => {
  const res = await request(app)
    .post("/users")
    .send({
      username: "george",
      email: "george3@mail.com",
      password: "1234paass1234",
    })
    .expect(201);
});

it("Should sign in user", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({
      email: "george3@mail.com",
      password: "1234paass1234",
    })
    .expect(201);
});
