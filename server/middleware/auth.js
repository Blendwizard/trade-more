const models = require('../models');

module.exports = {
  checkValidSession: (req, res, next) => {
    console.log('Checking for valid session ID')
    if (req.headers.cookie) {
      const sessionID = req.headers.cookie.slice(5);
      models.database.lookupSession(sessionID)
      .then((result) => {
        if (result.rowCount < 1) {
          // User not logged in
          console.log('User is not logged in')
        } else {
          console.log('User logged in')
        }
      })
    }
    next();
  }
}