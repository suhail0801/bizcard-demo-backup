const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const jwt = require('jsonwebtoken'); // Import jwt
const getUserId = require("./isAuth/getUserId")
const apiIsLoggedIn = require('./isAuth/authMiddleware'); // Import the middleware
const bodyParser = require("body-parser");

require("dotenv").config();
require("./auth/passport");
// const User = require("./models/user")
// require("./models/user");

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    
    console.log(users);
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/api/v1/userid',getUserId, (req, res) => {
  console.log('hi cc');
  // res.send(`userId: ${req.customData} Hi there!`);
  const userId = req.userId
  res.json({userId});
});

// Use the middleware for the /api/v1/login endpoint
app.get("/api/v1/login", apiIsLoggedIn, (req, res) => {
  // This handler will only be reached if the token is valid
  console.log('fh')
  res.send("hi token generated")
});

app.use("/api/v1" ,api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app