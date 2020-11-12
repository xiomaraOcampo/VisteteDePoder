var express = require('express');
var router = express.Router();
var productController = require ('../controllers/productController');
/*var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const path = require ('path');

// multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })*/

//ruta para el detalle de productos que ve el usuario

router.get('/detailProduct',productController.detail);

//ruta para los formularios del administrador, para cargar productos

router.get('/create',productController.create);
router.post('/create',/*upload.single('avatar'),*/productController.store);

//ruta para los formularios del administrador, para modificar productos

router.get('/edit/:id',productController.edit);
//router.post('/edit/:id',productController.update);


module.exports = router;