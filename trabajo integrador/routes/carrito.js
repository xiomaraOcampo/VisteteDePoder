const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
var authMiddleware= require('../Middleware/authMiddleware');




router.get('/carrito2', carritoController.carrito2 );


//Empiezo el CRUD de carrito,vamos que se puede !!

router.get('/',authMiddleware,carritoController.cargaCarrito );
router.post('/agregarProducto/:id', carritoController.agregarProducto); 
router.post('/vaciar', carritoController.vaciarCarrito);


module.exports = router;
