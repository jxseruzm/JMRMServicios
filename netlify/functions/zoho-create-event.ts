import type { Handler } from '@netlify/functions';

const DC = process.env.ZOHO_DC || 'eu';
const TOKEN_URL = `https://accounts.zoho.${DC}/oauth/v2/token`;
const API = `https://calendar.zoho.${DC}/api/v1`;

async function getAccessToken() {
  const r = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
    }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`Refresh fail: ${JSON.stringify(j)}`);
  return j.access_token as string;
}

const toZohoUtc = (iso: string) =>
  iso.replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Only POST' };
    const { title, description, startISO, endISO, timezone = 'Europe/Madrid', attendees = [], calendar_uid } = JSON.parse(event.body || '{}');
    if (!title || !startISO || !endISO) return { statusCode: 400, body: 'Faltan campos' };

    const token = await getAccessToken();

    // 1) Calendar UID
    let calUid = calendar_uid as string | undefined;
    if (!calUid) {
      const r = await fetch(`${API}/calendars`, { headers: { Authorization: `Zoho-oauthtoken ${token}` }});
      const j = await r.json();
      const primary = j?.calendars?.find((c: any) => c.isPrimary) || j?.calendars?.[0];
      if (!primary) return { statusCode: 400, body: 'No hay calendarios' };
      calUid = primary.uid;
    }

    // 2) Create event
    const eventdata = {
      title,
      description,
      dateandtime: {
        timezone,
        start: toZohoUtc(startISO),
        end: toZohoUtc(endISO),
      },
      attendees, // [{email:"foo@bar.com", permission:1, attendance:1}]
      reminders: [{ action: 'popup', minutes: 15 }],
      calendar_alarm: true,
    };

    const url = `${API}/calendars/${calUid}/events?eventdata=${encodeURIComponent(JSON.stringify(eventdata))}`;
    const r2 = await fetch(url, { method: 'POST', headers: { Authorization: `Zoho-oauthtoken ${token}` }});
    const j2 = await r2.json();
    if (!r2.ok) return { statusCode: r2.status, body: JSON.stringify(j2) };

    return { statusCode: 200, body: JSON.stringify(j2) }; // incluye viewEventURL
  } catch (e:any) {
    return { statusCode: 500, body: e.message || 'error' };
  }
};
