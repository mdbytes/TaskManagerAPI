require("./db/mongoose");
const express = require("express");

const userRouter = require("./routers/UserRouter");
const taskRouter = require("./routers/TaskRouter");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Manager API Home Page");
});

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
