// Parse a .env file.
require('dotenv').config();

const convict = require('convict');

const config = convict({
  port: {
    env: 'PORT',
    default: 3000,
    format: 'port',
    doc: 'the port to bind to',
  },
  secret: {
    env: 'SECRET',
    default: 'secret',
    format: '*',
    doc: 'the secret used to sign the jwt tokens',
  },
  jwt_audience: {
    env: 'JWT_AUDIENCE',
    default: 'talk',
    format: '*',
    doc: 'the JWT audience used to sign the token',
  },
  jwt_issue_subject: {
    env: 'JWT_ISSUE_SUBJECT',
    default: 'TALK_TOKEN_EXAMPLE',
    format: '*',
    doc: 'the JWT subject used for issuing tokens',
  },
  jwt_issue_audience: {
    env: 'JWT_ISSUE_AUDIENCE',
    default: 'TALK_TOKEN_EXAMPLE_AUDIENCE',
    format: '*',
    doc: 'the JWT audience used for issuing tokens',
  },
  jwt_issuer: {
    env: 'JWT_ISSUER',
    default: 'http://localhost:3000',
    format: '*',
    doc: 'the JWT issuer used to sign the token',
  },
  jwt_expiry: {
    env: 'JWT_EXPIRY',
    default: '6 hours',
    format: 'duration',
    doc: 'the JWT expiry duration used to sign the token',
  },
});

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
