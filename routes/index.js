var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    res.render('index');
  }else{
    res.render('facebook_login');
  }

});

module.exports = router;
