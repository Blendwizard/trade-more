module.exports = {

  validate: (data) => {
    if (data.rows.length < 1 || data.rows[0]["Password"] !== password) {
      // Incorrect user or password
      console.log('Incorrect username or password')
      return false;
    } else {
      // Validated user and password
      console.log("...Login credentials have been validated...");
      return true;
    }
  },

  generateSessionID: (username) => {
    const session = [];
    for (let i = 0; i < 5; i++) {
      session.push(Math.floor(Math.random() * 9));
    }

    const options = {
      maxAge: 300000
    }
    return { session: session.join(''), options: options };
  },

  parseCookie: (cookie, key) => {
    if (cookie === undefined) {
      return false;
    }

    if (key === 'id') {
      const start = cookie.indexOf('auth=') + 5;
      let end = cookie.indexOf(';');
      end = end > start ? end : end + 100;
      return cookie.slice(start, end);
    } else if (key === 'username') {
      const start = cookie.indexOf('username=') + 9;
      let end = cookie.indexOf(';');
      end = end > start ? end : end + 100;
      return cookie.slice(start, end);
    } else {
      return 'Error in cookie parser...';
    }
  }
}