const { createContactLead } = require("../services/contact.service");

async function postContact(req, res) {
  try {
    const result = await createContactLead(req.body);
    return res.status(201).json({ ok: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
}

module.exports = { postContact };
