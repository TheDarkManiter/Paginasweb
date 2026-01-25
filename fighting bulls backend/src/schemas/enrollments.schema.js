const { z } = require('zod');

const enrollmentSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(40).optional(),
  program: z.string().trim().min(2).max(120),
  experienceLevel: z.string().trim().min(2).max(120),
  preferredSchedule: z.string().trim().min(2).max(120),
  source: z.string().trim().max(120).optional()
});

const enrollmentUpdateSchema = z.object({
  status: z.enum(['new', 'contacted', 'archived']).optional(),
  notes: z.string().trim().max(2000).optional(),
  preferredSchedule: z.string().trim().min(2).max(120).optional()
});

const toOptionalNumber = (value) => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  return Number(value);
};

const enrollmentQuerySchema = z.object({
  status: z.enum(['new', 'contacted', 'archived']).optional(),
  page: z.preprocess(toOptionalNumber, z.number().int().positive().optional()),
  limit: z.preprocess(toOptionalNumber, z.number().int().positive().optional())
});

const enrollmentParamsSchema = z.object({
  id: z.string().uuid()
});

module.exports = {
  enrollmentSchema,
  enrollmentUpdateSchema,
  enrollmentQuerySchema,
  enrollmentParamsSchema
};
