const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const Category = require("../src/models/category");
const User = require("../src/models/user");
const jwt = require("jsonwebtoken");

const userId1 = new mongoose.Types.ObjectId();
const userData1 = {
  _id: userId1.toString(),
  username: "john",
  email: "johnn@mail.com",
  password: "john1234john",
  role: 1,
  tokens: [
    {
      token: jwt.sign({ _id: userId1.toString() }, process.env.JWT_KEY),
    },
  ],
};

beforeAll(async () => {
  await Category.remove();
  await User.remove();
  await new User(userData1).save();
});

afterAll(async () => {
  await await mongoose.disconnect();
});

it("Should create new category", async () => {
  const res = await request(app)
    .post("/category")
    .set("auth-token", userData1.tokens[0].token)
    .send({
      name: "Books",
    })
    .expect(201);
  expect(res.body).toMatchObject({
    category: "Books",
  });
});

it("Should not create new category without admin role", async () => {
  const user = await User.update({ email: userData1.email }, { role: 0 });
  const res = await request(app)
    .post("/category")
    .set("auth-token", userData1.tokens[0].token)
    .send({
      name: "Books",
    })
    .expect(401);
});

it("Should return all categories", async () => {
  const res = await request(app).get("/category").expect(201);
  console.log(res.body);
});
