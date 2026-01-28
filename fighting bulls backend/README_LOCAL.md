# Local Dev Guide (Windows / VS Code)

## Requisitos
- Docker Desktop
- Node.js >= 20
- PowerShell o cmd

## Setup rápido (≈5 minutos)
1. Instalar dependencias:  
   `npm install`
2. Levantar Postgres local:  
   `npm run db:up`
3. Crear/actualizar esquema mínimo:  
   `npm run db:init`
4. Verificar DB opcional:  
   `npm run db:psql` y `\\dt`
5. Iniciar backend:  
   `npm run dev`
6. Smoke tests (PowerShell, PORT=3000):
   - `Invoke-WebRequest -UseBasicParsing http://localhost:3000/health`
   - `Invoke-WebRequest -UseBasicParsing http://localhost:3000/health/db`
   - Lead válido:  
     ```
     $body = @{
       fullName='Jane Doe'; phone='5551234567'; interest='MMA';
       email='jane@test.com'; age=25; schedule='night'; message='ok'; consent=$true
     } | ConvertTo-Json
     Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/leads -ContentType 'application/json' -Body $body
     ```
   - Lead rechazado (consent=false):  
     ```
     $body = @{ fullName='Jane Doe'; phone='5551234567'; interest='MMA'; consent=$false } | ConvertTo-Json
     Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/leads -ContentType 'application/json' -Body $body
     ```

## Notas de compatibilidad
- Rutas soportadas: `/api/contact` (payload en español) y alias `/api/leads` (payload en inglés). Ambos requieren `consent=true`.
- `.env` ya prioriza la configuración local (`dotenv.config({ override:true })`).

## Troubleshooting rápido
- **Puerto 5432 en uso**: detener otro Postgres o cambiar mapeo en `docker-compose.yml` y `DATABASE_URL`.
- **Contenedor no healthy**: `npm run db:logs` para revisar `postgres:16`.
- **DB vacía / errores de tabla**: reejecutar `npm run db:init`.
- **Variables antiguas de sistema**: asegúrate de que `.env` en el repo tenga `DATABASE_URL` local y reinicia la terminal.

## Scripts útiles
- `npm run db:up` / `npm run db:down`
- `npm run db:logs`
- `npm run db:init`
- `npm run db:psql`
