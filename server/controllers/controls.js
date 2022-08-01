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
      console.log(helpers.validate(data));
      if (helpers.validate(data)) {
        const {session, options} = helpers.generateSessionID(username);
          models.database.createSession(session, username)
          .then(() => {
            console.log('Setting new cookie');
            res.cookie('auth', session, options);
            res.redirect('/dashboard');
          })
      } else {
        res.redirect(401, '/login');
      }
    })
    .catch((err) => res.send(err));
  },

}