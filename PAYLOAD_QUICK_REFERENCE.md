# ⚡ REFERENCIA RÁPIDA: PAYLOAD DEL FORMULARIO

## 🎯 Resumen de 30 segundos

**De qué trata:** El formulario de Contacto recolecta 7 datos del usuario y los transforma en un JSON que se envía al servidor (Netlify Function).

**Campos que recolecta:**
```
nombre, telefono, email, interes, edad, horario, mensaje
```

**Transformaciones principales:**
```javascript
nombre    → .trim()                          (elimina espacios)
telefono  → normalizar + agregar prefijo +52
email     → .trim()
interes   → sin cambios
edad      → sin cambios
horario   → sin cambios
mensaje   → .trim()
```

---

## 📋 Payload Completo (Ejemplo)

```json
{
  "nombre": "Juan García López",
  "telefono": "+5215515938286",
  "email": "juan.garcia@example.com",
  "interes": "Muay Thai",
  "edad": "18 años o más",
  "horario": "Noche",
  "mensaje": "Tengo experiencia en boxeo y quiero aprender Muay Thai.",
  "source": "contact-form"
}
```

---

## 🔗 Mapeo HTML → JSON

| Input HTML | name= | JSON key | Type | Required | Transformación |
|---|---|---|---|---|---|
| Nombre * | `nombre` | `nombre` | text | ✅ | `.trim()` |
| Teléfono * | `telefono` | `telefono` | tel | ✅ | `normalize()` + prefijo "+52" |
| Correo | `email` | `email` | email | ❌ | `.trim()` |
| Clase * | `interes` | `interes` | select | ✅ | Sin cambios |
| Edad | `edad` | `edad` | select | ❌ | Sin cambios |
| Horario | `horario` | `horario` | select | ❌ | Sin cambios |
| Mensaje | `mensaje` | `mensaje` | textarea | ❌ | `.trim()` |
| — | — | `source` | — | ✅ | Agregado por servidor |

---

## 📱 Opciones de Select

### Interes (requerido - 6 opciones)
```
"Jiu-Jitsu"
"Muay Thai"
"Box"
"Clases para niños"
"Varias disciplinas"
"Solo información"
```

### Edad (opcional - 4 opciones)
```
"6 – 10 años"
"11 – 14 años"
"15 – 17 años"
"18 años o más"
```

### Horario (opcional - 3 opciones)
```
"Mañana"
"Tarde"
"Noche"
```

---

## 🔄 Transformaciones Detalladas

### 1. Teléfono (la más compleja)
```
Input usuario: "55 1593 8286"
                ↓ normalizePhone() ↓
              "5515938286" (solo dígitos)
                ↓ toWhatsAppPhone() ↓
              "+5215515938286" (con prefijo)
```

Formatos aceptados:
- `5515938286` ✅
- `55 1593 8286` ✅
- `+52 55 1593 8286` ✅
- `(55) 1593-8286` ✅

### 2. Espacios (.trim())
```
Input:  " Juan García "
Output: "Juan García"

Input:  "tu@email.com "
Output: "tu@email.com"
```

### 3. Sin Cambios
```
Input:  "Muay Thai"        → Output: "Muay Thai"
Input:  "18 años o más"    → Output: "18 años o más"
Input:  "Noche"            → Output: "Noche"
```

---

## ⚠️ Validaciones (antes de enviar)

### Cliente (Frontend)
```javascript
✓ nombre: min 2 caracteres, sin números
✓ telefono: exactamente 10 dígitos (formato MX)
✓ interes: obligatoriamente seleccionado
✓ email: si se completa, debe ser formato válido
✗ edad, horario, mensaje: opcionales
```

### Servidor (Netlify Function)
```javascript
✓ nombre: presente y válido
✓ telefono: presente y válido
✓ interes: presente y válido
→ Rechaza si falta alguno requerido (status 400)
```

---

## 📤 Envío HTTP

```http
POST /.netlify/functions/create-lead HTTP/1.1
Content-Type: application/json

{
  "nombre": "Juan García López",
  "telefono": "+5215515938286",
  "email": "juan.garcia@example.com",
  "interes": "Muay Thai",
  "edad": "18 años o más",
  "horario": "Noche",
  "mensaje": "...",
  "source": "contact-form"
}
```

---

## 📥 Respuesta

### ✅ Éxito (200 OK)
```json
{
  "ok": true,
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2025-01-19T15:30:45.123Z",
  "message": "¡Solicitud registrada exitosamente!"
}
```

### ❌ Error (400 / 500)
```json
{
  "ok": false,
  "error": "Campo 'telefono' es obligatorio"
}
```

---

## 🧪 Testing en DevTools

```javascript
// Copia en Console (F12):

const testPayload = {
  nombre: "Test User",
  telefono: "+5215515938286",
  email: "test@example.com",
  interes: "Box",
  edad: "18 años o más",
  horario: "Noche",
  mensaje: "Mensaje de prueba",
  source: "contact-form"
};

fetch('/.netlify/functions/create-lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testPayload)
})
.then(r => r.json())
.then(data => console.log('Respuesta:', data));
```

---

## 📊 Payload Mínimo

Solo los campos requeridos:
```json
{
  "nombre": "Juan",
  "telefono": "+5215515938286",
  "interes": "Jiu-Jitsu",
  "email": "",
  "edad": "",
  "horario": "",
  "mensaje": "",
  "source": "contact-form"
}
```

---

## 🔐 Notas de Seguridad

1. **source se agrega en el servidor** (cliente NO puede manipularlo)
2. **created_at se genera en el servidor** (cliente NO puede falsificarlo)
3. **Validación en dos niveles**: cliente + servidor
4. **Teléfono se normaliza** para evitar duplicados con diferentes formatos
5. **Secrets en Netlify** (SUPABASE_URL, SUPABASE_SECRET_KEY) nunca en código

---

## 📁 Archivos Relacionados

- [src/sections/Contacto/ContactForm.jsx](../sections/Contacto/ContactForm.jsx) - Componente React
- [netlify/functions/create-lead.js](../../netlify/functions/create-lead.js) - Función backend
- [src/utils/validators.js](./validators.js) - Funciones de validación
- [src/config/contact.js](../config/contact.js) - Configuración de WhatsApp

---

## 🚀 Flujo Completo

```
Usuario completa form → handleChange() guarda en React state
    ↓
Usuario clicks "Enviar" → handleSubmit()
    ↓
validate() → Valida requeridos
    ↓
transform() → .trim(), normalizePhone(), etc.
    ↓
fetch POST → Envía JSON a Netlify Function
    ↓
Netlify Function valida nuevamente + inserta en Supabase
    ↓
Response { ok: true, id, created_at, message }
    ↓
UI muestra éxito ✅ y abre WhatsApp automáticamente
```

---

**Generado por:** Frontend Lead  
**Fecha:** 2025-01-19  
**Estado:** ✅ Production Ready
