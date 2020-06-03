require('./models/User');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');
const config = require('./config/keys');

const mongoUri= config.mongouri;
const app = express();

app.use(bodyParser.json());
app.use(authRoutes); // Examples of routes checked by the app for auth are /signin and /signup

if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you have supplied the correct uri to Mongo DB!`
  );
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});
//if successful connection is made to mongoDB instance
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
//If there is an error connecting to mongo.
mongoose.connection.on('error', err => {
  console.error('Error connecting to mongo', err);
});
//Middleware of requireAuth which verifies the request and the user. If the header contains correct Authorization
app.get('/', requireAuth, (req, res) => {
  //if successfull gets the email.
  res.send(`Your email: ${req.user.email}`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Listening on port '+ PORT);
});