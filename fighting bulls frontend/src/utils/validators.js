/**
 * Validadores para el formulario de contacto
 */

export function normalizePhone(raw) {
  return String(raw || '').replace(/\D/g, '');
}

export function isValidMXPhone(digits) {
  if (digits.length === 10) return true;
  if (digits.length === 12 && digits.startsWith('52')) return true;
  if (digits.length === 13 && digits.startsWith('521')) return true;
  return false;
}

export function toWhatsAppPhone(digits) {
  if (digits.length === 10) return '521' + digits;
  if (digits.length === 12 && digits.startsWith('52')) {
    return '521' + digits.slice(2);
  }
  if (digits.length === 13 && digits.startsWith('521')) return digits;
  return digits;
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidName(name) {
  return name.trim().length >= 2;
}

export function buildWhatsAppMessage(data) {
  const lines = [
    'Hola, quiero información / agendar clase de prueba en Fighting Bulls Academy.',
    '',
    `Nombre: ${data.nombre}`,
    `WhatsApp: ${data.telefono}`,
    `Interés: ${data.interes}`,
  ];

  if (data.edad) lines.push(`Edad: ${data.edad}`);
  if (data.horario) lines.push(`Horario preferido: ${data.horario}`);
  if (data.email) lines.push(`Correo: ${data.email}`);
  if (data.mensaje) lines.push(`Mensaje: ${data.mensaje}`);

  return lines.join('\n');
}
