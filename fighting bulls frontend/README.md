# Paginasweb
Paginas para difernetes negocios

## API base (Cloudflare Pages)
- Define `VITE_API_URL` before building/deploying. Example (Railway prod): `https://scintillating-learning-production-8dd0.up.railway.app`
- The React app reads it via `import.meta.env.VITE_API_URL`; if missing, it falls back to the production Railway URL.
- All form requests go through this base using the shared helper in `src/services/api.js`.
