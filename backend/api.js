const http = require('http');
const url = require('url');

// Storage em memória
const users = [];
const maquinas = [];
let userId = 1;
let maquinaId = 1;

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // GET /users
  if (pathname === '/users' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(users));
    return;
  }

  // POST /users
  if (pathname === '/users' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { name, email, role } = JSON.parse(body);
        if (!name || !email) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Nome e email obrigatórios' }));
          return;
        }
        const user = { _id: userId++, name, email, role: role || 'user', createdAt: new Date() };
        users.push(user);
        res.writeHead(201);
        res.end(JSON.stringify(user));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // DELETE /users/:id
  if (pathname.match(/^\/users\/\d+$/) && req.method === 'DELETE') {
    const id = parseInt(pathname.split('/')[2]);
    const idx = users.findIndex(u => u._id === id);
    if (idx === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Não encontrado' }));
      return;
    }
    users.splice(idx, 1);
    res.writeHead(204);
    res.end();
    return;
  }

  // GET /maquinas
  if (pathname === '/maquinas' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(maquinas));
    return;
  }

  // POST /maquinas
  if (pathname === '/maquinas' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { nome, tipo, status } = JSON.parse(body);
        if (!nome || !tipo) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Nome e tipo obrigatórios' }));
          return;
        }
        const maq = { _id: maquinaId++, nome, tipo, status: status || 'ativa', dataCriacao: new Date() };
        maquinas.push(maq);
        res.writeHead(201);
        res.end(JSON.stringify(maq));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // DELETE /maquinas/:id
  if (pathname.match(/^\/maquinas\/\d+$/) && req.method === 'DELETE') {
    const id = parseInt(pathname.split('/')[2]);
    const idx = maquinas.findIndex(m => m._id === id);
    if (idx === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Não encontrado' }));
      return;
    }
    maquinas.splice(idx, 1);
    res.writeHead(204);
    res.end();
    return;
  }

  // Rota padrão
  res.writeHead(200);
  res.end(JSON.stringify({ message: '✅ API rodando', users: users.length, maquinas: maquinas.length }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n✅ API rodando em http://localhost:${PORT}\n`);
  console.log('Endpoints:');
  console.log('  GET  /users');
  console.log('  POST /users (name, email, role)');
  console.log('  DEL  /users/:id');
  console.log('  GET  /maquinas');
  console.log('  POST /maquinas (nome, tipo, status)');
  console.log('  DEL  /maquinas/:id\n');
});

server.on('error', (err) => {
  console.error('❌ Erro:', err);
});
