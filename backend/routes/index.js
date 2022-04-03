var express = require('express');
var router = express.Router();
const {body, validationResult} = require('express-validator');
const fs = require('fs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated())
    console.log("you are logged in");
  res.redirect('/items');
});

router.get('/log-in', (req, res, next) => {
  if (req.isAuthenticated())
    res.redirect('/');
  else
    res.send('you will log in here')
});

/*
router.post("/log-in", passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/'
}));*/

router.post('/log-in', (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
          message: 'Something is not right',
          user : user
      });
    }
    // login
    req.login(user, {session: false}, (err) => {
      console.log('user: ' + user);
      if (err) {
        return next(err);
      } else{
        const token = jwt.sign({user: user}, 'HACKRU2022', (err, token) => {
          if (err){
            return next(err);
          }
          return res.json({token, "message": "user found & logged in", id: user._id});
        });
      }
    })
  })(req, res);
});

router.get('/sign-up', (req, res, next) => {
  if (req.isAuthenticated())
    res.redirect('/');
  else
    res.send("you will sign up here");
});

router.post('/sign-up', [
    body('first_name', "First name must not be empty").trim().escape(),
    body('last_name', "Last name must not be empty").trim().escape(),
    body('email', "Must be a valid email with RU domain").isLength({min: 3}).isEmail().trim().escape(),
    body('password').isLength({min: 5}),
    body('password2').custom((value, {req}) => {
        if (value != req.body.password){
            throw new Error("passwords do not match");
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        let email = req.body.email;
        let domain = email.substring(email.lastIndexOf("@") +1);
        if (!errors.isEmpty()){ // errors encountered while valiadting data
            res.status(403).send((errors.array())[0].msg);
        }
        else if (domain !== "scarletmail.rutgers.edu"){
          res.status(403).send("invalid credentials! email must be Rutgers-affliated");
        }
        else{
            User.find({username: req.body.username}).exec((err, result) => {
                if (err)
                    return next(err);
                if (result.length !== 0){
                    res.send('username already exists! Try another one');
                }
                else{
                    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                        if (err)
                            return next(err);
                        let newUser = new User({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            password: hashedPassword,
                            username: email.substring(0, email.lastIndexOf("@")),
                            email: req.body.email
                        });
                        newUser.save((err) => {
                            if (err)
                                return next(err);
                            res.sendStatus(200);
                        });
                    });
                }
            });
        }
    }
]);

router.post('/log-out', (req, res, next) => {
    //req.logout();
    req.token = null;
})
module.exports = router;
