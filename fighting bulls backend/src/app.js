const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { pool } = require('./db/pool');

const validateRequest = require('./middlewares/validate-request');
const { contactSchema } = require('./schemas/contact.schema');
const { postContact } = require('./controllers/contact.controller');
const contactRoutes = require('./routes/contact.routes');
const enrollmentsRouter = require('./routes/enrollments.routes');
const errorHandler = require('./middlewares/error-handler');

const app = express();

app.use(helmet());
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean)
  : null;

if (corsOrigins && !corsOrigins.includes('http://localhost:5173')) {
  corsOrigins.push('http://localhost:5173');
}

app.use(cors({
  origin: corsOrigins || true
}));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/health/db', async (req, res, next) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

app.post('/.netlify/functions/create-lead', validateRequest(contactSchema), postContact);
app.use('/api', contactRoutes);
app.use('/api/v1/enrollments', enrollmentsRouter);

app.use(errorHandler);

module.exports = app;
