var express = require('express');
var router = express.Router();
var productController = require ('../controllers/productController');

//ruta para el detyalle de productos que ve el usuario

router.get('/detailProduct',productController.detail);

//ruta para los formularios del administrador, para cargar productos

router.get('/create',productController.create);
router.post('/create',productController.store);

//ruta para los formularios del administrador, para modificar productos

//router.get('/edit/:id',productController.edit);
//router.post('/edit/:id',productController.update);


module.exports = router;