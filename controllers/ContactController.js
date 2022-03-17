const Contact = require("../models/Contact");
const qrCode = require('../dist/qrcode');
const ContactFormView = (req, res) => {
  res.render("contactFormAdd", {
  });
};

const QrCodeView =  (req, res) => {
  Contact.findById(req.params.id).then((contact) => {
    if(contact){
      console.log(contact.qrcode);
      res.render("qrcode", {
        qrcode: contact.qrcode 
      });
    }
  })
};



const AddContact = (req, res) => {
  const { username, email, phoneNumber, notes } = req.body;
  if (!username || !email || !phoneNumber || !notes) {
    console.log("Fill empty fields");
  } else if (phoneNumber.lengeth > 8) {
    console.log("Phone number not valid");
  } else {
    //Validation
    var  testCard= {
      firstName: username,
      cellPhone: phoneNumber
    }
    const newContact = new Contact({
      username,
      email,
      phoneNumber,
      notes,
      qrcode: qrCode.createVCardQr(testCard, {typeNumber: 30, cellSize: 1})  
    });
    newContact
      .save()
      .then(res.redirect("/home"))
      .catch((err) => console.log(err));
  };
}
module.exports = {
  ContactFormView,
  AddContact,
  QrCodeView
};