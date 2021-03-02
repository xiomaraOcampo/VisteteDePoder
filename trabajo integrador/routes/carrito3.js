const express = require('express');
const router = express.Router();
const carritoController3 = require('../controllers/carritoController3');
// var authMiddleware= require('../Middleware/authMiddleware');




router.get('/', carritoController3.carrito3 );

router.get('/agregarProducto3/:id', carritoController3.agregarProducto3);


//Empiezo el CRUD de carrito,vamos que se puede !!

// router.get('/',authMiddleware,carritoController.cargaCarrito );
// router.post('/agregarProducto/:id', carritoController.agregarProducto); 
// router.post('/vaciar', carritoController.vaciarCarrito);


module.exports = router;
