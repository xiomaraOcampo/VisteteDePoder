var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Home', function(req, res, next) {
  res.render('home');
});

router.get('/registro', function(req, res, next) {
  res.render('registro');
});

router.get('/ingreso', function(req, res, next) {
  res.render('ingreso');
});
router.get('/Producto', function(req, res, next) {
  res.render('Producto');
});
router.get('/carrito', function(req, res, next) {
  res.render('carrito');
});
module.exports = router;
