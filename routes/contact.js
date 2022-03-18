const express = require('express');

const { ContactFormView, AddContact, QrCodeView, exportContactExcel, exportContactPdf} = require('../controllers/ContactController');
const router = express.Router();
router.get('/contactFormAdd', ContactFormView);
router.post('/contactFormAdd', AddContact);
router.get('/details/:id', QrCodeView);
router.get("/downloadExcel", exportContactExcel);
router.get("/downloadPdf", exportContactPdf);

module.exports = router;    