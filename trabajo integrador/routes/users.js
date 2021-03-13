var express = require('express');
var router = express.Router();
var userController = require ('../controllers/userController');
let {check,validationResult,body}= require('express-validator');
const validations=require('../Middleware/validations');
var multer = require('multer');
// const { body } = require('express-validator');
var guestMiddleware= require('../Middleware/guestMiddleware');
var authMiddleware= require('../Middleware/authMiddleware');
var adminMiddleware= require('../Middleware/adminMiddleware');

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
router.get('/', userController.index);


router.get('/registro',guestMiddleware, userController.registro);
router.post('/registro',upload.any('userAvatar'), guestMiddleware, validations.usersRegister, userController.storeRegistro);


// router.get('/ingreso', userController.ingreso);

router.get('/ingreso', guestMiddleware, userController.ingreso);
router.post('/ingreso', validations.usersUpload, userController.storeIngreso);





router.get('/check',function (req,res,){
  if (req.session.usuarioIngresado== undefined){
    res.send('No estas logueado');
  }else{
   res.send('El usuario logueado es '+ req.session.usuarioIngresado.email);
 } 
});


router.get('/logout', userController.logout);

//edicion de usuarios

router.get('/edit/:id', authMiddleware, userController.edit);
router.put('/edit/:id', validations.usersEdit, userController.update);

router.delete('/destroy/:id', userController.destroy); 
router.get('/list',adminMiddleware ,userController.list);


//perfil???
router.get('/detail/:id',userController.detail);



module.exports = router;
