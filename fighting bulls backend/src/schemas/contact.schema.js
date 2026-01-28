const { z } = require('zod');

const emptyStringToUndefined = (value) => {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }
  return value;
};

const spanishSchema = z
  .object({
    nombre: z.string().trim().min(2),
    telefono: z.string().trim().min(1),
    interes: z.string().trim().min(1),
    email: z.preprocess(emptyStringToUndefined, z.string().trim().email().optional()),
    edad: z.union([z.string(), z.number()]).optional(),
    horario: z.string().trim().optional(),
    mensaje: z.string().trim().optional(),
    consent: z.preprocess(
      (value) => (value === undefined ? true : value),
      z.literal(true)
    )
  })
  .transform((data) => data);

const englishSchema = z
  .object({
    fullName: z.string().trim().min(2),
    phone: z.string().trim().min(1),
    interest: z.string().trim().min(1),
    email: z.preprocess(emptyStringToUndefined, z.string().trim().email().optional()),
    age: z.union([z.string(), z.number()]).optional(),
    schedule: z.string().trim().optional(),
    message: z.string().trim().optional(),
    consent: z.preprocess(
      (value) => (value === undefined ? true : value),
      z.literal(true)
    )
  })
  .transform((data) => ({
    nombre: data.fullName,
    telefono: data.phone,
    interes: data.interest,
    email: data.email,
    edad: data.age,
    horario: data.schedule,
    mensaje: data.message,
    consent: data.consent
  }));

// Accept either Spanish or English payloads, require consent=true
const contactSchema = z.union([spanishSchema, englishSchema]);

module.exports = { contactSchema };
