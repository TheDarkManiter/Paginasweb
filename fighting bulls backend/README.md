# Backend API Contracts (Phase 1)

Backend scaffolding for versioned REST APIs.

## Database connection (Railway / PostgreSQL)

Set `DATABASE_URL` from Railway or provide `PG*` variables. SSL is enabled in production or when `PGSSL=true`.

Quick test:
```bash
node -e "require('dotenv').config({ path: '.env' }); const { testConnection } = require('./src/db'); testConnection().then(console.log).catch(console.error)"
```

## Base URL

- `/api/v1`

## Standard response format

Success:
```json
{ "ok": true, "data": {} }
```

Error:
```json
{ "ok": false, "error": "Message", "details": { "field": "name" } }
```

## Endpoints

### POST /api/contact

Create a contact message.

Request body:
```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "message": "string",
  "source": "string"
}
```

Success (201):
```json
{
  "ok": true,
  "data": {
    "id": "uuid",
    "status": "created"
  }
}
```

### POST /api/v1/enrollments

Create an enrollment request.

Request body:
```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "program": "string",
  "experienceLevel": "string",
  "preferredSchedule": "string",
  "source": "string"
}
```

Success (201):
```json
{
  "ok": true,
  "data": {
    "id": "uuid",
    "status": "created"
  }
}
```

### GET /api/v1/enrollments

List enrollments (admin/staff).

Auth:
- `Authorization: Bearer <jwt>`
- The token must include `role` or `roles` with `admin` or `staff`.

Query params (optional):
- `status`
- `page`
- `limit`

Success (200):
```json
{
  "ok": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "status": "new",
        "fullName": "string",
        "email": "string",
        "phone": "string",
        "program": "string",
        "createdAt": "2026-01-01T00:00:00.000Z"
      }
    ],
    "total": 1
  }
}
```

### PATCH /api/v1/enrollments/:id

Update an enrollment (admin/staff).

Auth:
- `Authorization: Bearer <jwt>`
- The token must include `role` or `roles` with `admin` or `staff`.

Request body:
```json
{
  "status": "new | contacted | archived",
  "notes": "string",
  "preferredSchedule": "string"
}
```

Success (200):
```json
{
  "ok": true,
  "data": {
    "id": "uuid",
    "status": "contacted"
  }
}
```

## Errors and status codes

| Status | When |
| --- | --- |
| 200 | OK (read/update) |
| 201 | Created |
| 400 | Validation error |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Not found |
| 409 | Conflict (optional) |
| 500 | Server error |

Error example:
```json
{
  "ok": false,
  "error": "Validation error",
  "details": { "field": "email" }
}
```

## Curl example

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan","telefono":"5555555555","interes":"MMA","email":"juan@test.com","edad":27,"horario":"noche","mensaje":"info"}'
```

## PowerShell test

```powershell
$body = @{
  nombre = "Juan"
  telefono = "5555555555"
  interes = "MMA"
  email = "juan@test.com"
  edad = 27
  horario = "noche"
  mensaje = "info"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/contact" -ContentType "application/json" -Body $body
```

## Database tables

Expected minimal schemas (names can differ as long as columns match):

`contact_leads`
- `id` (uuid or text)
- `full_name`, `email`, `phone`, `message`, `source`
- `created_at` (timestamp, default now)

`enrollments`
- `id` (uuid or text)
- `status` (new | contacted | archived)
- `full_name`, `email`, `phone`, `program`
- `experience_level`, `preferred_schedule`, `source`
- `notes`, `created_at` (timestamp, default now)
