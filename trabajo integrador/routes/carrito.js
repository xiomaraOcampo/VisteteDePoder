const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController')



router.get('/', carritoController.cargaCarrito );
router.get('/carrito2', carritoController.carrito2 );
module.exports = router;
