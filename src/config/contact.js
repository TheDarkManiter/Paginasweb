/**
 * Configuración centralizada de contacto
 * Single source of truth para todos los números de WhatsApp
 */

// Número sin formato (para wa.me API)
export const WHATSAPP_WA = '5215579389286';

// Número con formato legible para mostrar a usuarios
export const WHATSAPP_DISPLAY = '+52 1 55 7938 9286';

// URL completa de WhatsApp
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_WA}`;

/**
 * Función helper para construir URL de WhatsApp con mensaje
 * @param {string} message - Mensaje a enviar (opcional)
 * @returns {string} URL completa de wa.me con mensaje
 */
export function getWhatsAppLink(message = '') {
  if (!message) return WHATSAPP_URL;
  const encodedMessage = encodeURIComponent(message);
  return `${WHATSAPP_URL}?text=${encodedMessage}`;
}
