const { z } = require('zod');

const contactSchema = z.object({
  nombre: z.string().trim().min(2),
  telefono: z.string().trim().min(1),
  interes: z.string().trim().min(1),
  email: z.string().trim().email().optional(),
  edad: z.union([z.string(), z.number()]).optional(),
  horario: z.string().trim().optional(),
  mensaje: z.string().trim().optional()
});

module.exports = { contactSchema };
