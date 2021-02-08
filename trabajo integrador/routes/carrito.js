const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController')




router.get('/carrito2', carritoController.carrito2 );


//Empiezo el CRUD de carrito,vamos que se puede !!
router.get('/', carritoController.cargaCarrito );
router.post('/', carritoController.agregarProducto);
router.post('/vaciar', carritoController.vaciarCarrito);


module.exports = router;
