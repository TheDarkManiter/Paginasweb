# 📋 Mapeo Exacto del Payload del Formulario de Contacto

**Documento técnico: Campos HTML → Payload JSON**

---

## 1️⃣ CAMPOS DEL FORMULARIO (HTML)

| Campo | name | type | required | placeholder |
|-------|------|------|----------|-------------|
| Nombre | `nombre` | text | ✅ | "Tu nombre" |
| Teléfono / WhatsApp | `telefono` | tel | ✅ | "55 1234 5678" |
| Correo electrónico | `email` | email | ❌ | "tucorreo@email.com" |
| ¿Qué clase te interesa? | `interes` | select | ✅ | (6 opciones) |
| Edad | `edad` | select | ❌ | "Selecciona un rango" |
| Horario preferido | `horario` | select | ❌ | "Selecciona un horario" |
| Mensaje | `mensaje` | textarea | ❌ | "Cuéntanos..." |

---

## 2️⃣ TRANSFORMACIONES APLICADAS

### ✨ En `handleSubmit()` (línea 104-116 de ContactForm.jsx):

```javascript
const data = {
  nombre:   formData.nombre.trim(),                          // 🔹 Limpia espacios
  telefono: toWhatsAppPhone(result.telDigits),               // 🔹 Convierte a formato WhatsApp
  email:    formData.email.trim(),                           // 🔹 Limpia espacios
  interes:  formData.interes,                                // 🔹 Sin transformación
  edad:     formData.edad,                                   // 🔹 Sin transformación
  horario:  formData.horario,                                // 🔹 Sin transformación
  mensaje:  formData.mensaje.trim(),                         // 🔹 Limpia espacios
};
```

### 📱 Transformaciones de teléfono:

```javascript
// En handleSubmit, antes de crear data:
const result = validate();
// result.telDigits = normalizePhone(value) → Solo dígitos (ej: "5515938286")
// Luego: toWhatsAppPhone(result.telDigits) → "+5215515938286"
```

**Funciones en `src/utils/validators.js`:**
- `normalizePhone(value)` → Extrae solo dígitos (elimina espacios, guiones, +)
- `toWhatsAppPhone(digits)` → Añade prefijo "+52"

---

## 3️⃣ PAYLOAD JSON FINAL (EXACTO)

### 📤 Enviado a: `/.netlify/functions/create-lead`

```json
{
  "nombre": "Juan García López",
  "telefono": "+5215515938286",
  "email": "juan.garcia@example.com",
  "interes": "Muay Thai",
  "edad": "18 años o más",
  "horario": "Noche",
  "mensaje": "Tengo experiencia en boxeo y quiero aprender Muay Thai. Disponible de 7pm a 9pm.",
  "source": "contact-form"
}
```

---

## 4️⃣ MAPEO FINAL (name → key en payload)

| Input HTML (`name=`) | Payload JSON (`key=`) | Transformación |
|----------------------|----------------------|-----------------|
| `nombre` | `nombre` | `.trim()` - elimina espacios al inicio/final |
| `telefono` | `telefono` | `.normalize()` → `.toWhatsAppPhone()` (solo dígitos + "+52") |
| `email` | `email` | `.trim()` - elimina espacios (puede estar vacío) |
| `interes` | `interes` | Sin cambios (valor del `<option>` seleccionado) |
| `edad` | `edad` | Sin cambios (valor del `<option>` seleccionado, puede estar vacío) |
| `horario` | `horario` | Sin cambios (valor del `<option>` seleccionado, puede estar vacío) |
| `mensaje` | `mensaje` | `.trim()` - elimina espacios (puede estar vacío) |
| — | `source` | **Agregado en el server** (siempre = "contact-form") |

---

## 5️⃣ EJEMPLO CON DATOS REALES (Personas Mexicanas)

### Caso 1: Envío Completo
```json
{
  "nombre": "María Contreras",
  "telefono": "+5212223456789",
  "email": "maria.contreras@gmail.com",
  "interes": "Jiu-Jitsu",
  "edad": "15 – 17 años",
  "horario": "Tarde",
  "mensaje": "Quiero aprender jiu jitsu para defensa personal. Tengo experiencia en natación.",
  "source": "contact-form"
}
```

### Caso 2: Formulario Mínimo (solo campos requeridos)
```json
{
  "nombre": "Carlos López",
  "telefono": "+5215559876543",
  "email": "",
  "interes": "Box",
  "edad": "",
  "horario": "",
  "mensaje": "",
  "source": "contact-form"
}
```

### Caso 3: Con Teléfono en Diferentes Formatos
```json
{
  "nombre": "Andrea Ruiz",
  "telefono": "+5216625551234",
  "email": "andrea@hotmail.com",
  "interes": "Clases para niños",
  "edad": "6 – 10 años",
  "horario": "Mañana",
  "mensaje": "Mi hijo tiene 8 años y quiere probar.",
  "source": "contact-form"
}
```

---

## 6️⃣ VALIDACIONES PRE-ENVÍO (en `validate()`)

### Obligatorios (bloqueados si están vacíos):
- ✅ `nombre`: Min 2 caracteres, sin números
- ✅ `telefono`: 10 dígitos (formato MX)
- ✅ `interes`: Debe seleccionar opción

### Opcionales (se envían si están vacíos):
- ❌ `email`: Si se completa, debe ser email válido (sino vacío)
- ❌ `edad`: Valor por defecto vacío
- ❌ `horario`: Valor por defecto vacío
- ❌ `mensaje`: Valor por defecto vacío

---

## 7️⃣ FLUJO COMPLETO

```
Usuario llena formulario
    ↓
handleChange() → guarda en formData.nombre, formData.telefono, etc.
    ↓
onSubmit → validate() (checks obligatorios)
    ↓
handleSubmit() → Transforma datos:
    - .trim() en nombre, email, mensaje
    - normalizePhone() → toWhatsAppPhone() en teléfono
    - Copia interes, edad, horario tal cual
    ↓
fetch('/.netlify/functions/create-lead', {
  method: 'POST',
  body: JSON.stringify(data)  ← Envía payload transformado
})
    ↓
Netlify Function valida y guarda en Supabase
    ↓
Response { ok: true, id: "uuid", created_at: "2025-01-19T..." }
    ↓
UI muestra éxito ✅ y abre WhatsApp automáticamente
```

---

## 8️⃣ NOTAS IMPORTANTES

### 🔐 Seguridad
- El campo `source` se **agrega en el servidor** (no viene del cliente)
- El servidor valida nuevamente (no confía solo en validación cliente)
- Los datos se guardan tal cual en Supabase

### 🎯 Validación de Teléfono
- Acepta: `55 1234 5678`, `5512345678`, `+52 55 1234 5678`
- Rechaza: `123456`, `+1 555 1234`, cualquier cosa con <10 dígitos

### 📧 Email
- Validación regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Se permite estar vacío, pero si se completa, debe ser válido

### ✏️ Valores por defecto
- `edad`, `horario`, `mensaje` = vacío (`""`) si no se selecciona/escribe
- Se envían así al servidor (NULL en BD si la función los trata como null)

---

## 9️⃣ ARCHIVO QUE PROCESA ESTO EN BACKEND

**Ruta:** `netlify/functions/create-lead.js`

Recibe el payload exacto mostrado arriba y:
1. Valida campos requeridos
2. Agrega `source: "contact-form"`
3. Agrega `created_at: new Date().toISOString()`
4. Inserta en tabla "Leads" de Supabase
5. Retorna: `{ ok: true, id: "...", message: "¡Solicitud registrada!" }`

---

**Generado por:** Frontend Lead  
**Fecha:** 2025-01-19  
**Estado:** ✅ Producción Ready
