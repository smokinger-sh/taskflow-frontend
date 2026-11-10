// Shared fetch helper used by users.js and tasks.js
export const API_BASE = (
  import.meta.env.VITE_API_BASE_URL ||
  'https://taskflowapi-v2-0-0-1.onrender.com'
).replace(/\/$/, '');

function extractMessage(data, fallback) {
  if (!data) return fallback;
  if (typeof data === 'string') return data;
  if (data.message) return data.message;
  if (data.error) return data.error;
  // Spring validation errors often come back as { field: "message", ... }
  const values = Object.values(data).filter((v) => typeof v === 'string');
  return values.length ? values.join(', ') : fallback;
}

export async function request(path, options = {}) {
  const headers = new Headers(options.headers);
  if (options.body != null && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(
      'Cannot reach the server. It may be waking up (free hosting) or blocked by CORS. Please try again in a moment.'
    );
  }

  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    throw new Error(extractMessage(data, `Request failed (${res.status})`));
  }
  return data;
}
