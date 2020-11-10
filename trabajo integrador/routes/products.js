var express = require('express');
var router = express.Router();
var productController = require ('../controllers/productController');


router.get('/producto',productController.producto);


router.get('/create',productController.create);

module.exports = router;