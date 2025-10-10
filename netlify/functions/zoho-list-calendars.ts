// netlify/functions/zoho-list-calendars.ts
import type { Handler } from '@netlify/functions';

const DC = process.env.ZOHO_DC || 'eu';
const TOKEN_URL = `https://accounts.zoho.${DC}/oauth/v2/token`;
const API = `https://calendar.zoho.${DC}/api/v1`;

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
  if (!r.ok || !j.access_token) throw new Error(JSON.stringify(j));
  return j.access_token as string;
}

export const handler: Handler = async () => {
  try {
    const token = await getAccessToken();
    const r = await fetch(`${API}/calendars`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });
    const j = await r.json();
    return { statusCode: r.status, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(j, null, 2) };
  } catch (e: any) {
    return { statusCode: 500, body: e?.message || 'error' };
  }
};
