var express = require('express');
const { RequestHeaderFieldsTooLarge } = require('http-errors');
var router = express.Router();
var productController = require ('../controllers/productController');
var multer  = require('multer');
const validations = require('../Middleware/validations');
var adminMiddleware= require('../Middleware/adminMiddleware');

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

//detalle de producto diferentes para el administrador y el usuario




router.get('/detailProductAdm/:id',adminMiddleware, productController.detailAdm);
router.get('/detailProductUs/:id', productController.detailUs);

// prueba para traer la tabla design

router.get('/pruebas' ,productController.pruebas);

// ruta del buscador
router.post('/search' ,productController.search);




//ruta para los formularios del administrador, para cargar productos

 router.get('/create' ,adminMiddleware, productController.create);
 router.post('/create',upload.any('avatar'), adminMiddleware, validations.productCreated, productController.store);

//ruta para los formularios del administrador, para modificar productos

router.get('/edit/:id',adminMiddleware, productController.edit);
router.put('/edit/:id',adminMiddleware, upload.any('avatar'),productController.update);

router.delete('/destroy/:id',adminMiddleware,  productController.delete);

router.get('/listIndumentaria',productController.listIndumentaria);
router.get('/listMerchandising',productController.listMerchandising);
router.get('/listAccesorios',productController.listAccesorios);


router.get('/listProductsUs',productController.listProductsUs);
router.get('/listProductsAdm',productController.listProductsAdm);

// ruta del nav filtrando
// router.get('/nav/:id' ,productController.nav);

router.get('/Tshirt' ,productController.Tshirt);
router.get('/masc' ,productController.masc);
router.get('/cap' ,productController.cap);
router.get('/cup' ,productController.cup);
router.get('/thermo' ,productController.thermo);
router.get('/bottle' ,productController.bottle);
router.get('/handbag' ,productController.handbag);
router.get('/pencilCase' ,productController.pencilCase);
router.get('/backpack' ,productController.backpack);


router.get('/productCreated' , adminMiddleware,productController.productCreated);

module.exports = router;