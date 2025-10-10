// netlify/functions/zoho-day-events.ts
import type { Handler } from '@netlify/functions';

const DC = process.env.ZOHO_DC || 'eu';
const TOKEN_URL = `https://accounts.zoho.${DC}/oauth/v2/token`;
const API = `https://calendar.zoho.${DC}/api/v1`;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json; charset=utf-8',
};

async function getAccessToken() {
  const r = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.ZOHO_CLIENT_ID || '',
      client_secret: process.env.ZOHO_CLIENT_SECRET || '',
      refresh_token: process.env.ZOHO_REFRESH_TOKEN || '',
    }),
  });
  const j = await r.json();
  if (!r.ok || !j.access_token) throw new Error(`REFRESH_FAIL ${r.status}: ${JSON.stringify(j)}`);
  return j.access_token as string;
}

// '2025-10-12' -> '20251012T000000Z' y '20251012T235959Z'
function dayBoundsUTC(ymd: string) {
  const start = new Date(`${ymd}T00:00:00Z`);
  const end = new Date(`${ymd}T23:59:59Z`);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z'); // YYYYMMDDTHHMMSSZ
  return { from: fmt(start), to: fmt(end) };
}

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
    if (event.httpMethod !== 'POST')
      return { statusCode: 405, headers, body: JSON.stringify({ error: 'Only POST' }) };

    const { dateYMD, calendar_uid } = JSON.parse(event.body || '{}') as {
      dateYMD?: string;
      calendar_uid?: string;
    };

    if (!dateYMD) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Falta dateYMD (YYYY-MM-DD)' }) };
    }

    const token = await getAccessToken();

    // Si no te pasan UID, usa el primario.
    let calUid = calendar_uid as string | undefined;
    if (!calUid) {
      const r = await fetch(`${API}/calendars`, { headers: { Authorization: `Zoho-oauthtoken ${token}` } });
      const j = await r.json();
      if (!r.ok) return { statusCode: r.status, headers, body: JSON.stringify({ error: 'CAL_LIST_FAIL', detail: j }) };
      const primary = j?.calendars?.find((c: any) => c.isPrimary) || j?.calendars?.[0];
      if (!primary) return { statusCode: 400, headers, body: JSON.stringify({ error: 'No hay calendarios' }) };
      calUid = primary.uid;
    }

    // Rango del día en UTC
    const { from, to } = dayBoundsUTC(dateYMD);

    // Obtener eventos del día
    // NOTA: algunos tenants aceptan from/to en query; si tu cuenta exigiera otro nombre,
    // verás el detalle en el JSON de error de Zoho en los logs.
    const url = `${API}/calendars/${calUid}/events?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    const r2 = await fetch(url, { headers: { Authorization: `Zoho-oauthtoken ${token}` } });
    const j2 = await r2.json();

    if (!r2.ok) {
      return { statusCode: r2.status, headers, body: JSON.stringify({ error: 'LIST_EVENTS_FAIL', detail: j2 }) };
    }

    // Devuelve solo lo necesario para bloquear (start/end/timezone)
    const busy = (j2?.events || []).map((ev: any) => ({
      start: ev?.dateandtime?.start, // p.ej. '20251012T120000+0200'
      end: ev?.dateandtime?.end,
      timezone: ev?.dateandtime?.timezone,
      title: ev?.title,
    }));

    return { statusCode: 200, headers, body: JSON.stringify({ busy, calendar_uid: calUid }) };
  } catch (e: any) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'SERVER_ERROR', detail: e?.message || e }) };
  }
};
