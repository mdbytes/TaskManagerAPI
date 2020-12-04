const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");
const keys = require("../src/config/keys");

beforeEach(setupDatabase);

test("Should sign up a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Wilma Flintstone",
      email: "wilma@flintstone.com",
      password: "ItsTheFlintstones",
    })
    .expect(201);

  // Assert user was saved to db correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about response
  expect(response.body).toMatchObject({
    user: {
      name: "Wilma Flintstone",
      email: "wilma@flintstone.com",
    },
    token: user.tokens[0].token,
  });

  // Assert password has been modifed before saved
  expect(user.password).not.toBe("ItsTheFlintstones");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  //Assert that a new token has been added for the user
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "imposter@crime.com",
      password: "cheatersRus",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  // Assert that user actually deleted from db
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete account for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  const response = await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("upload", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ email: "fred@bedrock.com" })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.email).toBe("fred@bedrock.com");
});

test("Should not update invalid user fields", async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "Cedar Rapids" })
    .expect(400);
});
