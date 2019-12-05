const db = require('../db/users-access');
const bcrypt = require("bcryptjs");
module.exports = function restricted(req,res,next) {
    const { username, password } = req.headers;

    db.getUserByUsername(username)
    .then(user => {
      // check that passwords match
      console.log(user)
      if (user[0] && bcrypt.compareSync(password, user[0].password)) {
        res.status(200)
        res.send({ message: `Welcome ${user[0].username}!` });
      } else {    
        res.status(401)
        res.send({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500)
      res.send(error);
    });
}