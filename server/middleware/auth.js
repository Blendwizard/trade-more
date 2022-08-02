const models = require('../models');

module.exports = {

  checkValidSession: (req, res, next) => {
    console.log('Checking for valid session ID')
    let direction = '';
    let status = 403;
    if (req.url === '/dashboard') {
      // Check if a cookie exists on request
      if (req.headers.cookie) {
        const sessionID = req.headers.cookie.slice(5);
        models.database.lookupSession(sessionID)
        .then((result) => {
          if (result.rowCount < 1) {
            // User not logged in or session expired
            console.log('AUTH: User is not currently logged in');
            direction = '/login';
          } else {
            // User is logged in with active session, send to dashboard
            console.log('AUTH: User currently logged in');
            direction = '/dashboard';
            status = 200;
          }
        })
      } else {
        // Cookie not found, send to login
        console.log('No session, please log in');
        direction = '/login';
      }
    }
    // Return redirect to prevent double-setting of headers or continue to controllers
    if (direction.length > 0) return res.redirect(status, direction);
    next();
  }


}