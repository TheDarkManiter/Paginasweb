const { createContactLead } = require("../services/contact.service");
const crypto = require("crypto");

function fingerprintDatabaseUrl() {
  const url = process.env.DATABASE_URL || "";
  if (!url) return "missing";
  return crypto.createHash("sha256").update(url).digest("hex").slice(0, 12);
}

async function postContact(req, res, next) {
  try {
    const result = await createContactLead(req.body);
    return res.status(201).json({ ok: true, data: result });
  } catch (err) {
    console.error({
      msg: "contact.create.failed",
      db_fp: fingerprintDatabaseUrl(),
      err_message: err.message,
      err_code: err.code,
      err_detail: err.detail,
      err_constraint: err.constraint
    });
    return next(err);
  }
}

module.exports = { postContact };
