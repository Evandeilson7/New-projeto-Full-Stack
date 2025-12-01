const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

let users = [];
let userId = 1;

app.get('/users', (req, res) => res.json(users));
app.post('/users', (req, res) => {
  const user = { _id: userId++, ...req.body, createdAt: new Date() };
  users.push(user);
  res.status(201).json(user);
});

app.listen(PORT, () => console.log(`✅ Rodando porta ${PORT}`));
