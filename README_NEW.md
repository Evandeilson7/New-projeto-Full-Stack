# 🚀 Full Stack CRUD Application

## 📌 Overview
Aplicação Full Stack moderna com CRUD completo para Usuários e Máquinas.

**Status**: ✅ Totalmente funcional em desenvolvimento

### Stack
- **Backend**: Node.js (HTTP nativo, sem frameworks)
- **Frontend**: Vue 3 + Pinia + Tailwind CSS
- **Dados**: Em memória (adequado para desenvolvimento/demo)
- **Porta Backend**: 3000
- **Porta Frontend**: 5174

## 🚀 Início Rápido

### 1️⃣ Terminal 1 - Backend
```powershell
cd backend
node api.js
```
✅ Saída esperada: `📋 Servidor ouvindo na porta 3000`

### 2️⃣ Terminal 2 - Frontend  
```powershell
cd frontend
npm install  # Apenas primeira vez
npm run dev
```
✅ Navegue para: `http://localhost:5174`

## 🎯 Funcionalidades

### ✅ Usuários
- ✨ Criar novo usuário
- ✏️ Editar usuário existente
- 🗑️ Deletar usuário (com confirmação)
- 📋 Listar todos os usuários
- ✓ Validação de formulário
- 📬 Feedback de sucesso/erro

### ✅ Máquinas
- ✨ Criar nova máquina
- ✏️ Editar máquina existente
- 🗑️ Deletar máquina (com confirmação)
- 📋 Listar todas as máquinas
- ⚙️ Status: Ativa/Parada/Manutenção
- 📬 Feedback em tempo real

## 📁 Estrutura do Projeto

```
New-projeto-Full-Stack/
├── backend/
│   ├── api.js (Servidor HTTP - PORTA 3000)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/ (UserForm, MaquinaForm, etc)
│   │   ├── views/ (Users.vue, Maquinas.vue)
│   │   ├── stores/ (Pinia: user.js, maquina.js)
│   │   └── services/ (api.js - Axios)
│   ├── vite.config.js
│   └── package.json
├── DOCUMENTATION.md (Documentação completa)
├── TESTING_GUIDE.md (Como testar)
└── ENHANCEMENT_SUMMARY.md (Melhorias implementadas)
```

## 🔌 API Endpoints

### Usuários
```
GET    /users              → Listar usuários
POST   /users              → Criar usuário
PUT    /users/:id          → Editar usuário
DELETE /users/:id          → Deletar usuário
```

### Máquinas
```
GET    /maquinas           → Listar máquinas
POST   /maquinas           → Criar máquina
PUT    /maquinas/:id       → Editar máquina
DELETE /maquinas/:id       → Deletar máquina
```

## 💾 Estrutura de Dados

### Usuário
```json
{
  "_id": 1,
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "user" | "admin"
}
```

### Máquina
```json
{
  "_id": 1,
  "nome": "Prensa Hidráulica",
  "tipo": "Industrial",
  "status": "ativa" | "parada" | "manutencao"
}
```

## 🧪 Testando a Aplicação

### Via Browser
1. Abrir `http://localhost:5174`
2. Navegar para "👥 Usuários" ou "⚙️ Máquinas"
3. Testar CRUD:
   - ➕ Criar novo
   - ✏️ Editar existente  
   - 🗑️ Deletar com confirmação

### Via API (PowerShell)
```powershell
# Criar usuário
$body = @{name='João'; email='joao@test.com'; role='user'} | ConvertTo-Json
Invoke-WebRequest -Uri http://localhost:3000/users -Method POST `
  -ContentType application/json -Body $body

# Listar usuários
Invoke-WebRequest -Uri http://localhost:3000/users -Method GET

# Editar usuário
$body = @{name='João Atualizado'} | ConvertTo-Json
Invoke-WebRequest -Uri http://localhost:3000/users/1 -Method PUT `
  -ContentType application/json -Body $body

# Deletar usuário
Invoke-WebRequest -Uri http://localhost:3000/users/1 -Method DELETE
```

## 📚 Documentação

### Arquivos de Documentação
- **DOCUMENTATION.md** - Guia técnico completo
- **TESTING_GUIDE.md** - Casos de teste detalhados
- **ENHANCEMENT_SUMMARY.md** - Melhorias implementadas

### Principais Tópicos
- Arquitetura da aplicação
- Fluxo de dados (State Management)
- Padrões de componentes
- Tratamento de erros
- Validação de formulários
- UX/Feedback ao usuário

## 🎨 Features Implementadas

### ✅ CRUD Completo
- Create: Formulários com validação
- Read: Listas com contador e atualização em tempo real
- Update: Modo edição com pre-população de campos
- Delete: Com confirmação de segurança

### ✅ State Management
- Pinia store para usuários
- Pinia store para máquinas
- Gerenciamento de loading states
- Mensagens de erro clara
- Mensagens de sucesso com auto-clear

### ✅ UX/UI
- ⏳ Indicadores de carregamento
- ✅ Mensagens de sucesso com emojis
- ❌ Mensagens de erro com emojis
- 🔄 Auto-scroll para formulário ao editar
- 📱 Design responsivo (mobile-first)
- 🎨 Gradiente purple tema

### ✅ Código de Qualidade
- Sem erros de console
- Proper error boundaries
- Validação lado-cliente
- Logging com emojis
- Estrutura clara e organizada

## 🐛 Limitações Conhecidas

1. **Dados em Memória**: Perdidos ao reiniciar servidor
2. **Sem Autenticação**: Ninguém pode fazer login
3. **Sem Validação Backend**: Apenas validação cliente
4. **Sem Paginação**: Todos os items carregados
5. **Sem Banco de Dados Real**: Apenas para demo

## 🔜 Próximas Melhorias

### Alta Prioridade
- [ ] Banco de dados real (MongoDB/PostgreSQL)
- [ ] Autenticação/Login
- [ ] Validação backend
- [ ] Input sanitization

### Média Prioridade
- [ ] Busca/Filtro
- [ ] Paginação
- [ ] Toast notifications
- [ ] Ordenação

### Baixa Prioridade
- [ ] Dark mode
- [ ] Export CSV
- [ ] Bulk operations
- [ ] Activity log

## 🔧 Troubleshooting

### Porta 3000 em uso
```powershell
Get-Process node | Stop-Process -Force
```

### Frontend não conecta ao backend
1. Verificar se backend está rodando: `http://localhost:3000`
2. Check console (F12) para CORS errors
3. Restart frontend: `npm run dev`

### Formulário não reseta
1. Check browser console (F12)
2. Verify store actions são chamadas
3. Refresh página: Ctrl+F5

### Dados perdidos após restart
Este é comportamento esperado! Dados estão em memória.

## 📞 Suporte

Para problemas:
1. Abrir DevTools (F12)
2. Verificar console para erros
3. Verificar Network tab para requisições
4. Consultar TESTING_GUIDE.md

## 📝 Notas Importantes

- ⚠️ **NÃO use em produção** - apenas desenvolvimento
- 💾 **Dados em memória** - reinicar servidor = reset de dados
- 🔓 **Sem autenticação** - qualquer um pode acessar
- ✅ **Perfeito para aprender** Vue 3 + Pinia + Node.js

## 🎓 O que você aprenderá

- Vue 3 Composition API com `<script setup>`
- State management com Pinia
- HTTP Client com Axios
- Node.js HTTP server nativo
- RESTful API design
- CRUD operations
- Form handling e validação
- Error handling
- UX/UI patterns

## 📄 Licença

Projeto aberto para fins educacionais.

---

**Status**: ✅ Pronto para desenvolvimento
**Última atualização**: 2024
**Manutenção**: Ativa
