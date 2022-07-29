module.exports = {

  validate: (data) => {
    if (data.rows.length < 1 || data.rows[0]["Password"] !== password) {
      // Incorrect user or password
      console.log('Incorrect username or password')
      return false;
    } else {
        // Validated user and password
        console.log("Successfully logged user in");
        return true;
    }
  }
}