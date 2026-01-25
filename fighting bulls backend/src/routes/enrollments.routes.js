const express = require('express');
const controller = require('../controllers/enrollments.controller');
const validateRequest = require('../middlewares/validate-request');
const { authenticateJwt, requireRoles } = require('../middlewares/auth');
const {
  enrollmentSchema,
  enrollmentUpdateSchema,
  enrollmentQuerySchema,
  enrollmentParamsSchema
} = require('../schemas/enrollments.schema');

const router = express.Router();

router.post('/', validateRequest(enrollmentSchema), controller.createEnrollment);
router.get(
  '/',
  authenticateJwt,
  requireRoles(['admin', 'staff']),
  validateRequest(enrollmentQuerySchema, 'query'),
  controller.listEnrollments
);
router.patch(
  '/:id',
  authenticateJwt,
  requireRoles(['admin', 'staff']),
  validateRequest(enrollmentParamsSchema, 'params'),
  validateRequest(enrollmentUpdateSchema),
  controller.updateEnrollment
);

module.exports = router;
