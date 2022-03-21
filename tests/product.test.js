const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const Category = require("../src/models/category");
const User = require("../src/models/user");
const Product = require("../src/models/product");
const jwt = require("jsonwebtoken");

const userId1 = new mongoose.Types.ObjectId();
const userData1 = {
  _id: userId1.toString(),
  username: "john",
  email: "test@mail.com",
  password: "john1234john",
  role: 1,
  tokens: [
    {
      token: jwt.sign({ _id: userId1.toString() }, process.env.JWT_KEY),
    },
  ],
};

const product = {
  name: "Book collection #1",
  description: "Book collection volume 1",
  price: 200,
  quantity: 5,
  category: "Books",
};

let returnedProduct;
beforeAll(async () => {
  await new User(userData1).save();
  await new Category({ name: "Books" }).save();
});

afterAll(async () => {
  await Category.deleteOne({ name: "Books" });
  await User.deleteOne({ email: userData1.email });
  await await mongoose.disconnect();
});

it("Should create new product", async () => {
  const res = await request(app)
    .post("/product")
    .set("auth-token", userData1.tokens[0].token)
    .field({
      ...product,
    })
    .attach("photo", "tests/book.jpg")
    .expect(201);

  returnedProduct = res.body.product;
});

it("Should not create new product", async () => {
  const res = await request(app)
    .post("/product")
    .set("auth-token", userData1.tokens[0].token)
    .field({
      ...product,
    })
    .expect(400);

  expect(res.body).toMatchObject({
    msg: "Could not create product",
  });
});

it("Should find product by id", async () => {
  const res = await request(app)
    .get(`/product/${returnedProduct._id}`)
    .expect(200);

  expect(res.body).toMatchObject(returnedProduct);
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
    .delete(`/product/${returnedProduct._id}`)
    .set("auth-token", userData1.tokens[0].token)
    .expect(200);

  expect(res.body).toMatchObject(returnedProduct);
});

it("Should not delete product by id", async () => {
  const res = await request(app)
    .delete(`/product/returnedProduct._id}`)
    .set("auth-token", userData1.tokens[0].token)
    .expect(400);

  expect(res.body).toMatchObject({
    msg: "Could not delete product",
  });
});
