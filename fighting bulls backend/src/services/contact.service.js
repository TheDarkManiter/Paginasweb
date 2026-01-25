const { insertContactLead } = require("../db/contact-leads.db");

function toAgeRange(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const numeric = Number(value);
  if (!Number.isNaN(numeric)) {
    if (numeric <= 12) return "0-12";
    if (numeric <= 17) return "13-17";
    if (numeric <= 24) return "18-24";
    if (numeric <= 34) return "25-34";
    if (numeric <= 44) return "35-44";
    if (numeric <= 54) return "45-54";
    return "55+";
  }

  return String(value);
}

async function createContactLead(payload) {
  const normalized = {
    name: payload.nombre,
    phone: payload.telefono,
    interest: payload.interes,
    age_range: toAgeRange(payload.edad),
    email: payload.email ?? null,
    preferred_time: payload.horario ?? null,
    message: payload.mensaje ?? null
  };

  const result = await insertContactLead(normalized);
  return { id: result.id, created_at: result.created_at };
}

module.exports = { createContactLead };
