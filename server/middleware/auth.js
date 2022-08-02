const models = require('../models');

module.exports = {

  checkValidSession: (req, res, next) => {
    console.log('Checking for valid session ID')
    let direction = '';
    let status = 403;
    if (req.url === '/dashboard') {
      if (req.headers.cookie) {
        const sessionID = req.headers.cookie.slice(5);
        models.database.lookupSession(sessionID)
        .then((result) => {
          if (result.rowCount < 1) {
            // User not logged in or session expired
            console.log('User is not logged in');
            direction = '/login';
          } else {
            console.log('User logged in');
            direction = '/dashboard';
            status = 200;
          }
        })
      } else {
        console.log('No session, please log in');
        direction = '/login';
      }
    }
    if (direction.length > 0) return res.redirect(status, direction);
    next();
  }


}