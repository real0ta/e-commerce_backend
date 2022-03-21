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
  email: "testt@mail.com",
  password: "john1234john",
  role: 1,
  tokens: [
    {
      token: jwt.sign({ _id: userId1.toString() }, process.env.JWT_KEY),
    },
  ],
};

let category = {};
beforeAll(async () => {
  await new User(userData1).save();
});

afterAll(async () => {
  await Category.deleteOne({ name: "Music" });
  await User.deleteOne({ email: userData1.email });
  await await mongoose.disconnect();
});

it("Should create new category", async () => {
  const res = await request(app)
    .post("/category")
    .set("auth-token", userData1.tokens[0].token)
    .send({
      name: "Music",
    })
    .expect(201);
  expect(res.body).toMatchObject({
    category: "Music",
  });
});

it("Should return all categories", async () => {
  const res = await request(app).get("/category").expect(201);
  category = res.body;
});

it("Should not delete category", async () => {
  const res = await request(app)
    .delete(`/category/1231241245124`)
    .set("auth-token", userData1.tokens[0].token)
    .expect(404);
  expect(res.body.msg).toBe("Category not found");
});

it("Should delete category", async () => {
  const res = await request(app)
    .delete(`/category/${category.categories[0]._id}`)
    .set("auth-token", userData1.tokens[0].token)
    .expect(200);
});

it("Should not create new category without admin role", async () => {
  const user = await User.updateOne({ email: userData1.email }, { role: 0 });
  const res = await request(app)
    .post("/category")
    .set("auth-token", userData1.tokens[0].token)
    .send({
      name: "Music",
    })
    .expect(403);

  expect(res.body.msg).toBe("Access denied");
});
