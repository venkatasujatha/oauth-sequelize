const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const router = require("./routes/router");
require("dotenv").config();
const config = require("./config/config");
app.set("view engine", "ejs");

app.use(session({ resave: false, saveUninitialized: true, secret: "SECRET" }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (Object, cb) {
  cb(null, Object);
});
passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebookAuth.clientId,
      clientSecret: config.facebookAuth.clientScret,
      callbackURL: config.facebookAuth.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
app.listen(process.env.port, () => {
  console.log(`server running on port ${process.env.port}`);
});
