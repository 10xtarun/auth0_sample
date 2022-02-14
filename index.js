const express = require('express');
// env setup
require('dotenv').config();

// other imports
const expressSession = require('express-session');
const passport = require('passport');
const { strategy } = require('./config/auth-config');

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

app.get('/', (req, res) => res.status(200).json({
  message: 'Hello World!',
}));

app.listen(PORT, () => {
  console.log('Server running on port - ', PORT);
});
