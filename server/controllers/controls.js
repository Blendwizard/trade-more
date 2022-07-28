const models = require('../models');

module.exports = {
  registerUser: (req, res) => {
    ({ username, password } = req.body);

    models.database.insertNewUser({user: username, pass: password})
    .then(res.redirect('/'))

  },

  attemptLogin: (req, res) => {
    ({username, password} = req.body);
    models.database.validateCredentials({user: username, pass: password})
    .then((data) => {
      if (data.rows.length < 1) {
        // Incorrect user or password
        console.log('Incorrect username or password')
        res.redirect('/login');
      } else {
        // Validated user and password
        res.redirect('/');
        console.log("Successfully logged user in");
      }

    })
    .catch((err) => res.send(err));
  },

}