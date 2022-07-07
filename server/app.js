const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

app.post('/', (req, res) => {
  console.log('Attempting login');
  res.redirect('/home')
})

app.get('/home', (req, res) => {
  res.send('At homepage')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});