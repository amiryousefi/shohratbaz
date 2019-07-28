var express = require('express');
var router = express.Router();

const shared_controller = require('../controllers/shared.controller');

router.post('/store', shared_controller.store);
router.get('/get', shared_controller.get);

module.exports = router;
