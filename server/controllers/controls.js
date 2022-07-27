const models = require('../models');

module.exports = {
  registerUser: (req, res) => {
    ({ username, password } = req.body);
    models.database.insertNewUser({user: username, pass: password});
    res.redirect('/')
  }

}