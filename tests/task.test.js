const keys = require("../src/config/keys");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const Task = require("../src/models/Task");
const User = require("../src/models/User");
const {
  userOne,
  userTwo,
  taskOneId,
  taskOne,
  taskTwo,
  taskThree,
  taskFour,
  setupDatabase,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create a new user task", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      task: "Mow the grass",
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("Should fetch user tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
});

test("user should be able to delete their own task", async () => {
  const param = taskTwo._id.toString();
  const response = await request(app)
    .delete(`/tasks/${param}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const task = await Task.findById(taskTwo._id);
  expect(task).toBeNull();
});

test("Should not delete other users task", async () => {
  const response = await request(app)
    .delete(`/tasks/${taskFour._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(400);

  const task = await Task.findById(taskFour._id);
  expect(task).not.toBeNull();
});
