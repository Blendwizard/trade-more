const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send("hello you");
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});