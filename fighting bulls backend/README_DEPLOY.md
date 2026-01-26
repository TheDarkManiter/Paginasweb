# Deploy guide (Railway + Cloudflare Pages)

## Cloudflare Pages (frontend)
Set the production environment variable:
- `VITE_API_URL=https://scintillating-learning-production-8dd0.up.railway.app`

Redeploy after saving.

## Railway (backend)
Required environment variables:
- `NODE_ENV=production`
- `PORT=3001`
- `JWT_SECRET=...`
- `DATABASE_URL` (use the Railway Postgres reference, do not paste credentials)
- `CORS_ORIGIN=https://fightingbullsacademy.pages.dev` (replace with your Cloudflare domain)

Public networking:
- Service → Settings → Networking → Public Networking → Generate Domain

Healthcheck path:
- `/health`

## Test from PowerShell
```powershell
$body = @{
  nombre   = "Juan Perez"
  telefono = "5512345678"
  interes  = "Box"
  email    = "juan@test.com"
  edad     = "25"
  horario  = "mañana"
  mensaje  = "Prueba prod"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "https://scintillating-learning-production-8dd0.up.railway.app/api/contact" `
  -ContentType "application/json" -Body $body
```
