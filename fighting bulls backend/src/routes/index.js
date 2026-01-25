const express = require('express');

const contactRoutes = require('./contact.routes');
const enrollmentRoutes = require('./enrollments.routes');

const router = express.Router();

router.use('/contact', contactRoutes);
router.use('/enrollments', enrollmentRoutes);

module.exports = router;
