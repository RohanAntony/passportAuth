var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/login', function(req, res, next) {
  console.log(req.body);
  res.redirect('/');
});

router.post('/register', function(req, res, next) {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
