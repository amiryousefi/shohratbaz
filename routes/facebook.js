var express = require('express');
var router = express.Router();

const facebook_controller = require('../controllers/facebook.controller');

router.get('/auth', facebook_controller.auth);
router.get('/callback', facebook_controller.callback);

module.exports = router;
