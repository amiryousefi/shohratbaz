var express = require('express');
var router = express.Router();

const facebook_controller = require('../controllers/facebook.controller');

// auth facebook
router.get('/auth', facebook_controller.auth);

// get facebook callback response
router.get('/callback', facebook_controller.callback);

module.exports = router;
