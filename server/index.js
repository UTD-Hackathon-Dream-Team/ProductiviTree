const express = require("express");
var cors = require("cors");

const connectDB = require("./config/db");

//Set up environment
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

connectDB();

const users = require("./router/userRouter");
const posts = require("./router/postRouter");
const challenges = require("./router/challengeRouter");
const activities = require("./router/activityRouter");

//Initialize app as express app
const app = express();

//GET hello world
app.get("/", (req, res) => {
  res.status(200).send("Hello, world!").end();
});

//Enable cross-origin resource sharing
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());

app.use("/api/v1/users", users);
app.use("/api/v1/posts", posts);
app.use("/api/v1/activities", activities);
app.use("/api/v1/challenges", challenges);

//Set up and start app connection
const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
