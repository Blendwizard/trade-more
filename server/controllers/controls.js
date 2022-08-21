const models = require('../models');
const helpers = require('./controller_helpers');

module.exports = {

  registerUser: (req, res) => {
    ({ username, password } = req.body);
    models.database.insertNewUser({user: username, pass: password})
    .then((success) => res.redirect('/login'))
    .catch((err) => res.send("Failed"))
  },

  attemptLogin: (req, res) => {
    ({username, password} = req.body);
    models.database.validateCredentials({user: username, pass: password})
    .then((data) => {
      if (helpers.validate(data)) {
        const {session, options} = helpers.generateSessionID(username);
          models.database.createSession(session, username)
          .then(() => {
            console.log('Setting new cookie');
            res.cookie('auth', session, options);
            res.cookie('username', username, options);
            console.log('...redirecting to dashboard...');
            res.redirect('/dashboard');
            // res.sendStatus(200);
          })
      } else {
        res.redirect(401, '/login');
      }
    })
    .catch((err) => res.send(err));
  },

  logoutUser: (req, res) => {
    const sessionID = req.headers.cookie.slice(5, 10);
    models.database.clearSession(sessionID)
    .then((success) => {
      // Destroy cookies
      res.cookie('auth', '', {maxAge: 1});
      res.cookie('username', '', {maxAge: 1});

      res.redirect('/');
    })
    .catch((err) => res.send(err))
  },


  checkSession: async (req, res) => {
    const sessionID = req.headers.cookie.slice(5, 10);
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

  fetchUserDashboard: async (req, res) => {
    const sessionID = req.headers.cookie.slice(5, 10);
    Promise.all([
      models.database.fetchUserDashboardData(sessionID),
    ])
    .then((data) => {
      console.log('data: ', data);
      res.status(200).send(data);
    })
  }

}