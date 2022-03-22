const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const Category = require("../src/models/category");
const User = require("../src/models/user");
const Product = require("../src/models/product");
const jwt = require("jsonwebtoken");
const { userTwo, category, productOne, productTwo } = require("./data");

beforeAll(async () => {
  await new User(userTwo).save();
  await new Category(category).save();
  await new Product(productTwo).save();
});

afterAll(async () => {
  await Category.deleteOne({ name: "Books" });
  await User.deleteOne({ email: userTwo.email });
  await Product.deleteOne({ _id: productTwo._id });
  await Product.deleteOne({ name: productOne.name });
  await await mongoose.disconnect();
});

it("Should create new product", async () => {
  const res = await request(app)
    .post("/product")
    .set("auth-token", userTwo.tokens[0].token)
    .field({
      ...productOne,
    })
    .attach("photo", "tests/book.jpg")
    .expect(201);
});

it("Should not create new product", async () => {
  const res = await request(app)
    .post("/product")
    .set("auth-token", userTwo.tokens[0].token)
    .send({})
    .expect(400);

  expect(res.body).toMatchObject({
    msg: "Could not create product",
  });
});

it("Should find product by id", async () => {
  const res = await request(app).get(`/product/${productTwo._id}`).expect(200);
});

it("Should not find product by id", async () => {
  const res = await request(app)
    .get(`/product/returnedProduct._id`)
    .expect(404);

  expect(res.body).toMatchObject({
    msg: "Could not find product",
  });
});

it("Should delete product by id", async () => {
  const res = await request(app)
    .delete(`/product/${productTwo._id}`)
    .set("auth-token", userTwo.tokens[0].token)
    .expect(200);
});

it("Should not delete product by id", async () => {
  const res = await request(app)
    .delete(`/product/returnedProduct._id}`)
    .set("auth-token", userTwo.tokens[0].token)
    .expect(400);

  expect(res.body).toMatchObject({
    msg: "Could not delete product",
  });
});
