const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController')



router.get('/', carritoController.cargaCarrito );

module.exports = router;
