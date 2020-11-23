var express = require('express');
var router = express.Router();
var userController = require ('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/ingreso', userController.ingreso);

router.get('/registro', userController.registro);

//edicion de usuarios

router.get('/edit/:id', userController.edit);
router.put('/edit/:id', userController.update);


module.exports = router;
