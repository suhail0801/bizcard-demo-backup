// const express = require("express");
// const User = require("../models/user");
// const jwt = require("jsonwebtoken");

// const router = express.Router();

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const userWithEmail = await User.findOne({ where: { email } }).catch(
//     (err) => {
//       console.log("Error: ", err);
//     }
//   );

//   if (!userWithEmail)
//     return res
//       .status(400)
//       .json({ message: "Email or password does not match!" });

//   if (userWithEmail.password !== password)
//     return res
//       .status(400)
//       .json({ message: "Email or password does not match!" });

//   const jwtToken = jwt.sign(
//     { id: userWithEmail.id, email: userWithEmail.email },
//     process.env.JWT_SECRET
//   );

//   res.json({ message: "Welcome Back!", token: jwtToken });
// });

// module.exports = router;


const express = require("express");
// const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user with the given email
  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  );

  // Check if the user exists
  if (!userWithEmail) {
    return res.status(400).json({ message: "Email does not match!!" });
  }

  // Compare the entered password with the hashed password in the database
  const isPasswordMatch = await bcrypt.compare(password, userWithEmail.password);

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "password does not match!!" });
  }

  // If the password matches, generate a JWT token
  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET
  );

  res.json({ message: "Welcome Back!", token: jwtToken });
});

module.exports = router;
