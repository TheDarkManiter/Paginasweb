/**
 * Minimal API client for the frontend.
 * - Uses VITE_API_URL when present; falls back to the production Railway URL.
 * - Always returns absolute URLs (no Netlify relative paths).
 */

const DEFAULT_API_BASE = 'https://scintillating-learning-production-8dd0.up.railway.app';

const normalizeBase = (value = '') => {
  const trimmed = value.trim();
  if (!trimmed) return DEFAULT_API_BASE;
  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
};

export const apiBaseUrl = normalizeBase(import.meta.env.VITE_API_URL || '');

const buildUrl = (path = '') => {
  const safePath = path.startsWith('/') ? path : `/${path}`;
  return `${apiBaseUrl}${safePath}`;
};

const parseJsonSafe = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const handleResponse = async (response) => {
  const data = await parseJsonSafe(response);
  if (!response.ok) {
    const message = data?.error || data?.message || `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return { ok: response.ok, status: response.status, data };
};

export async function apiPost(path, body) {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body ?? {}),
  });
  return handleResponse(response);
}

export async function apiGet(path) {
  const response = await fetch(buildUrl(path), {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  return handleResponse(response);
}
