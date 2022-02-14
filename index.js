const express = require('express');
// env setup
require('dotenv').config();

// other imports
const expressSession = require('express-session');
const passport = require('passport');
const { strategy } = require('./config/auth-config');
const userAuthRouter = require('./routes/user-auth');

// app setup
const app = express();
const PORT = process.env.PORT || 3000;

// session setup
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false,
}));

// passport setup
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// authentication middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// attach routes
app.get('/', (req, res) => res.status(200).json({
  message: 'Hello World!',
}));
app.use('/', userAuthRouter);

// routes definition
// eslint-disable-next-line consistent-return
const secured = (req, res, next) => {
  if (req && req.user) return next();
  req.session.returnTo = req.originalUrl;
  res.redirect('/login');
};

app.get('/user', secured, (req, res) => res.status(200).json({ ...req.user }));

app.listen(PORT, () => {
  console.log('Server running on port - ', PORT);
});
