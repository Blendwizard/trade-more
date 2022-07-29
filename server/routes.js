const router = require('express').Router();
const controller = require('./controllers/controls');
const path = require('path');

router.get('/*', (req, res) => {
  res.sendFile((path.join(__dirname, '../public/index.html')));
})

router.post('/register', controller.registerUser)

router.post('/login', controller.attemptLogin)


module.exports = router;