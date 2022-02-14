const Auth0Strategy = require('passport-auth0');

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL,
  },
  ((accessToken, _refreshToken, _extraParams, profile, done) => {
    console.log('------successfull------', profile);
    return done(null, profile);
  }),
);

module.exports = {
  strategy,
};
