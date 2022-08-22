const models = require('../models');
const controller = require('../controllers/controls');


const restricted = ['/dashboard', '/auth'];


const secureRouteCheck = (req, res, next) => {
  let locked = false;
  let allowedAccess = false;
  // console.log('URL?> ', req.url);
  // If user is trying to GET a protected resource
  if (restricted.includes(req.url)) {
    locked = true;
    // Check if they have a current valid session
    checkValidSession(req, res)
    .then((allowedAccess) => {
      // console.log('Allowed?  ', allowedAccess)
      if (allowedAccess === true) {
        // res.redirect(req.url);
        res.sendStatus(200);
        return;
      } else {
        // res.redirect('/login')
        res.sendStatus(403);
        return;
      }
    })

  }
  if (locked === false) {
    next();
  }
}

const checkValidSession = async (req, res) => {
  let valid = false;
  // If user has a cookie
  if (req.headers.cookie) {
    valid = await controller.checkSession(req, res)
  }
  return valid;
}



module.exports = { secureRouteCheck, checkValidSession };