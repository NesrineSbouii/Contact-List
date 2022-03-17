const express = require('express');
require('./auth/passport')
var flash = require('express-flash')
const app = express();
LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const mongoose = require('mongoose');
const User = require('./models/User');

const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const passport = require('passport')
const session = require('express-session');
app.set('view engine', 'ejs');
app.use(session({ secret: 'olhosvermelhoseasenhaclassica', maxAge:null }))
app.use(flash());

//BodyParsing
app.use(express.urlencoded({ extended: false }));
//Routes
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/contact'));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(cors());
passport.use(new LocalStrategy(
  {usernameField: 'email', passwordField: 'password'},
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { console.log(err); return done(err); }
      if (!user) { console.log("Not user"); return done(null, false); }
      if (!bcrypt.compare(password, user.password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;

mongoose.connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('e don connect'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server don start for port: " + PORT))