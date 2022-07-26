const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { nextTick } = require('process');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use(express.static(path.join(__dirname, '../public')));



app.post('/register', (req, res) => {
  console.log("username:", req.body.username, "password:", req.body.password);
  res.redirect('/')
})




app.post('/login', (req, res) => {
  // To do: implement login functionality
  console.log('attempting to login')
  if (req.body.username === 'bobtheflyinghorse' && req.body.password === 'password') {
    res.redirect('/home')
  } else {
    res.redirect('/')
  }
});

app.get('/home', (req, res) => {
  res.cookie('testCookie', 'testValue', {
    maxAge: 300000
  })
  res.send('Logged into homepage successfully')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});