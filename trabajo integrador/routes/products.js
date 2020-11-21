var express = require('express');
const { RequestHeaderFieldsTooLarge } = require('http-errors');
var router = express.Router();
var productController = require ('../controllers/productController');
var multer  = require('multer');

//var upload = multer({ dest: 'uploads/' });
const path = require ('path');

// multer
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
          cb(null, 'public/images/imagesProducts')  
  
  },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage:storage});

   // router.get("", upload.any(), productController.store);

//ruta para el detalle de productos que ve el usuario

router.get('/detailProduct',productController.detail);

//ruta para los formularios del administrador, para cargar productos

router.get('/create' ,productController.create);
router.post('/create', upload.any('avatar'),productController.store);

//ruta para los formularios del administrador, para modificar productos

router.get('/edit/:id',productController.edit);
router.post('/edit/:id',upload.any('avatar'),productController.update);

router.delete('/destroy/:id', productController.destroy);

router.get('/list',productController.list);

module.exports = router;