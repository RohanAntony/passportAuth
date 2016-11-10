var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var passport = require('passport');

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log("Login error:"+err);
      return next(err);
    }
    if (!user) {
      console.log("Login error: User not found!!");
      return res.redirect('/login');
    }
    req.login(user, function(err) {
      if (err) {
        console.log("Login error: Error during session creation!!");
        return next(err);
      }
      console.log("User Object: "+req.user);
      return res.redirect('/users');
    });
  })(req, res, next);
});

router.post('/register', function(req, res, next) {
  console.log(req.body);
  User.register(new User({username:req.body.username}),req.body.password,function(err){
    if(err){
      console.log('Error while registering user!!');
      res.send('Error registering user');
    }
    else {
      console.log('User registered');
      res.redirect('/');
    }
  })
});

router.get('/users',isLoggedIn,function(req,res){
  console.log("User: "+req.user.username);
  res.send("Welcome user: "+req.user.username);
})

function isLoggedIn(req,res,next){
  if(req.user){
    next();
  }else{
    res.redirect('/login');
  }
}


module.exports = router;
