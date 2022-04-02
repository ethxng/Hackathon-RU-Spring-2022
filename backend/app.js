var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('./models/User.js');
const itemRouter = require('./routes/itemRouter');

const mongo_user = 'admin';
const mongo_pass = 'admin';

const mongoDB = 'mongodb+srv://admin:admin@cluster0.4qiw1.mongodb.net/hackru2022-spring-2022?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];
  console.log("bearer: " + bearerHeader);
  if (typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }  else{
    res.sendStatus(403);
  }
}

// set up passport for authentication
app.use(session({secret: "cats", resave: false, saveUninitialized: true}));
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if (err)
                return done(err);
            else if (!user) { // user does not match the database
                return done((null, false, { message: "Incorrect username or username does not exist!" }));
            } else{
                bcrypt.compare(password, user.password, (error, result) => {
                    
                    if (result === true) {
                        // passwords match! log user in
                        return done(null, user);
                    } else {
                        // passwords do not match!
                        return done(null, false, { message: "Incorrect password" })
                    }
                });
            }
        });
    })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
    User.findById(id, (err, result) => {
        done(err, result);
    });
});

/*
// check incoming token, proceed if valid
passport.use('jwt', new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('Bearer'),
  secretOrKey : 'HACKRU2022'
},
  function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    console.log("payload: " + jwtPayload)
    return cb(null, user);
    User.findOneById(jwtPayload.id).exec((err, user) => {
      if (err)
        return cb(err, false);
      else if (user)
        return cb(null, user);
      else
        return cb(null, false);
    });
  }
));*/

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/items', verifyToken, itemRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
