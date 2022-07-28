const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const router = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});