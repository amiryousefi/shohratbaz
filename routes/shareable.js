var express = require('express');
var router = express.Router();

const shareable_controller = require('../controllers/shareable.controller');

router.post('/store', shareable_controller.store);
router.get('/get', shareable_controller.get);

module.exports = router;
