var express = require('express');
var router = express.Router();
var userController = require ('../controllers/userController');
let {check,validationResult,body}= require('express-validator');
const validations=require('../Middleware/validations');
var multer = require('multer');
// const { body } = require('express-validator');

const path = require ('path');

var storage = multer.diskStorage({
  destination:  (req, file,cb) => {
    cb(null, 'public/images/usersImages')  

},
filename: function (req, file, cb) {
cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
}
})

var upload = multer({ storage:storage});



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/registro', userController.registro);
router.post('/registro',upload.any('userAvatar'), validations.usersRegister, userController.storeRegistro);

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
