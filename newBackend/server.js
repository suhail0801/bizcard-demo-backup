const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

require("dotenv").config();
// require("./auth/passport");
// const User = require("./models/user")
// require("./models/user");

const { isLoggedIn } = require('./middlewares/authMiddleware')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const api = require("./api");

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../frontend/public/uploads')));


app.get("/validate", isLoggedIn, (req, res) => {
  if(req.user) return res.status(200).json(req.user)
});
// User routes
app.get('/user/all', api.getUsers)
app.post("/user/register", api.registerUser)

app.post("/login", api.webLogin);
app.get("/login", isLoggedIn, (req, res) => {
  // This handler will only be reached if the token is valid
  console.log('fh')
  res.send("hi token generated")
});

  


// Card Routes

// OLD
app.get("/usercards", isLoggedIn, api.getUserCards)
app.get("/usercard/:id", isLoggedIn, api.getUserCardById)
app.post("/usercards",isLoggedIn, api.addUserCards)
app.put("/usercards", isLoggedIn, api.updateUserCards)
app.delete("/usercards/:userCardId", api.deleteUserCards)

// NEW
app.post("/card", isLoggedIn, api.addCard)
app.put("/card", isLoggedIn, api.updateCard)
app.get("/card/:id", isLoggedIn, api.getCard)
app.get("/cards", isLoggedIn, api.getAllCards)
app.get("/publiccard", api.getPublicCard) //Open API



app.get("/template", api.getCardTemplates)
app.get("/template/:id", api.getCardTemplateById)
// Admin Could Add Templates
app.post("/template", api.addTemplate)

app.delete("/cards/:id", api.deleteSavedCard);

// Contact Routes
app.post("/contacts", isLoggedIn, api.addContact);
app.get("/contacts", isLoggedIn, api.getContacts);
app.delete("/contacts/:id", isLoggedIn, api.deleteContact);

// User profile routes
app.get('/user/profile', isLoggedIn, api.getUserProfile); // current user
app.get('/user/profile/:id', api.getUserProfile); // by id (public)
app.put('/user/profile', isLoggedIn, api.updateUserProfile);

// Public: get all contacts related to a user (for biz card page)
app.get('/contacts/allrelated', api.getAllRelatedContacts);

// app.get('/api/v1/userid',getUserId, (req, res) => {
//   console.log('hi cc');
//   // res.send(`userId: ${req.customData} Hi there!`);
//   const userId = req.userId
//   res.json({userId});
// });

// // Use the middleware for the /api/v1/login endpoint
// app.get("/api/v1/login", apiIsLoggedIn, (req, res) => {
//   // This handler will only be reached if the token is valid
//   console.log('fh')
//   res.send("hi token generated")
// });

// app.use("/api/v1" ,api);

// app.use(notFound);
// app.use(errorHandler);


const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

module.exports = app