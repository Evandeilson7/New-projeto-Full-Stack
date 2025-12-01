# 🚀 Testing Guide - Full Stack Application

## Prerequisites
- Node.js v14+ installed
- Backend running on `http://localhost:3000`
- Frontend running on `http://localhost:5174`

## Starting the Application

### Terminal 1 - Backend
```powershell
cd c:\Users\User\Documents\GitHub\New-projeto-Full-Stack\New-projeto-Full-Stack\backend
node api.js
```
Expected output:
```
📋 Servidor ouvindo na porta 3000
```

### Terminal 2 - Frontend
```powershell
cd c:\Users\User\Documents\GitHub\New-projeto-Full-Stack\New-projeto-Full-Stack\frontend
npm run dev
```
Expected output:
```
VITE v... running at:
  ➜  Local:   http://localhost:5174/
```

## Feature Test Cases

### 1. Create User
**Steps:**
1. Navigate to "👥 Usuários" tab
2. Fill form:
   - Nome: "João Silva"
   - Email: "joao@example.com"
   - Função: "Usuário"
3. Click "+ Adicionar Usuário"

**Expected:**
- ✅ Success message appears: "✅ Usuário criado com sucesso!"
- ✅ User appears at top of list
- ✅ Form resets automatically
- ✅ Message disappears after 3 seconds

### 2. Create Machine
**Steps:**
1. Navigate to "⚙️ Máquinas" tab
2. Fill form:
   - Nome: "Prensa Hidráulica A"
   - Tipo: "Industrial"
   - Status: "Ativa"
3. Click "+ Adicionar máquina"

**Expected:**
- ✅ Machine appears in list
- ✅ Success message shows
- ✅ Counter updates to "1 máquinas"

### 3. Edit User
**Steps:**
1. In Users list, click any user's "✏️" button
2. Form title changes to "✏️ Editar Usuário"
3. All fields are pre-populated
4. Change name to "João Silva Atualizado"
5. Click "✓ Salvar Alterações"

**Expected:**
- ✅ Form scrolls to top automatically
- ✅ Submit button shows "✓ Salvar Alterações"
- ✅ Cancel button appears
- ✅ After save: "✅ Usuário atualizado com sucesso!"
- ✅ List updates with new name
- ✅ Edit mode clears

### 4. Edit Machine
**Steps:**
1. In Machines list, click any machine's "✏️" button
2. Change status to "Parada" 
3. Click "✓ Salvar alterações"

**Expected:**
- ✅ Machine status updates in list
- ✅ Success message appears
- ✅ Form resets

### 5. Cancel Edit
**Steps:**
1. Click edit on any item
2. Make a change
3. Click "✕ Cancelar"

**Expected:**
- ✅ Edit mode clears
- ✅ Form resets
- ✅ Button returns to "+ Adicionar..."
- ✅ No API call is made

### 6. Delete User
**Steps:**
1. In Users list, click "🗑️" button on any user
2. Confirmation dialog appears: "Tem certeza que deseja deletar este usuário?"
3. Click "OK"

**Expected:**
- ✅ User removed from list
- ✅ Success message: "✅ Usuário removido com sucesso!"
- ✅ Counter updates

### 7. Delete Machine
**Steps:**
1. Click "🗑️" on any machine
2. Confirm deletion

**Expected:**
- ✅ Machine removed
- ✅ Counter updates

### 8. Form Validation
**Steps:**
1. Try submitting empty form
2. Try submitting with invalid email

**Expected:**
- ✅ Browser prevents submission (required attributes)
- ✅ Red outline on invalid fields
- ✅ Email field rejects non-email format

### 9. Error Handling
**Steps:**
1. Stop backend server (Ctrl+C in backend terminal)
2. Try to create/edit/delete item in frontend
3. Check console

**Expected:**
- ✅ Error message displays in UI with ❌
- ✅ Browser console shows error details
- ✅ "Salvando..." button returns to normal
- ✅ Form remains filled (can retry)

## API Testing (Optional)

### Test User Creation
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/users" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"name":"Test User","email":"test@example.com","role":"user"}'
```

### Test User List
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/users" -Method GET
```

### Test User Update
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/users/1" `
  -Method PUT `
  -ContentType "application/json" `
  -Body '{"name":"Updated Name"}'
```

### Test User Delete
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/users/1" -Method DELETE
```

## Browser Developer Tools Testing

### Network Tab
1. Open DevTools (F12 or Ctrl+Shift+I)
2. Go to Network tab
3. Perform create/edit/delete operation
4. Check:
   - ✅ Request URL: `http://localhost:3000/endpoint`
   - ✅ Method: POST/PUT/DELETE/GET
   - ✅ Status: 200, 201, or 204
   - ✅ Response body contains correct data

### Console Tab
1. Go to Console tab
2. Should see messages like:
   - ✅ "Usuários carregados: Array(n)"
   - ✅ "Usuário criado com sucesso: {...}"
   - ✅ "Usuário atualizado com sucesso: {...}"
3. Should NOT see any red error messages (unless intentional)

## Expected Data Structure

### User Object
```json
{
  "_id": 1,
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "user"
}
```

### Machine Object
```json
{
  "_id": 1,
  "nome": "Prensa Hidráulica",
  "tipo": "Industrial",
  "status": "ativa"
}
```

## Troubleshooting

### Port Already in Use
```powershell
# Kill process on port 3000
Get-Process | Where-Object {$_.Name -eq "node"} | Stop-Process -Force

# Or specify different port
$env:PORT=3001; node api.js
```

### Frontend Not Updating
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Check console for errors (F12)

### API Not Responding
1. Check backend terminal for errors
2. Verify port is 3000
3. Check CORS is enabled (should see Access-Control-Allow headers)

### Form Not Resetting After Submit
1. Check console for errors
2. Verify store action is being called
3. Check if edit mode is being cleared properly

## Performance Notes
- Data persists in memory while server is running
- Restarting server clears all data
- No pagination implemented (all items loaded at once)
- Suitable for demo/development with < 1000 items

## Feature Completeness Matrix

| Feature | Users | Machines |
|---------|-------|----------|
| Create | ✅ | ✅ |
| Read (List) | ✅ | ✅ |
| Update (Edit) | ✅ | ✅ |
| Delete | ✅ | ✅ |
| Form Validation | ✅ | ✅ |
| Error Handling | ✅ | ✅ |
| Success Messages | ✅ | ✅ |
| Loading States | ✅ | ✅ |
| Confirmation Dialogs | ✅ | ✅ |
| Auto-Reset Form | ✅ | ✅ |
| Mobile Responsive | ✅ | ✅ |

## Next Steps After Testing
- [ ] All tests pass
- [ ] No console errors
- [ ] No API errors
- [ ] Consider adding:
  - [ ] Toast notifications
  - [ ] Search/filter
  - [ ] Pagination
  - [ ] Data export
  - [ ] Real database (MongoDB)
  - [ ] Authentication/Authorization
