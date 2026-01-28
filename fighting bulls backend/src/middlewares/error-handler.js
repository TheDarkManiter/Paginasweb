function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const error = err.message || 'Internal Server Error';
  const details = err.details;
  const body = { ok: false, error };

  if (details) {
    body.details = details;
  }

  const redact = (value) => {
    if (value === undefined || value === null) return value;
    let text = String(value);
    const secrets = [process.env.DATABASE_URL];
    for (const secret of secrets) {
      if (!secret) continue;
      text = text.split(secret).join('[redacted]');
    }
    return text;
  };

  const logPayload = {
    status,
    message: redact(err.message),
    details: redact(err.details),
    stack: redact(err.stack)
  };
  console.error(logPayload);

  res.status(status).json(body);
}

module.exports = errorHandler;
