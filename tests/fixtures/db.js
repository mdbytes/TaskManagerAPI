const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/User");
const Task = require("../../src/models/Task");
const keys = require("../../src/config/keys");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "Fred Flintstone",
  password: "ItsTheFlintstones",
  email: "fred@flintstone.com",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, keys.jwtSecretKey),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
  _id: userTwoId,
  name: "Barney Rubble",
  password: "ItsTheFlintstones",
  email: "barney@rubble.com",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, keys.jwtSecretKey),
    },
  ],
};

const taskOneId = new mongoose.Types.ObjectId();

const taskOne = {
  _id: taskOneId,
  task: "Mow the grass",
  completed: false,
  owner: userOneId,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  task: "Take out the garbage",
  completed: true,
  owner: userOneId,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  task: "Pick up Rose from work",
  completed: false,
  owner: userTwoId,
};

const taskFour = {
  _id: new mongoose.Types.ObjectId(),
  task: "Paint the living room",
  completed: true,
  owner: userTwoId,
};

const setupDatabase = async () => {
  await User.deleteMany({});
  await Task.deleteMany({});
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
  await new Task(taskFour).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOneId,
  taskOne,
  taskTwo,
  taskThree,
  taskFour,
  setupDatabase,
};
