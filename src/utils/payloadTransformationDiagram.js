/**
 * 📊 DIAGRAMA DE TRANSFORMACIÓN: INPUT HTML → PAYLOAD JSON
 * 
 * Visualización paso a paso de cómo el formulario transforma
 * los inputs HTML en el payload enviado al servidor.
 */

// ====================================================================
// PASO 1: USUARIO COMPLETA EL FORMULARIO (HTML en el navegador)
// ====================================================================

/*
┌─────────────────────────────────────────────────────────────────┐
│                    FORMULARIO EN NAVEGADOR                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Nombre *                                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Juan García López              ← Dato bruto del usuario │  │
│  └──────────────────────────────────────────────────────────┘  │
│  name="nombre"                                                  │
│                                                                 │
│  Teléfono / WhatsApp *                                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  55 1593 8286                  ← Múltiples formatos OK   │  │
│  └──────────────────────────────────────────────────────────┘  │
│  name="telefono"                                                │
│                                                                 │
│  Correo electrónico (opcional)                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ juan.garcia@example.com                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│  name="email"                                                   │
│                                                                 │
│  ¿Qué clase te interesa? *                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ▼ Muay Thai                   ← Seleccionado           │  │
│  └──────────────────────────────────────────────────────────┘  │
│  name="interes"                                                 │
│                                                                 │
│  Edad                                                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ▼ 18 años o más                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│  name="edad"                                                    │
│                                                                 │
│  Horario preferido                                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ▼ Noche                                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│  name="horario"                                                 │
│                                                                 │
│  Mensaje                                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Tengo experiencia en boxeo y quiero aprender Muay Thai  │  │
│  │ Disponible de 7pm a 9pm.                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│  name="mensaje"                                                 │
│                                                                 │
│           [ Enviar mensaje ]                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
*/


// ====================================================================
// PASO 2: ESTADO EN REACT (formData object en memoria)
// ====================================================================

const formData_ANTES = {
  nombre:   "Juan García López",      // Como el usuario escribe (con espacios)
  telefono: " 55 1593 8286",          // Con espacios, variación formato
  email:    "juan.garcia@example.com ",  // Espacios al final
  interes:  "Muay Thai",              // Valor del <option>
  edad:     "18 años o más",          // Valor del <option>
  horario:  "Noche",                  // Valor del <option>
  mensaje:  "  Tengo experiencia...  ", // Con espacios extra
};

// Visualización en DevTools:
/*
  console.log(formData_ANTES);
  
  Output:
  {
    nombre: "Juan García López",
    telefono: " 55 1593 8286",
    email: "juan.garcia@example.com ",
    interes: "Muay Thai",
    edad: "18 años o más",
    horario: "Noche",
    mensaje: "  Tengo experiencia... "
  }
*/


// ====================================================================
// PASO 3: VALIDACIÓN (en handleSubmit → validate())
// ====================================================================

// Código en ContactForm.jsx línea ~90:
/*
  const result = validate();
  
  Resultado: {
    ok: true,
    telDigits: "5515938286"  ← Solo dígitos, sin prefijo
  }
  
  Validaciones ejecutadas:
  ✓ nombre.length >= 2 caracteres
  ✓ telefono tiene 10 dígitos (formato MX válido)
  ✓ interes seleccionado (no vacío)
  ✓ email es válido (si está completado)
*/


// ====================================================================
// PASO 4: TRANSFORMACIÓN (en handleSubmit → crear data)
// ====================================================================

/*
  Código en ContactForm.jsx línea 104-116:
  
  const data = {
    nombre:   formData.nombre.trim(),                    // 🔄 TRANSFORM 1
    telefono: toWhatsAppPhone(result.telDigits),         // 🔄 TRANSFORM 2
    email:    formData.email.trim(),                     // 🔄 TRANSFORM 3
    interes:  formData.interes,                          // ✓ SIN CAMBIO
    edad:     formData.edad,                             // ✓ SIN CAMBIO
    horario:  formData.horario,                          // ✓ SIN CAMBIO
    mensaje:  formData.mensaje.trim(),                   // 🔄 TRANSFORM 4
  };
*/

const transformaciones = {
  nombre: {
    entrada:       " Juan García López ",
    funcion:       ".trim()",
    salida:        "Juan García López",
    descripcion:   "Elimina espacios al inicio y final"
  },
  telefono: {
    entrada:       " 55 1593 8286",
    paso_1:        "normalizePhone() → '5515938286'",
    paso_2:        "toWhatsAppPhone() → '+5215515938286'",
    salida:        "+5215938286",
    descripcion:   "Extrae dígitos + añade prefijo WhatsApp +52"
  },
  email: {
    entrada:       "juan.garcia@example.com ",
    funcion:       ".trim()",
    salida:        "juan.garcia@example.com",
    descripcion:   "Elimina espacios al inicio y final"
  },
  interes: {
    entrada:       "Muay Thai",
    funcion:       "ninguna",
    salida:        "Muay Thai",
    descripcion:   "Se usa tal cual del <option>"
  },
  edad: {
    entrada:       "18 años o más",
    funcion:       "ninguna",
    salida:        "18 años o más",
    descripcion:   "Se usa tal cual del <option>"
  },
  horario: {
    entrada:       "Noche",
    funcion:       "ninguna",
    salida:        "Noche",
    descripcion:   "Se usa tal cual del <option>"
  },
  mensaje: {
    entrada:       "  Tengo experiencia en boxeo...  ",
    funcion:       ".trim()",
    salida:        "Tengo experiencia en boxeo...",
    descripcion:   "Elimina espacios al inicio y final"
  }
};


// ====================================================================
// PASO 5: PAYLOAD TRANSFORMADO (listo para enviar)
// ====================================================================

const data_TRANSFORMADO = {
  nombre:   "Juan García López",         // ← Limpio
  telefono: "+5215515938286",            // ← Con prefijo +52
  email:    "juan.garcia@example.com",   // ← Limpio
  interes:  "Muay Thai",                 // ← Sin cambio
  edad:     "18 años o más",             // ← Sin cambio
  horario:  "Noche",                     // ← Sin cambio
  mensaje:  "Tengo experiencia...",      // ← Limpio
};

// Visualización en DevTools:
/*
  console.log(data_TRANSFORMADO);
  
  Output:
  {
    nombre: "Juan García López",
    telefono: "+5215515938286",
    email: "juan.garcia@example.com",
    interes: "Muay Thai",
    edad: "18 años o más",
    horario: "Noche",
    mensaje: "Tengo experiencia en boxeo y quiero aprender Muay Thai..."
  }
*/


// ====================================================================
// PASO 6: FETCH A NETLIFY FUNCTION
// ====================================================================

/*
  fetch('/.netlify/functions/create-lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),  ← Envía data_TRANSFORMADO como JSON
  })
  
  Request Headers:
  POST /.netlify/functions/create-lead
  Content-Type: application/json
  
  Request Body (JSON):
  {
    "nombre": "Juan García López",
    "telefono": "+5215515938286",
    "email": "juan.garcia@example.com",
    "interes": "Muay Thai",
    "edad": "18 años o más",
    "horario": "Noche",
    "mensaje": "Tengo experiencia..."
  }
*/


// ====================================================================
// PASO 7: PROCESAMIENTO EN NETLIFY FUNCTION
// ====================================================================

/*
  netlify/functions/create-lead.js recibe y procesa:
  
  1. Valida CORS (OPTIONS request)
  2. Parsea JSON del body
  3. Valida campos requeridos nuevamente (server-side):
     - nombre (presente y válido)
     - telefono (presente y válido)
     - interes (presente y válido)
  4. AGREGA campo source:
     source: "contact-form"
  5. AGREGA timestamp:
     created_at: new Date().toISOString()
  6. Conecta a Supabase con Service Role
  7. INSERT en tabla "Leads"
  8. Retorna respuesta
*/

const payload_EN_SUPABASE = {
  nombre:    "Juan García López",       // ← Cliente
  telefono:  "+5215515938286",          // ← Cliente
  email:     "juan.garcia@example.com", // ← Cliente
  interes:   "Muay Thai",               // ← Cliente
  edad:      "18 años o más",           // ← Cliente
  horario:   "Noche",                   // ← Cliente
  mensaje:   "Tengo experiencia...",    // ← Cliente
  source:    "contact-form",            // 🔺 AGREGADO por servidor
  created_at: "2025-01-19T15:30:45Z"    // 🔺 AGREGADO por servidor
};


// ====================================================================
// PASO 8: RESPUESTA DEL SERVIDOR
// ====================================================================

const response_EXITOSA = {
  ok: true,
  id: "550e8400-e29b-41d4-a716-446655440000",  // UUID de Supabase
  created_at: "2025-01-19T15:30:45.123Z",
  message: "¡Solicitud registrada exitosamente!"
};

const response_ERROR = {
  ok: false,
  error: "Validación fallida: campo 'telefono' inválido"
};

/*
  Código en ContactForm.jsx (~línea 123):
  
  const result = await response.json();
  
  if (result.ok) {
    // ✅ Mostrar mensaje de éxito
    setSubmitStatus({ 
      type: 'success', 
      message: result.message 
    });
    
    // Abrir WhatsApp automáticamente
    window.open(getWhatsAppLink(...), '_blank');
    
    // Limpiar form
    setFormData({ ... });
  } else {
    // ❌ Mostrar error
    setSubmitStatus({ 
      type: 'error', 
      message: result.error 
    });
  }
*/


// ====================================================================
// COMPARACIÓN VISUAL: ANTES vs DESPUÉS
// ====================================================================

const TRANSFORMACION_COMPLETA = {
  ANTES: {
    "Entrada HTML": "formData (estado React)",
    "nombre": "Juan García López",
    "telefono": " 55 1593 8286",
    "email": "juan.garcia@example.com ",
    "interes": "Muay Thai",
    "edad": "18 años o más",
    "horario": "Noche",
    "mensaje": "  Tengo experiencia...  ",
    "Observación": "Con espacios extra, formatos variados"
  },
  
  DESPUES: {
    "Salida JSON": "Payload al servidor",
    "nombre": "Juan García López",
    "telefono": "+5215515938286",
    "email": "juan.garcia@example.com",
    "interes": "Muay Thai",
    "edad": "18 años o más",
    "horario": "Noche",
    "mensaje": "Tengo experiencia...",
    "source": "contact-form",
    "created_at": "AGREGADO EN SERVIDOR",
    "Observación": "Limpio, formato estándar, validado"
  }
};


// ====================================================================
// DIAGRAMA DE FLUJO ASCII
// ====================================================================

const FLUJO_DIAGRAMA = `

┌──────────────────────────────────────────────────────────────────────┐
│                    USUARIO EN NAVEGADOR                              │
│            (Completa formulario con valores variados)                │
└─────────────────────────────┬──────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│              handleChange() - React State Update                      │
│        (Guarda valores en formData mientras el usuario escribe)       │
└─────────────────────────────┬──────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│                  Usuario hace click "Enviar"                         │
│                 onSubmit → handleSubmit()                            │
└─────────────────────────────┬──────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│         Validación Cliente: validate()                               │
│    ✓ nombre: min 2 caracteres, sin números                           │
│    ✓ telefono: 10 dígitos (formato MX)                               │
│    ✓ interes: debe estar seleccionado                                │
│    ✓ email: formato válido (si se completa)                          │
│                                                                       │
│    Si hay errores → Mostrar messages, no enviar                      │
│    Si OK → Continuar                                                 │
└─────────────────────────────┬──────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│      Transformación de Datos (en handleSubmit)                       │
│                                                                       │
│    nombre:   formData.nombre.trim()                                  │
│    telefono: toWhatsAppPhone(normalizePhone(telRaw))                 │
│    email:    formData.email.trim()                                   │
│    interes:  formData.interes (sin cambios)                          │
│    edad:     formData.edad (sin cambios)                             │
│    horario:  formData.horario (sin cambios)                          │
│    mensaje:  formData.mensaje.trim()                                 │
│                                                                       │
│    Resultado: data (objeto limpio y validado)                        │
└─────────────────────────────┬──────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│         fetch('/.netlify/functions/create-lead', {                   │
│           method: 'POST',                                            │
│           headers: { 'Content-Type': 'application/json' },           │
│           body: JSON.stringify(data)  ← PAYLOAD TRANSFORMADO        │
│         })                                                            │
└─────────────────────────────┬──────────────────────────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        │ Request HTTP enviado a Netlify            │
        │ Servidor recibe JSON exactamente igual    │
        │ que lo envió el cliente                   │
        └─────────────────────┬─────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│      netlify/functions/create-lead.js (Backend)                      │
│                                                                       │
│    1. Manejo CORS (OPTIONS)                                          │
│    2. Validar método POST solamente                                  │
│    3. Parsear JSON body                                              │
│    4. Validar campos requeridos nuevamente                           │
│    5. AGREGAR campo source = "contact-form"                          │
│    6. AGREGAR timestamp created_at                                   │
│    7. Conectar a Supabase (Service Role)                             │
│    8. INSERT en tabla "Leads"                                        │
│    9. Retornar { ok: true, id, created_at, message }                │
└─────────────────────────────┬──────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│           Supabase Database - Tabla "Leads"                          │
│                                                                       │
│    Registro INSERT completo:                                         │
│    • nombre                                                          │
│    • phone                                                           │
│    • email                                                           │
│    • interest                                                        │
│    • age_range                                                       │
│    • preferred_time                                                  │
│    • message                                                         │
│    • source ← "contact-form"                                         │
│    • created_at ← Timestamp servidor                                 │
└─────────────────────────────┬──────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│     Response JSON regresa al navegador                               │
│                                                                       │
│    {                                                                 │
│      ok: true,                                                       │
│      id: "uuid-generado-por-supabase",                               │
│      created_at: "2025-01-19T15:30:45.123Z",                         │
│      message: "¡Solicitud registrada exitosamente!"                  │
│    }                                                                 │
└─────────────────────────────┬──────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│           UI - Mostrar feedback al usuario                           │
│                                                                       │
│    ✅ Mostrar mensaje de éxito (verde, animado)                      │
│    🔄 Abrir WhatsApp automáticamente para seguimiento                │
│    🧹 Limpiar formulario                                             │
└──────────────────────────────────────────────────────────────────────┘

`;


// ====================================================================
// TABLA RESUMEN: TRANSFORMACIONES
// ====================================================================

const TABLA_TRANSFORMACIONES = `

┌──────────┬─────────────────────────┬──────────────────────┬──────────────┐
│ Campo    │ Entrada (HTML)          │ Función              │ Salida JSON  │
├──────────┼─────────────────────────┼──────────────────────┼──────────────┤
│ nombre   │ " Juan García López "   │ .trim()              │ "Juan Garcí…"│
│ telefono │ " 55 1593 8286"         │ normalize +          │ "+5215515938"│
│          │                         │ toWhatsAppPhone()    │              │
│ email    │ "juan@example.com "     │ .trim()              │ "juan@exam…" │
│ interes  │ "Muay Thai"             │ (sin cambio)         │ "Muay Thai"  │
│ edad     │ "18 años o más"         │ (sin cambio)         │ "18 años o…" │
│ horario  │ "Noche"                 │ (sin cambio)         │ "Noche"      │
│ mensaje  │ "  Tengo experiencia... │ .trim()              │ "Tengo expe…"│
│          │ "                       │                      │              │
│ source   │ (no existe en cliente)  │ Agregado en servidor │ "contact-for"│
│ created_ │ (no existe en cliente)  │ Agregado en servidor │ "2025-01-19…"│
│ at       │                         │                      │              │
└──────────┴─────────────────────────┴──────────────────────┴──────────────┘

`;


// ====================================================================
// EXPORTAR PARA DOCUMENTACIÓN
// ====================================================================

export {
  formData_ANTES,
  transformaciones,
  data_TRANSFORMADO,
  payload_EN_SUPABASE,
  response_EXITOSA,
  response_ERROR,
  TRANSFORMACION_COMPLETA,
  FLUJO_DIAGRAMA,
  TABLA_TRANSFORMACIONES,
};
