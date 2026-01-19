/**
 * Netlify Function: Create Lead in Supabase
 * Recibe datos del formulario y guarda en tabla "Leads"
 * 
 * Variables de entorno requeridas:
 * - SUPABASE_URL: URL de Supabase (ej. https://xyz.supabase.co)
 * - SUPABASE_SECRET_KEY: Clave secreta de Supabase para acceso backend
 */

import { createClient } from '@supabase/supabase-js';

// Obtener variables de entorno
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

// Validar que las variables están presentes
if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  console.error('[create-lead] Faltan variables de entorno: SUPABASE_URL o SUPABASE_SECRET_KEY');
}

// Crear cliente de Supabase (con clave secreta - solo en servidor)
const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

/**
 * Validación básica de datos
 */
function validatePayload(data) {
  const errors = [];

  if (!data.nombre || typeof data.nombre !== 'string' || data.nombre.trim().length < 2) {
    errors.push('Nombre requerido (mínimo 2 caracteres)');
  }

  if (!data.telefono || typeof data.telefono !== 'string') {
    errors.push('Teléfono requerido');
  }

  if (!data.interes || typeof data.interes !== 'string' || data.interes.trim().length === 0) {
    errors.push('Interés/clase requerida');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Handler principal de la Netlify Function
 */
export default async (req, context) => {
  // CORS: Manejar OPTIONS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Solo aceptar POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Método no permitido. Use POST.',
      }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Parsear JSON del body
    let payload;
    try {
      payload = await req.json();
    } catch (e) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'JSON inválido en el body',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validar datos
    const validation = validatePayload(payload);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'Datos inválidos',
          details: validation.errors,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Preparar datos para insertar
    const leadData = {
      name: payload.nombre.trim(),
      phone: payload.telefono.trim(),
      email: payload.email && payload.email.trim() ? payload.email.trim() : null,
      interest: payload.interes.trim(),
      age_range: payload.edad && payload.edad.trim() ? payload.edad.trim() : null,
      preferred_time: payload.horario && payload.horario.trim() ? payload.horario.trim() : null,
      message: payload.mensaje && payload.mensaje.trim() ? payload.mensaje.trim() : null,
      source: 'web', // identificar que vino del sitio
      created_at: new Date().toISOString(),
    };

    // Insertar en Supabase tabla "Leads"
    const { data, error } = await supabase
      .from('Leads')
      .insert([leadData])
      .select('id, created_at');

    if (error) {
      console.error('[create-lead] Error al insertar en Supabase:', error.message);
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'Error al guardar los datos. Intenta más tarde.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Éxito
    return new Response(
      JSON.stringify({
        ok: true,
        id: data?.[0]?.id,
        created_at: data?.[0]?.created_at,
        message: '¡Tu solicitud fue registrada exitosamente!',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('[create-lead] Error inesperado:', err.message);
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Error interno del servidor',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
