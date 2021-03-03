const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
var authMiddleware= require('../Middleware/authMiddleware');




router.get('/carrito2',authMiddleware, carritoController.carrito2 );


//Empiezo el CRUD de carrito,vamos que se puede !!

router.get('/',authMiddleware,carritoController.cargaCarrito );
<<<<<<< HEAD
router.post('/agregarProducto/:id', carritoController.agregarProducto); 
router.delete('/destroy/:id', carritoController.destroy); 
router.post('/vaciar/:id', carritoController.vaciarCarrito);
=======
router.post('/agregarProducto/:id',authMiddleware, carritoController.agregarProducto); 
router.post('/vaciar',authMiddleware, carritoController.vaciarCarrito);
>>>>>>> dceb4ae1b16417375bbeacb0e21c1097064473e6


module.exports = router;
