import http from 'node:http';
import os from 'node:os';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApiHandler } from './api.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public');
const handleApi = createApiHandler();
const PORT = Number(process.env.PORT) || 4173;

async function localEnv() {
  let key = process.env.DEEPSEEK_API_KEY || '';
  let model = process.env.DEEPSEEK_MODEL || '';
  try {
    const raw = await readFile(path.join(path.dirname(fileURLToPath(import.meta.url)), '.env.local'), 'utf8');
    const keyMatch = raw.match(/^\s*DEEPSEEK_API_KEY\s*=\s*(.*?)\s*$/m);
    if (keyMatch?.[1]) key = keyMatch[1].replace(/^['"]|['"]$/g, '');
    const modelMatch = raw.match(/^\s*DEEPSEEK_MODEL\s*=\s*(.*?)\s*$/m);
    if (modelMatch?.[1]) model = modelMatch[1].replace(/^['"]|['"]$/g, '');
  } catch {}
  return { DEEPSEEK_API_KEY: key, DEEPSEEK_MODEL: model };
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.txt': 'text/plain; charset=utf-8',
};

function lanAddresses() {
  const out = [];
  for (const list of Object.values(os.networkInterfaces())) {
    for (const net of list || []) {
      if (net.family === 'IPv4' && !net.internal) out.push(net.address);
    }
  }
  return out;
}

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    if (url.pathname.startsWith('/api/')) {
      const chunks = []; let size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 20000) { res.writeHead(413, { 'content-type': 'application/json' }); res.end(JSON.stringify({ error: '输入内容过长。' })); return; }
        chunks.push(chunk);
      }
      const headers = new Headers();
      for (const [k, v] of Object.entries(req.headers)) if (typeof v === 'string') headers.set(k, v);
      headers.set('x-local-user', 'lan-user');
      const request = new Request(url, {
        method: req.method,
        headers,
        ...(req.method !== 'GET' && req.method !== 'HEAD' ? { body: Buffer.concat(chunks) } : {}),
      });
      const response = await handleApi(request, await localEnv());
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
      return;
    }
    const pathname = decodeURIComponent(url.pathname);
    const filename = pathname === '/' ? 'index.html' : pathname.slice(1);
    const resolved = path.resolve(root, filename);
    if (!resolved.startsWith(root + path.sep) && resolved !== path.join(root, 'index.html')) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(resolved).toLowerCase();
    if (!MIME[ext]) { res.writeHead(404); res.end('Not found'); return; }
    const data = await readFile(resolved);
    res.writeHead(200, { 'Content-Type': MIME[ext], 'Cache-Control': 'no-cache' });
    res.end(data);
  } catch {
    res.writeHead(500); res.end('Preview unavailable');
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log(`本机访问: http://localhost:${PORT}`);
  for (const ip of lanAddresses()) console.log(`局域网(手机同一Wi-Fi): http://${ip}:${PORT}`);
});