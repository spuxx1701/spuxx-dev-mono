import type { APIRoute } from 'astro';
export const get: APIRoute = async function get() {
  return { body: JSON.stringify({ status: 'ok' }) };
};
