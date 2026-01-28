
app.use(morgan('dev'));

// Root (Railway)
app.get("/", (req, res) => {
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

app.post('/.netlify/functions/create-lead', validateRequest(contactSchema), postContact);
app.use('/api', contactRoutes);
app.use('/api/v1/enrollments', enrollmentsRouter);

app.use(errorHandler);

module.exports = app;
