/**
 * 🎯 PAYLOAD DEL FORMULARIO - RESUMEN EJECUTIVO
 * 
 * Una única fuente de verdad sobre el JSON que genera el formulario
 */

// ============================================================
// ESTRUCTURA EXACTA DEL PAYLOAD ENVIADO AL SERVIDOR
// ============================================================

const PAYLOAD_SCHEMA = {
  // Cliente proporciona estos campos:
  nombre: {
    type: "string",
    required: true,
    validation: "min 2 caracteres, sin números",
    transformation: ".trim()",
    example: "Juan García López"
  },
  
  telefono: {
    type: "string (formato +52XXXXXXXXXX)",
    required: true,
    validation: "exactamente 10 dígitos MX",
    transformation: "normalizePhone() → toWhatsAppPhone()",
    examples: {
      input: ["5515938286", "55 1593 8286", "+52 55 1593 8286"],
      output: "+5215515938286"
    }
  },
  
  email: {
    type: "string",
    required: false,
    validation: "formato email válido (si no vacío)",
    transformation: ".trim()",
    example: "usuario@example.com"
  },
  
  interes: {
    type: "string",
    required: true,
    validation: "debe ser una opción válida",
    transformation: "ninguna",
    options: [
      "Jiu-Jitsu",
      "Muay Thai",
      "Box",
      "Clases para niños",
      "Varias disciplinas",
      "Solo información"
    ]
  },
  
  edad: {
    type: "string",
    required: false,
    validation: "si se selecciona, debe ser opción válida",
    transformation: "ninguna",
    options: [
      "6 – 10 años",
      "11 – 14 años",
      "15 – 17 años",
      "18 años o más"
    ]
  },
  
  horario: {
    type: "string",
    required: false,
    validation: "si se selecciona, debe ser opción válida",
    transformation: "ninguna",
    options: [
      "Mañana",
      "Tarde",
      "Noche"
    ]
  },
  
  mensaje: {
    type: "string",
    required: false,
    validation: "sin restricción",
    transformation: ".trim()",
    example: "Tengo experiencia previa en boxeo"
  },
  
  // Servidor AGREGA estos campos:
  source: {
    type: "string",
    required: true,
    value: "contact-form",
    note: "Agregado por el servidor, NO viene del cliente"
  },
  
  created_at: {
    type: "ISO 8601 datetime",
    required: true,
    example: "2025-01-19T15:30:45.123Z",
    note: "Generado por el servidor, NO viene del cliente"
  }
};

// ============================================================
// EJEMPLO MÍNIMO (Solo requeridos)
// ============================================================

const EJEMPLO_MINIMO = {
  nombre: "Juan",
  telefono: "+5215515938286",
  interes: "Box",
  email: "",
  edad: "",
  horario: "",
  mensaje: "",
  source: "contact-form"
};

// ============================================================
// EJEMPLO MÁXIMO (Todos los campos)
// ============================================================

const EJEMPLO_MAXIMO = {
  nombre: "Juan García López",
  telefono: "+5215515938286",
  email: "juan.garcia@example.com",
  interes: "Muay Thai",
  edad: "18 años o más",
  horario: "Noche",
  mensaje: "Tengo experiencia en boxeo y quiero aprender Muay Thai. Disponible de 7pm a 9pm.",
  source: "contact-form"
};

// ============================================================
// TRANSFORMACIONES POR CAMPO
// ============================================================

const TRANSFORMACIONES_MAPEADAS = [
  {
    campo: "nombre",
    entrada_html_name: "nombre",
    funcion: ".trim()",
    descripcion: "Elimina espacios al inicio y final",
    ej_antes: " Juan García López ",
    ej_despues: "Juan García López"
  },
  {
    campo: "telefono",
    entrada_html_name: "telefono",
    funcion: "normalizePhone() → toWhatsAppPhone()",
    descripcion: "Extrae dígitos y añade prefijo WhatsApp +52",
    ej_antes: " 55 1593 8286 ",
    ej_despues: "+5215515938286"
  },
  {
    campo: "email",
    entrada_html_name: "email",
    funcion: ".trim()",
    descripcion: "Elimina espacios al inicio y final",
    ej_antes: "usuario@example.com ",
    ej_despues: "usuario@example.com"
  },
  {
    campo: "interes",
    entrada_html_name: "interes",
    funcion: "ninguna",
    descripcion: "Usa el valor exacto del <option> seleccionado",
    ej_antes: "Muay Thai",
    ej_despues: "Muay Thai"
  },
  {
    campo: "edad",
    entrada_html_name: "edad",
    funcion: "ninguna",
    descripcion: "Usa el valor exacto del <option> seleccionado",
    ej_antes: "18 años o más",
    ej_despues: "18 años o más"
  },
  {
    campo: "horario",
    entrada_html_name: "horario",
    funcion: "ninguna",
    descripcion: "Usa el valor exacto del <option> seleccionado",
    ej_antes: "Noche",
    ej_despues: "Noche"
  },
  {
    campo: "mensaje",
    entrada_html_name: "mensaje",
    funcion: ".trim()",
    descripcion: "Elimina espacios al inicio y final",
    ej_antes: "  Mi mensaje  ",
    ej_despues: "Mi mensaje"
  }
];

// ============================================================
// VALIDACIONES REQUERIDAS
// ============================================================

const VALIDACIONES = {
  requeridos: [
    {
      campo: "nombre",
      regla: "Mínimo 2 caracteres, sin números",
      ejemplos_validos: ["Juan", "María García", "Carlos López"],
      ejemplos_invalidos: ["A", "Juan123", ""]
    },
    {
      campo: "telefono",
      regla: "Exactamente 10 dígitos (formato México)",
      ejemplos_validos: [
        "5515938286",
        "55 1593 8286",
        "+52 55 1593 8286",
        "(55) 1593-8286"
      ],
      ejemplos_invalidos: [
        "123456",
        "5512345",
        "+1 555 1234",
        ""
      ]
    },
    {
      campo: "interes",
      regla: "Debe seleccionar una opción válida",
      ejemplos_validos: [
        "Jiu-Jitsu",
        "Muay Thai",
        "Box",
        "Clases para niños",
        "Varias disciplinas",
        "Solo información"
      ],
      ejemplos_invalidos: ["", "Karate", null]
    }
  ],
  
  opcionales: [
    {
      campo: "email",
      regla: "Si se completa, debe ser formato válido",
      ejemplos_validos: [
        "usuario@example.com",
        "maria.garcia@hotmail.com",
        ""
      ],
      ejemplos_invalidos: [
        "usuario@",
        "ejemplo.com",
        "usuario @example.com"
      ]
    },
    {
      campo: "edad",
      regla: "Si se selecciona, debe ser opción válida",
      ejemplos_validos: ["6 – 10 años", "18 años o más", ""],
      ejemplos_invalidos: ["25 años", "Adulto"]
    },
    {
      campo: "horario",
      regla: "Si se selecciona, debe ser opción válida",
      ejemplos_validos: ["Mañana", "Tarde", "Noche", ""],
      ejemplos_invalidos: ["10am", "7pm"]
    },
    {
      campo: "mensaje",
      regla: "Sin restricción (puede estar vacío)",
      ejemplos_validos: [
        "Tengo experiencia previa",
        "Quiero aprender para defensa personal",
        ""
      ],
      ejemplos_invalidos: []
    }
  ]
};

// ============================================================
// MAPEO DIRECTO: name HTML → JSON key
// ============================================================

const MAPEO_DIRECTO = {
  "nombre":  "nombre",
  "telefono": "telefono",
  "email":   "email",
  "interes": "interes",
  "edad":    "edad",
  "horario": "horario",
  "mensaje": "mensaje"
};

// ============================================================
// FLUJO DE DATOS (PASO A PASO)
// ============================================================

const FLUJO_PASO_A_PASO = `
1️⃣  Usuario escribe en formulario
    → handleChange() guarda en formData (estado React)
    
2️⃣  Usuario hace click "Enviar"
    → onSubmit dispara handleSubmit()
    
3️⃣  validate() verifica requeridos
    → Si hay errores, mostrar y detener
    → Si OK, continuar
    
4️⃣  Transformar datos:
    const data = {
      nombre:   formData.nombre.trim(),
      telefono: toWhatsAppPhone(normalizePhone(telRaw)),
      email:    formData.email.trim(),
      interes:  formData.interes,
      edad:     formData.edad,
      horario:  formData.horario,
      mensaje:  formData.mensaje.trim()
    }
    
5️⃣  fetch('/.netlify/functions/create-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
6️⃣  Netlify Function recibe JSON exactamente como se envió
    
7️⃣  Servidor AGREGA:
    • source: "contact-form"
    • created_at: new Date().toISOString()
    
8️⃣  INSERT en tabla Supabase "Leads"
    
9️⃣  Response:
    {
      ok: true,
      id: "uuid",
      created_at: "2025-01-19T...",
      message: "Registrado exitosamente"
    }
    
🔟 UI muestra éxito + abre WhatsApp automáticamente
`;

// ============================================================
// TESTING RÁPIDO EN DEVTOOLS
// ============================================================

const TESTING_SCRIPT = `
// Copia en DevTools Console (F12):

const testPayload = {
  nombre: "Test User",
  telefono: "+5215515938286",
  email: "test@example.com",
  interes: "Box",
  edad: "18 años o más",
  horario: "Noche",
  mensaje: "Test message",
  source: "contact-form"
};

fetch('/.netlify/functions/create-lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testPayload)
})
  .then(response => response.json())
  .then(data => {
    console.log('✅ Respuesta:', data);
    if (data.ok) {
      console.log('✓ ID guardado:', data.id);
      console.log('✓ Timestamp:', data.created_at);
    }
  })
  .catch(error => console.error('❌ Error:', error));
`;

// ============================================================
// EXPORTAR TODO
// ============================================================

export {
  PAYLOAD_SCHEMA,
  EJEMPLO_MINIMO,
  EJEMPLO_MAXIMO,
  TRANSFORMACIONES_MAPEADAS,
  VALIDACIONES,
  MAPEO_DIRECTO,
  FLUJO_PASO_A_PASO,
  TESTING_SCRIPT
};
