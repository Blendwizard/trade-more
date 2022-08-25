const router = require('express').Router();
const controller = require('./controllers/controls');
const path = require('path');
const auth = require('./middleware/auth');


const resolvePaths = (req, res) => {
  res.sendFile((path.join(__dirname, '../public/index.html')));
}

router.post('/stock', controller.getStockInfo);

router.get('/userDash', controller.fetchUserDashboard)

router.get('/*', auth.secureRouteCheck, resolvePaths);


router.post('/register', controller.registerUser);

router.post('/login', controller.attemptLogin);

router.post('/logout', controller.logoutUser);


module.exports = router;