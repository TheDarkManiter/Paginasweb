function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const error = err.message || 'Internal Server Error';
  const details = err.details;
  const body = { ok: false, error };

  if (details) {
    body.details = details;
  }

  res.status(status).json(body);
}

module.exports = errorHandler;
