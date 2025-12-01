# ⚡ Quick Reference Guide

## 🎯 2-Minute Setup

### Terminal 1 (Backend)
```powershell
cd backend
node api.js
```
Wait for: `📋 Servidor ouvindo na porta 3000`

### Terminal 2 (Frontend)
```powershell
cd frontend
npm run dev
```
Open: `http://localhost:5174`

---

## 🎮 Quick Commands

### Test API
```powershell
# List all users
curl http://localhost:3000/users

# Create user
curl -X POST http://localhost:3000/users `
  -H "Content-Type: application/json" `
  -d '{"name":"Test","email":"test@test.com","role":"user"}'
```

### View Data
```powershell
# Open Network tab (F12) and perform action
# Check console (F12) for logs
# Check Network requests in DevTools
```

---

## 🔧 Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `Get-Process node \| Stop-Process -Force` |
| Frontend not connecting | Check backend is running on 3000 |
| Data lost | Expected - it's in-memory only |
| Form not updating | F12 → Console → check errors |
| No success message | Refresh (Ctrl+F5), check store |

---

## 📍 Key Files to Know

| File | Purpose |
|------|---------|
| `backend/api.js` | HTTP server with CRUD routes |
| `frontend/src/views/Users.vue` | User management page |
| `frontend/src/views/Maquinas.vue` | Machine management page |
| `frontend/src/stores/user.js` | Pinia store for users |
| `frontend/src/stores/maquina.js` | Pinia store for machines |
| `frontend/src/services/api.js` | Axios HTTP client |

---

## ✨ Features at a Glance

### Users (👥)
- ✅ Create, Read, Edit, Delete
- ✅ Email validation
- ✅ Role selector (User/Admin)
- ✅ Confirmation before delete
- ✅ Success/error feedback

### Machines (⚙️)
- ✅ Create, Read, Edit, Delete
- ✅ Type and status tracking
- ✅ Status options (Active/Stopped/Maintenance)
- ✅ Confirmation before delete
- ✅ Real-time list updates

---

## 🎨 UI Components

### Views (Pages)
- `Home.vue` - Welcome page
- `Users.vue` - User CRUD interface
- `Maquinas.vue` - Machine CRUD interface

### Components
- `UserForm.vue` - User create/edit form
- `UserList.vue` - User table display
- `MaquinaForm.vue` - Machine create/edit form
- `MaquinaList.vue` - Machine table display

---

## 🔄 Edit Mode Flow

```
Click Edit Button
    ↓
Form Title Changes to "✏️ Editar..."
    ↓
Form Fields Pre-populate with Current Data
    ↓
Submit Button Text Changes to "✓ Salvar Alterações"
    ↓
Cancel Button Appears
    ↓
Make Changes & Click Save
    ↓
API PUT Request Sent
    ↓
Success Message Appears
    ↓
Edit Mode Clears, Form Resets
    ↓
List Updates with New Data
```

---

## 📱 Responsive Breakpoints

- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (flexible)
- Desktop: > 1024px (optimized layout)

All components stack nicely on mobile!

---

## 🧠 What Each Store Does

### user.js (Pinia Store)
```javascript
State:
- users: User[]
- loading: boolean
- error: string | null
- successMessage: string | null

Actions:
- fetchUsers() → GET /users
- addUser(user) → POST /users
- updateUser(id, user) → PUT /users/:id
- removeUser(id) → DELETE /users/:id
```

### maquina.js (Pinia Store)
```javascript
State:
- maquinas: Machine[]
- loading: boolean
- error: string | null
- successMessage: string | null

Actions:
- fetchMaquinas() → GET /maquinas
- addMaquina(maquina) → POST /maquinas
- updateMaquina(id, maquina) → PUT /maquinas/:id
- removeMaquina(id) → DELETE /maquinas/:id
```

---

## 🌐 API Response Format

### Success (201 Created)
```json
{
  "_id": 1,
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "user"
}
```

### Error (400 Bad Request)
```json
{
  "error": "Email is required"
}
```

### List (200 OK)
```json
[
  { "_id": 1, "name": "João", "email": "joao@test.com", "role": "user" },
  { "_id": 2, "name": "Maria", "email": "maria@test.com", "role": "admin" }
]
```

---

## 💡 Pro Tips

1. **Console Debugging**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for emoji-prefixed messages: ✅ ❌ ⏳ 📋

2. **Network Debugging**
   - Open DevTools (F12)
   - Go to Network tab
   - Perform an action
   - Check request/response

3. **State Inspection**
   - Install Vue DevTools extension
   - Click Vue icon in DevTools
   - Browse Pinia store in real-time

4. **Testing Edit Mode**
   - Create an item first
   - Click its edit button
   - Form should populate
   - Cancel to reset (no API call)

5. **Error Handling**
   - Stop backend (Ctrl+C)
   - Try to create/edit/delete
   - Should show clear error in UI
   - Resume backend to recover

---

## 📚 Documentation Files

| File | Read When |
|------|-----------|
| `README_NEW.md` | You want quick overview |
| `DOCUMENTATION.md` | You want deep technical details |
| `TESTING_GUIDE.md` | You want to test systematically |
| `COMPLETION_SUMMARY.md` | You want to know what was done |
| This file | You need quick reference |

---

## ⚙️ Configuration

### Backend (api.js)
```javascript
PORT = 3000
CORS = * (all origins allowed)
Storage = In-memory arrays
ID Counter = Incremental from 1
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
PORT=5174
```

### Dependencies
```json
Backend: Node.js only (http module)
Frontend: Vue 3, Pinia, Axios, Tailwind
```

---

## 🎯 Next Steps

1. **Run the app** - Start backend & frontend
2. **Test CRUD** - Create, edit, delete items
3. **Read docs** - Understand architecture
4. **Modify code** - Add your own features
5. **Deploy** - Use real database

---

## 📞 Quick Help

**Backend not starting?**
→ Check port 3000 is free: `Get-Process node | Stop-Process`

**Frontend showing blank?**
→ Hard refresh: `Ctrl+Shift+Delete` then `Ctrl+F5`

**API not working?**
→ Check Console (F12) for errors, verify backend is running

**Form not submitting?**
→ Check browser console for validation errors

**Data disappeared?**
→ Server restarted? Data is in-memory only

---

## 🎓 Learning Path

1. **Day 1**: Understand CRUD operations
2. **Day 2**: Learn Vue 3 Composition API
3. **Day 3**: Master Pinia state management
4. **Day 4**: Explore HTTP/REST concepts
5. **Day 5**: Add new features (search, filter, etc)

---

## ✅ You're All Set!

Everything is ready to use. Have fun coding! 🚀

Questions? Check the DOCUMENTATION.md file.

Need to test? Check the TESTING_GUIDE.md file.

Want to know what changed? Check COMPLETION_SUMMARY.md file.
