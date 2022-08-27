const models = require('../models');
const helpers = require('./controller_helpers');


module.exports = {

  registerUser: (req, res) => {
    ({ username, password } = req.body);
    models.database.insertNewUser({ user: username, pass: password })
      .then((success) => res.redirect('/login'))
      .catch((err) => res.send("Failed"))
  },

  attemptLogin: (req, res) => {
    ({ username, password } = req.body);
    models.database.validateCredentials({ user: username, pass: password })
      .then((data) => {
        if (helpers.validate(data)) {
          const { session, options } = helpers.generateSessionID(username);
          models.database.createSession(session, username)
            .then(() => {
              console.log('Setting new cookie');
              res.cookie('auth', session, options);
              res.cookie('username', username, options);
              console.log('...redirecting to dashboard...');
              res.redirect('/dashboard');
            })
        } else {
          res.redirect(401, '/login');
        }
      })
      .catch((err) => res.send(err));
  },

  logoutUser: (req, res) => {
    const start = req.headers.cookie.indexOf('auth=') + 5;
    let end = req.headers.cookie.indexOf(';');
    end = end > start ? end : end + 100;
    const sessionID = req.headers.cookie.slice(start, end);
    models.database.clearSession(sessionID)
      .then((success) => {
        // Destroy cookies
        res.cookie('auth', '', { maxAge: 1 });
        res.cookie('username', '', { maxAge: 1 });
        res.redirect('/');
      })
      .catch((err) => res.send(err))
  },


  checkSession: async (req, res) => {
    console.log('Request headers: ', req.headers.cookie);
    const start = req.headers.cookie.indexOf('auth=') + 5;
    let end = req.headers.cookie.indexOf(';');
    end = end > start ? end : end + 100;

    const sessionID = req.headers.cookie.slice(start, end);
    console.log('Checking session ID: ', sessionID);
    let isValidSession = null;
    await models.database.lookupSession(sessionID)
      .then((result) => {
        if (result.rowCount < 1) {
          isValidSession = false;
        } else {
          isValidSession = true;
        }
      });
    return isValidSession;
  },

  fetchUserDashboard: (req, res) => {
    const start = req.headers.cookie.indexOf('username=') + 9;
    let end = req.headers.cookie.indexOf(';');
    end = end > start ? end : end + 100;
    const username = req.headers.cookie.slice(start, end);
    console.log('username: ', username);
    models.database.fetchUserDashboardData(username)
      .then((data) => {
        console.log('data sent for dashboard: ', data);
        res.status(200).send(data);
      })
  },

  getStockInfo: (req, res) => {
    models.database.getStockData(req.body.stock)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => res.status(400).json(err))
  },

  attemptSale: async (req, res) => {
    const start = req.headers.cookie.indexOf('username=') + 9;
    let end = req.headers.cookie.indexOf(';');
    end = end > start ? end : end + 100;
    const username = req.headers.cookie.slice(start, end);
    const order = req.body;

    try {
      const result = await models.database.processOrder(order, username);
      res.status(200).send(result);
    } catch (err) {
      console.log('Sale error: ', err);
      res.status(400).json(err);
    }


  }

}