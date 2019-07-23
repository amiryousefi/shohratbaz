var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("user", req.user);
  let title = "";
  if(req.isAuthenticated()){
    title = "yes";
  }else{
    title = "no";
  }
  console.log("PORT",process.env.PORT);
  res.render('index', { title: title });
});

module.exports = router;
