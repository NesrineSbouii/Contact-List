const express = require('express');

const { ContactFormView, AddContact, QrCodeView} = require('../controllers/ContactController');
const router = express.Router();
router.get('/contactFormAdd', ContactFormView);
router.post('/contactFormAdd', AddContact);
router.get('/details/:id', QrCodeView);

module.exports = router;    