const router = require('express').Router();
const controller = require('./controllers/controls');
const path = require('path');
const auth = require('./middleware/auth');


router.get('/*', auth.checkValidSession, (req, res) => {
  console.log(req.url);
  res.sendFile((path.join(__dirname, '../public/index.html')));
});


router.post('/register', controller.registerUser);

router.post('/login', controller.attemptLogin);

router.post('/logout', controller.logoutUser);


module.exports = router;