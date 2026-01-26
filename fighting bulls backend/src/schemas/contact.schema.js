const { z } = require('zod');

const emptyStringToUndefined = (value) => {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined;
  }
  return value;
};

const contactSchema = z.object({
  nombre: z.string().trim().min(2),
  telefono: z.string().trim().min(1),
  interes: z.string().trim().min(1),
  email: z.preprocess(emptyStringToUndefined, z.string().trim().email().optional()),
  edad: z.union([z.string(), z.number()]).optional(),
  horario: z.string().trim().optional(),
  mensaje: z.string().trim().optional()
});

module.exports = { contactSchema };
