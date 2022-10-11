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

  logoutUser: async (req, res) => {
    const sessionID = helpers.parseCookie(req.headers.cookie, 'id');
    if (sessionID !== false) {
      try {
        await models.database.clearSession(sessionID);
        // Destroy cookies
        res.cookie('auth', '', { maxAge: 1 });
        res.cookie('username', '', { maxAge: 1 });
        res.sendStatus(200);
      } catch (e) {
        console.log('Failed to log user out');
        res.sendStatus(400);
      }
    } else {
      res.sendStatus(200);
    }
  },


  checkSession: async (req, res) => {
    const sessionID = helpers.parseCookie(req.headers.cookie, 'id');
    console.log('Checking session ID: ', sessionID);
    if (sessionID) {
      try {
        const result = await models.database.lookupSession(sessionID);
         if (result.rowCount >= 1) {
          res.sendStatus(200);
         } else {
          console.log('Could not locate session from ID');
          res.sendStatus(403);
         }
      } catch (e) {
        console.log('Error in session check controls');
      }
    } else {
      res.sendStatus(403);
    }
  },

  fetchUserDashboard: async (req, res) => {
    const username = await helpers.parseCookie(req.headers.cookie, 'username');
    try {
      const data = await models.database.fetchUserDashboardData(username);
      console.log('Sending data to dashboard');
      res.status(200).send(data);
    } catch (e) {
      console.log('Failed to send data to client');
      res.sendStatus(400);
    }
  },

  getStockInfo: async (req, res) => {
    try {
      const data = await models.database.getStockData(req.body.stock);
      res.status(200).send(data);
    } catch (e) {
      console.log('Failed to fetch stock data');
      res.status(400).json(e);
    }
  },

  attemptSale: async (req, res) => {
    const username = helpers.parseCookie(req.headers.cookie, 'username');
    const order = req.body;
    try {
      const result = await models.database.processOrder(order, username);
      res.status(200).send(result);
    } catch (e) {
      console.log('Sale error: ', e);
      res.status(400).json(e);
    }
  },

  addFunds: async (req, res) => {
    const { amount } = req.body;
    const username = helpers.parseCookie(req.headers.cookie, 'username');
    try {
      const result = await models.database.addFunds(amount, username);
      res.sendStatus(200);
    } catch (e) {
      res.status(400).json(e);
    }
  }

}