/**
 * 📋 EJEMPLOS DE PAYLOADS DEL FORMULARIO DE CONTACTO
 * 
 * Usa estos datos para testing local con:
 * - DevTools Console (fetch manual)
 * - netlify dev (testing local)
 * - Testing manual en navegador
 */

// ================================================================
// 1️⃣ PAYLOAD COMPLETO (todos los campos completados)
// ================================================================
const payload_completo = {
  nombre: "Juan García López",
  telefono: "+5215515938286",
  email: "juan.garcia@example.com",
  interes: "Muay Thai",
  edad: "18 años o más",
  horario: "Noche",
  mensaje: "Tengo experiencia en boxeo y quiero aprender Muay Thai. Disponible de 7pm a 9pm.",
  source: "contact-form"
};

// ================================================================
// 2️⃣ PAYLOAD MÍNIMO (solo campos requeridos)
// ================================================================
const payload_minimo = {
  nombre: "Carlos López",
  telefono: "+5215559876543",
  email: "",
  interes: "Box",
  edad: "",
  horario: "",
  mensaje: "",
  source: "contact-form"
};

// ================================================================
// 3️⃣ PAYLOAD VARIANTES DE TELÉFONO (todos generan el mismo resultado)
// ================================================================

// Formato: 10 dígitos sin prefijo
// Input: "5515938286" → Normaliza → toWhatsAppPhone() → "+5215515938286"
const payload_telefono_corto = {
  nombre: "María Rodríguez",
  telefono: "+5215515938286",  // Resultado final después de transform
  email: "maria@example.com",
  interes: "Jiu-Jitsu",
  edad: "18 años o más",
  horario: "Tarde",
  mensaje: "",
  source: "contact-form"
};

// Formato: con espacios
// Input: "55 1593 8286" → Normaliza → "+5215515938286"
const payload_telefono_espacios = {
  nombre: "Andrea Morales",
  telefono: "+5215515938286",  // Resultado final
  email: "andrea@example.com",
  interes: "Clases para niños",
  edad: "6 – 10 años",
  horario: "Mañana",
  mensaje: "Mi hijo quiere aprender.",
  source: "contact-form"
};

// ================================================================
// 4️⃣ PAYLOAD POR CLASE DE INTERÉS
// ================================================================

const payload_jiujitsu = {
  nombre: "David Chen",
  telefono: "+5215551234567",
  email: "david.chen@gmail.com",
  interes: "Jiu-Jitsu",
  edad: "18 años o más",
  horario: "Noche",
  mensaje: "Competidor de jiu-jitsu, busco entrenamiento avanzado.",
  source: "contact-form"
};

const payload_muaythai = {
  nombre: "Sofía Mendez",
  telefono: "+5216625554321",
  email: "sofia.mendez@outlook.com",
  interes: "Muay Thai",
  edad: "18 años o más",
  horario: "Tarde",
  mensaje: "Principiante, interesada en cardio y defensa.",
  source: "contact-form"
};

const payload_box = {
  nombre: "Roberto Santos",
  telefono: "+5217731111111",
  email: "rsantos@example.com",
  interes: "Box",
  edad: "18 años o más",
  horario: "Mañana",
  mensaje: "Exboxeador buscando entrenar.",
  source: "contact-form"
};

const payload_ninos = {
  nombre: "Patricia Gómez",
  telefono: "+5212223456789",
  email: "patricia@example.com",
  interes: "Clases para niños",
  edad: "6 – 10 años",
  horario: "Tarde",
  mensaje: "Quiero inscribir a mi hijo de 8 años.",
  source: "contact-form"
};

const payload_varias = {
  nombre: "Ignacio Flores",
  telefono: "+5219999999999",
  email: "ignacio.flores@gmail.com",
  interes: "Varias disciplinas",
  edad: "15 – 17 años",
  horario: "Noche",
  mensaje: "Adolescente interesado en probar todas.",
  source: "contact-form"
};

const payload_info = {
  nombre: "Claudia Ruiz",
  telefono: "+5215556666666",
  email: "claudia@example.com",
  interes: "Solo información",
  edad: "",
  horario: "",
  mensaje: "Solicito información de membresías.",
  source: "contact-form"
};

// ================================================================
// 5️⃣ PAYLOAD POR RANGO DE EDAD
// ================================================================

const payload_edad_6_10 = {
  nombre: "Fernando López Niño",
  telefono: "+5215557777777",
  email: "fernando.nino@example.com",
  interes: "Clases para niños",
  edad: "6 – 10 años",
  horario: "Tarde",
  mensaje: "Mi hijo tiene 9 años.",
  source: "contact-form"
};

const payload_edad_11_14 = {
  nombre: "Diana Sánchez",
  telefono: "+5215558888888",
  email: "diana@example.com",
  interes: "Jiu-Jitsu",
  edad: "11 – 14 años",
  horario: "Tarde",
  mensaje: "Adolescente principiante.",
  source: "contact-form"
};

const payload_edad_15_17 = {
  nombre: "Marco Antonio",
  telefono: "+5215559999999",
  email: "marco@example.com",
  interes: "Box",
  edad: "15 – 17 años",
  horario: "Noche",
  mensaje: "Joven interesado en boxeo serio.",
  source: "contact-form"
};

const payload_edad_adulto = {
  nombre: "Elizabeth García",
  telefono: "+5215550000000",
  email: "elizabeth@example.com",
  interes: "Muay Thai",
  edad: "18 años o más",
  horario: "Mañana",
  mensaje: "Adulta profesional con horario matutino.",
  source: "contact-form"
};

// ================================================================
// 6️⃣ FUNCIÓN PARA TESTING: Enviar payload a Netlify Function
// ================================================================

async function testSubmitPayload(payload) {
  console.log('📤 Enviando payload:', payload);
  
  try {
    const response = await fetch('/.netlify/functions/create-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log('✅ Respuesta:', result);
    return result;
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// ================================================================
// 7️⃣ COMANDOS PARA TESTING EN DEVTOOLS CONSOLE
// ================================================================

/*
// Copia y pega en DevTools Console (F12) para probar:

// Test 1: Payload completo
testSubmitPayload({
  nombre: "Test User",
  telefono: "+5215515938286",
  email: "test@example.com",
  interes: "Box",
  edad: "18 años o más",
  horario: "Noche",
  mensaje: "Mensaje de prueba",
  source: "contact-form"
});

// Test 2: Payload mínimo
testSubmitPayload({
  nombre: "Test Minimal",
  telefono: "+5215515938286",
  email: "",
  interes: "Jiu-Jitsu",
  edad: "",
  horario: "",
  mensaje: "",
  source: "contact-form"
});

// Test 3: Usar un preset
testSubmitPayload(payload_completo);
testSubmitPayload(payload_minimo);
testSubmitPayload(payload_jiujitsu);

*/

// ================================================================
// 8️⃣ ESTRUCTURA ESPERADA DE RESPUESTA
// ================================================================

const response_exitosa = {
  ok: true,
  id: "550e8400-e29b-41d4-a716-446655440000",  // UUID de Supabase
  created_at: "2025-01-19T15:30:45.123Z",
  message: "¡Solicitud registrada exitosamente!"
};

const response_error = {
  ok: false,
  error: "Campo 'nombre' es obligatorio"  // O 'telefono', 'interes', etc.
};

// ================================================================
// 9️⃣ EXPORT PARA USAR EN TESTS
// ================================================================

export {
  // Payloads principales
  payload_completo,
  payload_minimo,
  
  // Por clase
  payload_jiujitsu,
  payload_muaythai,
  payload_box,
  payload_ninos,
  payload_varias,
  payload_info,
  
  // Por edad
  payload_edad_6_10,
  payload_edad_11_14,
  payload_edad_15_17,
  payload_edad_adulto,
  
  // Teléfono
  payload_telefono_corto,
  payload_telefono_espacios,
  
  // Función de testing
  testSubmitPayload,
  
  // Respuestas esperadas
  response_exitosa,
  response_error,
};
