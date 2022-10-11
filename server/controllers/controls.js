const models = require('../models');
const helpers = require('./controller_helpers');


module.exports = {

  registerUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      await models.database.insertNewUser({ user: username, pass: password });
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(400);
    }
  },

  attemptLogin: async (req, res) => {
    const { username, password } = req.body;
    try {
      const data = await models.database.validateCredentials({ user: username, pass: password });
      const validated = await helpers.validate(data, password);
      if (validated) {
        const { session, options } = helpers.generateSessionID(username);
        await models.database.createSession(session, username);
        res.cookie('auth', session, options);
        res.cookie('username', username, options);
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }

    } catch (e) {
      console.log('Error attempting to login');
      res.sendStatus(403);
    }
  },

  logoutUser: (req, res) => {
    const sessionID = helpers.parseCookie(req.headers.cookie, 'id');
    if (sessionID !== false) {
      models.database.clearSession(sessionID)
        .then((success) => {
          // Destroy cookies
          res.cookie('auth', '', { maxAge: 1 });
          res.cookie('username', '', { maxAge: 1 });
          res.redirect('/');
        })
        .catch((err) => res.send(err))
    } else {
      res.redirect('/');
    }
  },


  checkSession: async (req, res) => {
    const sessionID = helpers.parseCookie(req.headers.cookie, 'id');
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
    const username = helpers.parseCookie(req.headers.cookie, 'username')
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
      .catch((err) => res.status(400).json(err));
  },

  attemptSale: async (req, res) => {
    const username = helpers.parseCookie(req.headers.cookie, 'username');
    const order = req.body;

    try {
      const result = await models.database.processOrder(order, username);
      res.status(200).send(result);
    } catch (err) {
      console.log('Sale error: ', err);
      res.status(400).json(err);
    }
  },

  addFunds: async (req, res) => {
    const { amount } = req.body;
    const username = helpers.parseCookie(req.headers.cookie, 'username');
    try {
      const result = await models.database.addFunds(amount, username);
      res.status(200).send('success');
    } catch {
      res.status(400).send('error');
    }
  }

}