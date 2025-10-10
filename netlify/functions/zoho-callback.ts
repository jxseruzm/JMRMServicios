import type { Handler } from '@netlify/functions';
export const handler: Handler = async () => ({
  statusCode: 200,
  headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  body: 'OK',
});