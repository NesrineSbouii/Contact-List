const excelJS = require("exceljs");
const Contact = require("../models/Contact");
const qrCode = require('../dist/qrcode');
var fs = require('fs');
var pdf = require('html-pdf');

const ContactFormView = (req, res) => {
  res.render("contactFormAdd", {
  });
};

const QrCodeView = (req, res) => {
  Contact.findById(req.params.id).then((contact) => {
    if (contact) {
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
    var testCard = {
      firstName: username,
      cellPhone: phoneNumber
    }
    const newContact = new Contact({
      username,
      email,
      phoneNumber,
      notes,
      qrcode: qrCode.createVCardQr(testCard, { typeNumber: 30, cellSize: 1 })
    });
    newContact
      .save()
      .then(res.redirect("/home"))
      .catch((err) => console.log(err));
  };
}


const exportContactExcel = async (req, res) => {
  const workbook = new excelJS.Workbook();  // Create a new workbook
  const worksheet = workbook.addWorksheet("My Contacts"); // New Worksheet
  const path = "./files";  // Path to download excel
  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "ID", key: "counter", width: 10 },
    { header: "User Name", key: "username", width: 10 },
    { header: "Phone Number", key: "phoneNumber", width: 10 },
    { header: "Email", key: "email", width: 10 },
    { header: "Notes", key: "notes", width: 10 },
  ];
  // Looping through User data
  let counter = 1;
  Contact.find({}).then((contacts) => {
    contacts.forEach((contact) => {
      contact.counter = counter;
      console.log({ email: contact.email, username: contact.username });
      worksheet.addRow(contact); // Add data in worksheet
      counter++;
    })
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const data = await workbook.xlsx.writeFile(`${path}/contacts.xlsx`)
      .then(() => {
        res.send({
          status: "success",
          message: "file successfully downloaded",
          path: `${path}/contacts.xlsx`,
        });
      });
  } catch (err) {
    res.send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const exportContactPdf = async (req, res) => {
  var table = "";
  table += "<table border='1' style='width:100%;word-break:break-word;'>";
  table += "<tr>";
  table += "<th > User Name </th>";
  table += "<th > Email </th>";
  table += "<th > Notes </th>";
  table += "</tr>";

  Contact.find({}).then((contacts) => {
    contacts.forEach((contact) => {
      table += "<tr>";
      table += "<td>" + contact.username + "</td>";
      table += "<td>" + contact.email + "</td>";
      table += "<td>" + contact.notes + "</td>";
      table += "</tr>";
    })
  });

  table += "</table>";

  var options = {
    "format": "A4",
    "orientation": "landscape",
    "border": {
      "top": "0.1in",
    },
    "timeout": "120000"
  };
  pdf.create(table, options).toFile('./files/contacts.pdf', function (err, result) {
    if (err) return console.log(err);
    res.send({
      status: "success",
      message: "file successfully downloaded",
      path: `./files/contacts.pdf`,
    });
  });
};
module.exports = {
  ContactFormView,
  AddContact,
  QrCodeView,
  exportContactExcel,
  exportContactPdf
};