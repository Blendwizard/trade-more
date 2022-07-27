const router = require('express').Router();
const controller = require('./controllers/controls');

router.post('/register', controller.registerUser)


module.exports = router;