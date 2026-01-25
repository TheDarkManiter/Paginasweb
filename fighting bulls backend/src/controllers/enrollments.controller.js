const service = require('../services/enrollments.service');
const { ok } = require('../utils/response');

async function createEnrollment(req, res, next) {
  try {
    const data = await service.create(req.body);
    return ok(res, data, 201);
  } catch (err) {
    return next(err);
  }
}

async function listEnrollments(req, res, next) {
  try {
    const data = await service.list(req.query);
    return ok(res, data, 200);
  } catch (err) {
    return next(err);
  }
}

async function updateEnrollment(req, res, next) {
  try {
    const data = await service.update(req.params.id, req.body);
    return ok(res, data, 200);
  } catch (err) {
    return next(err);
  }
}

module.exports = { createEnrollment, listEnrollments, updateEnrollment };
