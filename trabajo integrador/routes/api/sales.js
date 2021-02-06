var express = require('express');
var router = express.Router();
const salesAPIController = require ("../../controllers/api/salesAPIController")

/* GET home page. */
router.get('/', salesAPIController.list);

module.exports = router;