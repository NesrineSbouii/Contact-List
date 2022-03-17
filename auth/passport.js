//js
const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

//Load model
const User = require("../models/User");
