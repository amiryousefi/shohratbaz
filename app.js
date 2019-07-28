const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const passport = require('passport');
const dotenv = require('dotenv');


// loading env config
dotenv.config();

// Set up mongoose connection
const mongoose = require('mongoose');

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// define routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const privacyRouter = require('./routes/privacy');
const facebookRouter = require('./routes/facebook');
const shareableRouter = require('./routes/shareable');
const sharedRouter = require('./routes/shared');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'keyboard cat', key: 'sid', resave: true,saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// set routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/privacy', privacyRouter);
app.use('/facebook', facebookRouter);
app.use('/shareable', shareableRouter);
app.use('/shared', sharedRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
