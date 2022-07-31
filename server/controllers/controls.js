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
        if (!req.headers.cookie) {
          console.log('Setting new cookie');
          res.cookie('testCookie', 'testValue', {
            maxAge: 300000
          })
        }
        res.redirect('/');
      } else {
        res.redirect(401, '/login');
      }
    })
    .catch((err) => res.send(err));
  },

}