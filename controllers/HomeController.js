
const Contact = require("../models/Contact");

const homeView = (req, res) => {
  Contact.find({}).then((contacts) => {
    res.render("home", { contacts: contacts });
  });
};
module.exports = {
  homeView
};