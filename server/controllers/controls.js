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
      if (data.rows.length > 0) {
        const userID = data.rows[0]['User_ID'];
        res.status(200).send({user: userID});
      } else {
        console.log('User not found')
        res.redirect('/');
      }

    })
    .catch((err) => res.send(err));
  },

}