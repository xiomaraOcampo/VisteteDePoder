var express = require('express');
var router = express.Router();
const usersAPIController = require ("../../controllers/api/usersAPIController")

/* GET home page. */
router.get('/', usersAPIController.list);

module.exports = router;
