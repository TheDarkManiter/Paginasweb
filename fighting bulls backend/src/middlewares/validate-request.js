function validateRequest(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = result.error.issues
        .map((issue) => {
          const path = issue.path.length ? issue.path.join('.') : 'body';
          return `${path}: ${issue.message}`;
        })
        .join('; ');
      return res.status(400).json({
        ok: false,
        error: `Validation error: ${issues || 'invalid request body'}`
      });
    }

    req.body = result.data;
    return next();
  };
}

module.exports = validateRequest;
