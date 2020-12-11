var express = require('express');
var router = express.Router();
var userController = require ('../controllers/userController');
let {check,validationResult,body}= require('express-validator');
const validations=require('../Middleware/validations');
// const { body } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/registro', userController.registro);
router.post('/registro',validations.usersRegister, userController.storeRegistro);

router.get('/ingreso', userController.ingreso);
router.post('/ingreso', [
  check ('email').isEmail().withMessage('El mail debe ser un mail valido'),
  check ('contrasenia').isLength({min:6}).withMessage('La contraseña debe tener al menos seis caracteres'),
] ,userController.storeIngreso);

//edicion de usuarios

router.get('/edit/:id', userController.edit);
router.put('/edit/:id', validations.usersRegister, userController.update);

router.delete('/destroy/:id', userController.destroy); 
router.get('/list',userController.list);


module.exports = router;
