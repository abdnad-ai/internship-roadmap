const http = require('http');

let jobPostingOpen = false;
const secret = process.env.DEMO_SECRET || 'local-demo-secret';

function sendJson(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(body));
}

http.createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');

  if (request.method === 'GET' && url.pathname === '/api/status') {
    return sendJson(response, 200, {
      jobPostingOpen,
      message: jobPostingOpen ? 'Internship applications are open.' : 'No internship applications are open.',
      updatedAt: new Date().toISOString(),
    });
  }

  if (request.method === 'GET' && url.pathname === '/jobs') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(`<main><h1>Watchpost Demo Jobs</h1><p>${jobPostingOpen ? 'Internship applications are now open.' : 'No open internship applications.'}</p></main>`);
    return;
  }

  if (request.method === 'POST' && url.pathname === '/admin/state') {
    if (request.headers['x-demo-secret'] !== secret) return sendJson(response, 403, { message: 'Invalid demo secret' });
    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', () => {
      try {
        const payload = JSON.parse(body);
        if (typeof payload.jobPostingOpen !== 'boolean') return sendJson(response, 400, { message: 'jobPostingOpen must be a boolean' });
        jobPostingOpen = payload.jobPostingOpen;
        return sendJson(response, 200, { jobPostingOpen });
      } catch {
        return sendJson(response, 400, { message: 'Invalid JSON' });
      }
    });
    return;
  }

  return sendJson(response, 404, { message: 'Not found' });
}).listen(8080, () => console.log('Demo target listening on port 8080'));
