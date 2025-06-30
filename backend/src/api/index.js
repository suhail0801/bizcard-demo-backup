const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const paymentApi = require("./payment");
const cardDataApi = require("./cardData");
const cardTemplateApi = require("./cardTemplate");
const usercardsApi = require("./userCards");


const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(paymentApi);
router.use(cardDataApi);
router.use(cardTemplateApi);
router.use(usercardsApi);
 
module.exports = router;
