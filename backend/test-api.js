#!/usr/bin/env node

// Script de teste da API
const http = require('http');

function makeRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`[${method} ${path}] Status: ${res.statusCode}`);
        try {
          console.log(JSON.parse(body));
        } catch {
          console.log(body);
        }
        resolve();
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function test() {
  console.log('🧪 Testando API...\n');

  try {
    // Test GET /
    await makeRequest('GET', '/');
    console.log('');

    // Test GET /users
    await makeRequest('GET', '/users');
    console.log('');

    // Test POST /users
    const newUser = { name: 'João', email: `joao_${Date.now()}@email.com`, role: 'user' };
    await makeRequest('POST', '/users', newUser);
    console.log('');

    // Test GET /users again
    await makeRequest('GET', '/users');
    console.log('');

    console.log('✅ Testes concluídos!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro:', err);
    process.exit(1);
  }
}

test();
