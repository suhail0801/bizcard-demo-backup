// const passport = require("passport");
// const passportJwt = require("passport-jwt");
// const ExtractJwt = passportJwt.ExtractJwt;
// const StrategyJwt = passportJwt.Strategy;
// const User = require("../models/user");

// passport.use(
//   new StrategyJwt(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET,
//     },
//     function (jwtPayload, done) {
//       return User.findOne({ where: { id: jwtPayload.id } })
//         .then((user) => {
//           return done(null, user);
//         })
//         .catch((err) => {
//           return done(err);
//         });
//     }
//   )
// );

const passport = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const Strategy = passportJwt.Strategy;
// const User = require('../models/user'); // Assuming your User model is in this path

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false); // User not found
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);



