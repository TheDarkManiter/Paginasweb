const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const { pool } = require('./db/pool');
const contactRoutes = require('./routes/contact.routes');
const enrollmentsRouter = require('./routes/enrollments.routes');
const errorHandler = require('./middlewares/error-handler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Root (Railway)
app.get('/', (req, res) => {
  res.json({ ok: true });
});

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

app.use('/api', contactRoutes);
app.use('/api/v1/enrollments', enrollmentsRouter);

app.use(errorHandler);

module.exports = app;
