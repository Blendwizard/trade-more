const router = require('express').Router();
const controller = require('./controllers/controls');

router.post('/register', controller.registerUser)

router.post('/login', controller.attemptLogin)


module.exports = router;