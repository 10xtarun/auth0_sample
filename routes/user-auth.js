const userAuthRouter = require('express').Router();
const passport = require('passport');
const querystring = require('querystring');

userAuthRouter.get('/login', passport.authenticate('auth0', { scope: 'openid email profile' }), (req, res) => res.status(200).json({ message: 'login successful' }));

userAuthRouter.get('/logout', (req, res) => {
  req.logOut();

  let returnTo = `${req.protocol}://${req.hostname}`;
  const port = req.connection.localPort;

  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo = `${returnTo}:${port}/`;
  }
  const logoutUrl = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);

  const searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo,
  });
  logoutUrl.search = searchString;

  return res.redirect(logoutUrl);
});

userAuthRouter.get('/callback', (req, res, next) => {
  passport.authenticate('auth0', (err, user, info) => {
    console.log('--- info --- ', info);
    if (err) return next(err);
    if (!user) return res.redirect('/login');

    return req.logIn(user, (error) => {
      if (error) return next(error);
      const { returnTo } = req.session;
      delete req.session.returnTo;
      return res.redirect(returnTo || '/');
    });
  })(req, res, next);
});

module.exports = userAuthRouter;
