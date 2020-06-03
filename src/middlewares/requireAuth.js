const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const config = require('../config/keys')
const secretKey = config.secretKey; //Keys from keys.js

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }
  // If the authorized user is logged in decoded payload with the user is returned.
  //Bearer is just randomly assumed. eg {key: Authorization , Value: Bearer `token`
  const token = authorization.replace('Bearer ', ''); // this token is used to verify the user.
  // Trying to verify the secretKey and token.
  jwt.verify(token, secretKey, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }
    // Destructuring -> getting userId from jwt if the secret key is correct.
    const { userId } = payload;

    const user = await User.findById(userId); //finding the userID in the mongoDB instance.
    req.user = user;
    next();
  });
};
