var express = require('express');
var router = express.Router();
var userController = require ('../controllers/userController');
let {check,validationResult,body}= require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/registro', userController.registro);
router.post('/registro',[
  check ('nombre').isLength({min:1}).withMessage('Este campo debe estar completo'),
  check ('email').isEmail().withMessage('El mail debe ser un mail valido'),
  check ('contrasenia').isLength({min:6}).withMessage('La contraseña debe tener al menos seis caracteres'),
  // check ('confirmacionContrasenia').equals( '', comparison)	,
  // preguntar como validar esto el lunes 30/11,xio 
], userController.storeRegistro);

router.get('/ingreso', userController.ingreso);
router.post('/ingreso', userController.storeIngreso);

//edicion de usuarios

router.get('/edit/:id', userController.edit);
router.put('/edit/:id', userController.update);

router.get('/destroy/:id', userController.destroy);
router.get('/list',userController.list);


module.exports = router;
