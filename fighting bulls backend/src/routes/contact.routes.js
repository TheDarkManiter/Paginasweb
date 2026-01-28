const express = require("express");
const validateRequest = require("../middlewares/validate-request");
const { contactSchema } = require("../schemas/contact.schema");
const { postContact } = require("../controllers/contact.controller");

const router = express.Router();

router.post("/contact", validateRequest(contactSchema), postContact);
router.post("/leads", validateRequest(contactSchema), postContact);

module.exports = router;
