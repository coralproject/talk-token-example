const config = require('./config');
const jwt = require('jsonwebtoken');

const token = jwt.sign({}, config.get('secret'), {
  subject: config.get('jwt_issue_subject'),
  audience: config.get('jwt_issue_audience'),
  issuer: config.get('jwt_issuer'),
});

console.log(`
Use the following token:

  ${token}

To issue a curl request for a user:

  curl -H 'Authorization: Bearer ${token}' \\
    -H 'Content-Type: application/json' \\
    --data '{"id": "1"}' --silent \\
    http://localhost:3000/
`);
