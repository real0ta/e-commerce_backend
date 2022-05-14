const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId.toString(),
  username: "userOne",
  email: "userOne@mail.com",
  password: "userOneuserOne",
  role: "Admin",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId.toString() }, process.env.JWT_KEY),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  username: "userTwo",
  email: "userTwo@mail.com",
  password: "userTwo",
  role: 1,
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId.toString() }, process.env.JWT_KEY),
    },
  ],
};

const userTheeId = new mongoose.Types.ObjectId();
const userThree = {
  _id: userTheeId,
  username: "userThree",
  email: "userThree@mail.com",
  password: "userThreeuserThree",
  token: ""
};

const userFourId = new mongoose.Types.ObjectId();
const userFour = {
  _id: userFourId,
  username: "userFour",
  email: "userFour@mail.com",
  password: "userFour",
  tokens: [
    {
      token: jwt.sign({ _id: userFourId.toString() }, process.env.JWT_KEY),
    },
  ],
};

const categoryId = new mongoose.Types.ObjectId();
const category = {
  name: "Books",
  _id: categoryId,
};

const productImgPath = path.basename("tests/book.png");
const productOne = {
  name: "Book collection #1",
  description: "Book collection volume 1",
  price: 200,
  quantity: 5,
  categoryName: "Books",
  category: categoryId.toString(),
  photo: productImgPath,
};

const productTwoId = new mongoose.Types.ObjectId();
const productTwo = {
  _id: productTwoId,
  name: "Book collection #2",
  description: "Book collection volume 2",
  price: 100,
  quantity: 2,
  categoryName: "Books",
  category: categoryId,
  photo: productImgPath,
};

module.exports = {
  userOne,
  userTwo,
  userThree,
  userFour,
  category,
  productOne,
  productTwo,
};
