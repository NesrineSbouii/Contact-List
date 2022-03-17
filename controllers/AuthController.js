const User = require("../models/User");
const Contact = require("../models/Contact");

const bcrypt = require("bcryptjs");
const passport = require("passport");
//For Register Page
const registerView = (req, res) => {
  res.render("register", {
  });
}
// For View 
const loginView = (req, res) => {
  console.log(req.session.flash)
  res.render("login", {
  });
}

// For View 
const homeView = (req, res) => {
  Contact.find({}, then((contacts) => {
    res.render("home", { contacts: contacts });
  }));
}

const loginUser = (req, res) => {
  const { email, password } = req.body;
  //Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email,
      password,
    });
  }
};
//Post Request that handles Register
const registerUser = (req, res) => {
  const { name, email, password, confirm } = req.body;
  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  } else if (password !== confirm) {
    console.log("Password must match");
  } else {
    //Validation
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("email exists");
        res.render("register", {
          name,
          email,
          password,
          confirm,
        });
      } else {
        //Validation
        const newUser = new User({
          name,
          email,
          password,
        });
        //Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("/login"))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};
module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
  homeView
};