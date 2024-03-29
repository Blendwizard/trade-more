const router = require('express').Router();
const controller = require('./controllers/controls');
const path = require('path');
const auth = require('./middleware/auth');

const resolvePaths = (req, res) => {
  res.sendFile((path.join(__dirname, '../public/index.html')));
};

router.post('/addFunds', controller.addFunds)

router.post('/stock', controller.getStockInfo);

router.post('/trade', controller.attemptSale)

router.post('/register', controller.registerUser);

router.post('/login', controller.attemptLogin);

router.post('/logout', controller.logoutUser);

router.get('/auth', controller.checkSession)

router.get('/userDash', controller.fetchUserDashboard)

router.get('/*', resolvePaths);


module.exports = router;