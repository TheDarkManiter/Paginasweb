const { randomUUID } = require('crypto');
const { pool } = require('../db/pool');

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

async function create(payload) {
  const id = randomUUID();
  const {
    fullName,
    email,
    phone,
    program,
    experienceLevel,
    preferredSchedule,
    source
  } = payload;

  const result = await pool.query(
    `INSERT INTO enrollments
      (id, status, full_name, email, phone, program, experience_level, preferred_schedule, source)
     VALUES
      ($1, 'new', $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, status`,
    [
      id,
      fullName,
      email,
      phone || null,
      program,
      experienceLevel,
      preferredSchedule,
      source || null
    ]
  );

  return result.rows[0];
}

async function list(query) {
  const page = query.page || 1;
  const limit = Math.min(query.limit || DEFAULT_LIMIT, MAX_LIMIT);
  const offset = (page - 1) * limit;

  const filters = [];
  const values = [];

  if (query.status) {
    values.push(query.status);
    filters.push(`status = $${values.length}`);
  }

  const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

  const listQuery = `
    SELECT id,
           status,
           full_name AS "fullName",
           email,
           phone,
           program,
           created_at AS "createdAt"
      FROM enrollments
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
  `;

  const listValues = values.concat([limit, offset]);
  const listResult = await pool.query(listQuery, listValues);

  const countResult = await pool.query(
    `SELECT COUNT(*) AS total FROM enrollments ${whereClause}`,
    values
  );

  return {
    items: listResult.rows,
    total: Number(countResult.rows[0].total)
  };
}

async function update(id, payload) {
  const updates = [];
  const values = [];

  if (payload.status) {
    values.push(payload.status);
    updates.push(`status = $${values.length}`);
  }

  if (payload.notes) {
    values.push(payload.notes);
    updates.push(`notes = $${values.length}`);
  }

  if (payload.preferredSchedule) {
    values.push(payload.preferredSchedule);
    updates.push(`preferred_schedule = $${values.length}`);
  }

  if (!updates.length) {
    const error = new Error('No updates provided');
    error.status = 400;
    error.details = { fields: ['status', 'notes', 'preferredSchedule'] };
    throw error;
  }

  values.push(id);
  const result = await pool.query(
    `UPDATE enrollments
        SET ${updates.join(', ')}
      WHERE id = $${values.length}
      RETURNING id, status`,
    values
  );

  if (!result.rows.length) {
    const error = new Error('Enrollment not found');
    error.status = 404;
    throw error;
  }

  return result.rows[0];
}

module.exports = { create, list, update };
