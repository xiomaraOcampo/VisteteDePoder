const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
var authMiddleware= require('../Middleware/authMiddleware');




router.get('/carrito2',authMiddleware, carritoController.carrito2 );


//Empiezo el CRUD de carrito,vamos que se puede !!

router.get('/',authMiddleware,carritoController.cargaCarrito );
router.post('/agregarProducto/:id',authMiddleware, carritoController.agregarProducto); 
router.post('/vaciar',authMiddleware, carritoController.vaciarCarrito);


module.exports = router;
