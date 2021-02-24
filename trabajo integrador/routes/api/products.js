var express = require('express');
var router = express.Router();
const productsAPIController = require ("../../controllers/api/productsAPIController")

/* GET home page. */
router.get('/', productsAPIController.list);

router.get('/cat', productsAPIController.cat);

router.get('/:id', productsAPIController.find);



module.exports = router;
