const { pool } = require("./pool");

async function insertContactLead(normalizedData) {
  const values = {
    name: normalizedData.name ?? null,
    phone: normalizedData.phone ?? null,
    interest: normalizedData.interest ?? null,
    age_range: normalizedData.age_range ?? null,
    email: normalizedData.email ?? null,
    preferred_time: normalizedData.preferred_time ?? null,
    message: normalizedData.message ?? null
  };

  const result = await pool.query(
    `INSERT INTO contact_leads
      (name, phone, interest, age_range, email, preferred_time, message)
     VALUES
      ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, created_at`,
    [
      values.name,
      values.phone,
      values.interest,
      values.age_range,
      values.email,
      values.preferred_time,
      values.message
    ]
  );

  return result.rows[0];
}

module.exports = { insertContactLead };
