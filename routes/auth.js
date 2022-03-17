const express = require('express');
const { registerView, loginView, registerUser, loginUser } = require('../controllers/AuthController');
const { protectRoute, allowIf } = require("../auth/protect");
const passport = require("passport");

const { homeView } = require("../controllers/HomeController");
const router = express.Router();
router.get('/register', registerView);
router.get('/login', loginView);

router.post('/register', registerUser);
router.post('/login', passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
}));
router.get("/home" , homeView);
// passport.authenticate('local', { failureRedirect: '/login', failureMessage: false })
module.exports = router;    