const config = require('./config');
const db = require('./db.json');
const jwt = require('jsonwebtoken');
const middleware = require('express-jwt');
const express = require('express');
const morgan = require('morgan');
const app = express();

// Parse the request json data.
app.use(express.json());

// Add some logging.
app.use(morgan('dev'));

// Endpoint for retrieving the user based on a valid JWT token.
app.get(
  '/',
  middleware({
    secret: config.get('secret'),
    audience: config.get('jwt_audience'),
    issuer: config.get('jwt_issuer'),
  }),
  (req, res) => {
    const { sub } = req.user;

    // Find the user in the database.
    const user = db.find(user => user.id === sub);
    if (!user) {
      return res.status(404).end();
    }

    res.json(user);
  }
);

// Endpoint for exchanging an id for a token.
app.post(
  '/',
  middleware({
    secret: config.get('secret'),
    subject: config.get('jwt_issue_subject'),
    audience: config.get('jwt_issue_audience'),
    issuer: config.get('jwt_issuer'),
  }),
  (req, res) => {
    const { id } = req.body;

    // Find the user in the database.
    const user = db.find(user => user.id === id);
    if (!user) {
      return res.status(401).end();
    }

    // Create a token, sign it with our secret, and send it back to the user.
    try {
      const token = jwt.sign({}, config.get('secret'), {
        audience: config.get('jwt_audience'),
        issuer: config.get('jwt_issuer'),
        expiresIn: config.get('jwt_expiry'),
        subject: user.id,
      });

      res.status(201).json({ token });
    } catch (err) {
      return res.status(500);
    }
  }
);

// Handle errors with a status code.
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send('Not Authorized');
  }

  console.error(err);
  return res.status(500).send('Internal Error');
});

app.listen(config.get('port'), () => {
  console.log(`Now listening on port ${config.get('port')}`);
});
