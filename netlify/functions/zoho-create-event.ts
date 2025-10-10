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

const toZohoUtc = (iso: string) => iso.replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers, body: '' };
    }
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, headers, body: JSON.stringify({ error: 'Only POST' }) };
    }

    const { title, description, startISO, endISO, timezone = 'Europe/Madrid', attendees = [], calendar_uid } =
      JSON.parse(event.body || '{}');

    if (!title || !startISO || !endISO) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Faltan campos: title/startISO/endISO' }) };
    }

    const token = await getAccessToken();

    // 1) Calendar UID
    let calUid: string | undefined = calendar_uid;
    if (!calUid) {
      const r = await fetch(`${API}/calendars`, { headers: { Authorization: `Zoho-oauthtoken ${token}` } });
      const j = await r.json();
      if (!r.ok) return { statusCode: r.status, headers, body: JSON.stringify({ error: 'CAL_LIST_FAIL', detail: j }) };
      const primary = j?.calendars?.find((c: any) => c.isPrimary) || j?.calendars?.[0];
      if (!primary) return { statusCode: 400, headers, body: JSON.stringify({ error: 'No hay calendarios' }) };
      calUid = primary.uid;
    }

    // 2) Create event
    const eventdata = {
      title,
      description,
      dateandtime: { timezone, start: toZohoUtc(startISO), end: toZohoUtc(endISO) },
      attendees, // [{email, permission:1, attendance:1}]
      reminders: [{ action: 'popup', minutes: 15 }],
      calendar_alarm: true,
    };

    const url = `${API}/calendars/${calUid}/events?eventdata=${encodeURIComponent(JSON.stringify(eventdata))}`;
    const r2 = await fetch(url, { method: 'POST', headers: { Authorization: `Zoho-oauthtoken ${token}` } });
    const j2 = await r2.json();
    if (!r2.ok) return { statusCode: r2.status, headers, body: JSON.stringify({ error: 'CREATE_FAIL', detail: j2 }) };

    return { statusCode: 200, headers, body: JSON.stringify(j2) }; // suele incluir viewEventURL
  } catch (e: any) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'SERVER_ERROR', detail: e?.message || e }) };
  }
};
