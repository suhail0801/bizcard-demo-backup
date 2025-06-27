// const express = require("express");
// const User = require("../models/user");
// const bcrypt = require("bcrypt");

// const router = express.Router();

// router.post("/register", async (req, res) => {
//   const { fullName, email, password } = req.body;

//   const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
//     (err) => {
//       console.log("Error: ", err);
//     }
//   );

//   if (alreadyExistsUser) {
//     return res.status(409).json({ message: "User with email already exists!" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10).catch((err) => {
//     console.log("Error: ", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   });

//   const newUser = new User({ fullName, email, password: hashedPassword });
//   const savedUser = await newUser.save().catch((err) => {
//     console.log("Error: ", err);
//     res.status(500).json({ error: "Cannot register user at the moment!" });
//   });

//   if (savedUser) res.json({ message: "Thanks for registering" });
// });

// module.exports = router;


const express = require("express");
const bcrypt = require("bcrypt");
// const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  // Check if the user with the given email already exists
  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  );

  if (alreadyExistsUser) {
    return res.status(409).json({ message: "User with email already exists!" });
  }

  // Hash the password using bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds).catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  // Create a new user with the hashed password
  const newUser = new User({ fullName, email, password: hashedPassword });
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  if (savedUser) res.json({ message: "Thanks for registering" });
});

module.exports = router;
