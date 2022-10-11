const attemptLogin = async (req, res) => {
  ({ username, password }) = req.body;
  console.log(username, password);
  try {
    const data = await models.database.validateCredentials({ user: username, pass: password });
    console.log('...validating user info...');
    const validated = await helpers.validate(data);
    if (validated) {
      const { session, options } = helpers.generateSessionID(username);
      await models.database.createSession(session, username);
      console.log('Setting new cookie');
      res.cookie('auth', session, options);
      res.cookie('username', username, options);
      console.log('...redirecting to dashboard...');
      res.redirect('/dashboard');
    }

  } catch(e) {
    console.log('Error attempting to login:   ', e);
    res.redirect(401, '/login');
  }

  models.database.validateCredentials({ user: username, pass: password })
    .then((data) => {
      if (helpers.validate(data)) {
        const { session, options } = helpers.generateSessionID(username);
        models.database.createSession(session, username)
          .then(() => {
            console.log('Setting new cookie');
            res.cookie('auth', session, options);
            res.cookie('username', username, options);
            console.log('...redirecting to dashboard...');
            res.redirect('/dashboard');
          })
      } else {
        res.redirect(401, '/login');
      }
    })
    .catch((err) => res.send(err));
}
