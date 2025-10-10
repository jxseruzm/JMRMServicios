// netlify/functions/zoho-callback.ts
import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  try {
    const code = event.queryStringParameters?.code;
    if (!code) {
      return { statusCode: 400, body: 'Falta ?code=' };
    }

    const dc = 'eu'; // usa 'eu' si tu cuenta es UE, 'com' si no
    const resp = await fetch(`https://accounts.zoho.${dc}/oauth/v2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.ZOHO_CLIENT_ID!,
        client_secret: process.env.ZOHO_CLIENT_SECRET!,
        code,
        redirect_uri: process.env.ZOHO_REDIRECT_URI!,
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        body: `Error al canjear code: ${JSON.stringify(data)}`,
      };
    }

    // TODO: guarda tokens de forma segura (Vault, DB, etc.)
    // Por ahora, muéstralos 1 sola vez y luego desactiva esta impresión.
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: `
        <h1>Autorización completada ✅</h1>
        <p>Copia estos tokens y guárdalos de forma segura, luego elimina esta salida de la función.</p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `,
    };
  } catch (e: any) {
    return { statusCode: 500, body: `Fallo callback: ${e?.message || e}` };
  }
};
