var express = require('express');
var router = express.Router();
var userController = require ('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/registro', userController.registro);
router.post('/registro', userController.storeRegistro);

router.get('/ingreso', userController.ingreso);
router.post('/ingreso', userController.storeIngreso);

//edicion de usuarios

router.get('/edit/:id', userController.edit);
router.put('/edit/:id', userController.update);

router.delete('/destroy/:id', userController.destroy);
//router.get('/list',userController.list);


module.exports = router;
