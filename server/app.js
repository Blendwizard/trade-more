const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use(express.static(path.join(__dirname, '../public')));

app.post('/login', (req, res) => {
  // To do: implement login functionality
  console.log('attempting to login')
  if (req.body.username === 'bob' && req.body.password === '*****') {
    res.redirect('/home')
  } else {
    res.redirect('/')
  }
});

app.get('/home', (req, res) => {
  res.send('Logged into homepage successfully')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});