const jwt = require('jsonwebtoken');

function authenticateJwt(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ ok: false, error: 'Missing bearer token' });
  }

  const token = header.slice('Bearer '.length).trim();
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: 'Invalid token' });
  }
}

function requireRoles(allowedRoles) {
  return (req, res, next) => {
    const user = req.user || {};
    const role = user.role;
    const roles = Array.isArray(user.roles) ? user.roles : [];
    const isAllowed = allowedRoles.includes(role) || roles.some((r) => allowedRoles.includes(r));

    if (!isAllowed) {
      return res.status(403).json({ ok: false, error: 'Forbidden' });
    }

    return next();
  };
}

module.exports = { authenticateJwt, requireRoles };
