# 🚀 INTEGRACIÓN SUPABASE + NETLIFY FUNCTIONS

## 📋 RESUMEN

He configurado una integración completa de Supabase con Netlify Functions para guardar datos del formulario en la base de datos.

**Flujo:**
1. Usuario llena formulario en React
2. Click "Enviar mensaje"
3. Datos se envían a `/.netlify/functions/create-lead`
4. Netlify Function valida y guarda en tabla Supabase "Leads"
5. Usuario recibe confirmación y opcionalmente abre WhatsApp

---

## 🔧 ARCHIVOS CREADOS / MODIFICADOS

### Archivos Creados:
| Archivo | Descripción |
|---------|-------------|
| `netlify/functions/create-lead.js` | ⭐ Netlify Function que guarda leads en Supabase |

### Archivos Modificados:
| Archivo | Cambios |
|---------|---------|
| `netlify.toml` | Agregado `[functions]` directory = "netlify/functions" |
| `package.json` | ✅ Ya incluye `@supabase/supabase-js@^2.90.1` |
| `src/sections/Contacto/ContactForm.jsx` | Cambio de submit: ahora envía a Netlify Function |
| `src/sections/Contacto/Contacto.module.css` | Estilos para mensajes de éxito/error |

---

## ⚙️ CONFIGURACIÓN NECESARIA EN NETLIFY

### Variables de Entorno Requeridas:

En **Netlify Dashboard → Site Settings → Build & Deploy → Environment**:

```
SUPABASE_URL=https://[tu-proyecto].supabase.co
SUPABASE_SECRET_KEY=eyJhbGciOiJIUzI1NiIsInR5... (clave privada de Supabase)
```

### Cómo obtenerlas:

1. **SUPABASE_URL**: 
   - Ir a Supabase Dashboard → Settings → API
   - Copiar "Project URL"

2. **SUPABASE_SECRET_KEY**:
   - Ir a Supabase Dashboard → Settings → API
   - Copiar "Service Role secret" (la más larga)
   - ⚠️ NUNCA expongas esto en el frontend

---

## 📊 ESTRUCTURA DE DATOS - TABLA "Leads"

La función espera una tabla en Supabase llamada **"Leads"** con campos:

| Campo | Tipo | Nullable | Descripción |
|-------|------|----------|-------------|
| `id` | UUID | No | Clave primaria (auto-generado) |
| `name` | TEXT | No | Nombre del usuario |
| `phone` | TEXT | No | Teléfono/WhatsApp |
| `email` | TEXT | Sí | Correo (opcional) |
| `interest` | TEXT | No | Clase de interés |
| `age_range` | TEXT | Sí | Rango de edad (ej. "18 años o más") |
| `preferred_time` | TEXT | Sí | Horario preferido (ej. "Mañana") |
| `message` | TEXT | Sí | Mensaje adicional |
| `source` | TEXT | No | Origen (siempre "web") |
| `created_at` | TIMESTAMP | No | Fecha de creación (auto-generado) |

### Script SQL para crear la tabla (en Supabase SQL Editor):

```sql
CREATE TABLE IF NOT EXISTS public."Leads" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  interest TEXT NOT NULL,
  age_range TEXT,
  preferred_time TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'web',
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Índice para búsquedas rápidas por teléfono
CREATE INDEX idx_leads_phone ON public."Leads"(phone);

-- Índice para búsquedas por fecha
CREATE INDEX idx_leads_created_at ON public."Leads"(created_at DESC);
```

---

## 🔐 SEGURIDAD

### ✅ Lo que está seguro:

- **SUPABASE_SECRET_KEY**: Solo en variables de entorno de Netlify (servidor)
- **Validación servidor**: La function valida datos antes de insertar
- **CORS**: Configurado para aceptar POST desde el frontend
- **Datos sensibles**: La secret key nunca se expone al cliente

### ⚠️ Consideraciones:

- La tabla debe tener **RLS (Row-Level Security) deshabilitado** O permisos de INSERT públicos
- Alternativamente, usar "Authenticated" role si usas Supabase Auth
- Para este proyecto (formulario público), RLS deshabilitado es correcto

---

## 🧪 CÓMO PROBAR LOCAL

### 1. Test local con `netlify dev`:

```bash
# Instalar netlify-cli si no lo tienes
npm install -g netlify-cli

# Ejecutar desarrollo local (simula Netlify Functions)
cd /workspaces/Paginasweb
netlify dev

# Abrirá http://localhost:8888
# Llena el formulario y envía
```

### 2. Test de la Function directamente:

```bash
# Usa curl o Postman para probar la function
curl -X POST http://localhost:8888/.netlify/functions/create-lead \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "telefono": "5551234567",
    "email": "juan@example.com",
    "interes": "Jiu-Jitsu",
    "edad": "18 años o más",
    "horario": "Mañana",
    "mensaje": "Interesado en clases"
  }'
```

### 3. Test en producción (después de deploy a Netlify):

```bash
# Simplemente llenar el formulario en https://[tu-sitio].netlify.app/
# Verificar en Supabase Dashboard → Table Editor → "Leads"
# Los datos deben aparecer allí en tiempo real
```

---

## 📝 FLUJO DE DATOS

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│                  src/sections/Contacto/                      │
│                    ContactForm.jsx                           │
│                                                               │
│  User fills form → Click "Enviar" → fetch POST              │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│               NETLIFY FUNCTION (Node.js)                    │
│              netlify/functions/create-lead.js               │
│                                                               │
│  1. Recibe JSON del formulario                              │
│  2. Valida campos (nombre, teléfono, interés)              │
│  3. Prepara datos para Supabase                             │
│  4. Inserta en tabla "Leads"                                │
│  5. Devuelve respuesta JSON                                 │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE (Backend)                        │
│                      Database                                │
│                    Table: "Leads"                            │
│                                                               │
│  Almacena todos los datos del formulario                    │
│  Disponible para consultas y análisis                       │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│                                                               │
│  Muestra: "✅ ¡Solicitud registrada!"                       │
│  Abre WhatsApp para seguimiento (opcional)                  │
│  Limpia el formulario                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 COMANDOS CLAVE

### Desarrollo local:
```bash
npm run dev              # Inicia Vite dev server (port 5173)
netlify dev             # Inicia con Netlify Functions (port 8888)
```

### Build para producción:
```bash
npm run build           # Compila React + Vite
netlify deploy          # Deploy a Netlify
```

### Preview local del build:
```bash
npm run build
npm run preview         # Sirve dist/ localmente
```

---

## 📊 MANEJO DE ERRORES

### En la Netlify Function:

- ✅ Valida campos requeridos (nombre, teléfono, interés)
- ✅ Maneja errores de Supabase
- ✅ Responde con mensajes claros al usuario
- ✅ Logging de errores en console (servidor)

### En el Frontend:

- ✅ Muestra "Enviando..." mientras se procesa
- ✅ Muestra mensaje de éxito si ok:true
- ✅ Muestra mensaje de error si ok:false
- ✅ Catch de errores de red

---

## ✅ CHECKLIST DE PRODUCCIÓN

Antes de publicar en producción:

- [ ] Crear tabla "Leads" en Supabase
- [ ] Obtener SUPABASE_URL y SUPABASE_SECRET_KEY
- [ ] Agregar variables de entorno en Netlify Dashboard
- [ ] Test local con `netlify dev`
- [ ] Hacer `npm run build` (validar cero errores)
- [ ] Push a GitHub
- [ ] Netlify auto-deploya
- [ ] Verificar en https://[tu-sitio].netlify.app
- [ ] Llenar formulario y verificar que aparece en Supabase

---

## 🔍 TROUBLESHOOTING

### Error: "Faltan variables de entorno"
**Causa**: SUPABASE_URL o SUPABASE_SECRET_KEY no están en Netlify
**Solución**: Agregar en Netlify Dashboard → Build & Deploy → Environment

### Error: "Error al guardar los datos"
**Causa**: Tabla "Leads" no existe o permisos insuficientes
**Solución**: Crear tabla en Supabase con el script SQL arriba

### Error: "JSON inválido"
**Causa**: Frontend no envía JSON correcto
**Solución**: Verificar en Console (F12) qué se está enviando

### Function timeout
**Causa**: Supabase tardó mucho o no responde
**Solución**: Revisar conexión a Supabase, aumentar timeout en netlify.toml

---

## 📚 RECURSOS

- Supabase Docs: https://supabase.com/docs
- Netlify Functions: https://docs.netlify.com/functions/overview/
- @supabase/supabase-js: https://github.com/supabase/supabase-js

---

**Integración completada**: ✅ 2026-01-19
**Status**: 🚀 Listo para producción
**Test**: Pendiente (local + producción)

