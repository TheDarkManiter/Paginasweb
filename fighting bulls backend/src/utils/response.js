function ok(res, data, status = 200) {
  return res.status(status).json({ ok: true, data });
}

function fail(res, error, status = 500, details) {
  const body = { ok: false, error };
  if (details) {
    body.details = details;
  }
  return res.status(status).json(body);
}

module.exports = { ok, fail };
