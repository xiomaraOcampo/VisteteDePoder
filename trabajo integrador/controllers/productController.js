const fs = require ('fs');
//fs.writeFileSync(__dirname + '/../Data/productsFile.json' , []);
let productsFile= JSON.parse(fs.readFileSync(__dirname + '/../Data/productsFile.json' ,{encoding: "utf-8"}));
const toThousand = n =>n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
//let productsJson= JSON.parse(productsFile);




let productController = {

    detail: function(req, res, next) {
        res.render('productsViews/detailProducts');
      }, 
      //esta función es para el formulario de creación de productos// 
    
    create: function(req, res, next) {
      res.render('productsViews/create');
    }, 
    store: function(req, res, next) {
    let product= {avatar: req.files[0].filename,
    ...req.body };
     /* {id: req.body.id,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      avatar: req.file[0].filename,
      categoria: req.body.categoria,
      talle: req.body.talle,
      disenio: req.body.disenio,
      precio: req.body.precio
     }*/

    productsFile.push(product);
    let productsFileJson= JSON.stringify(productsFile, null, 2);
    fs.writeFileSync(__dirname + '/../Data/productsFile.json' , productsFileJson);

     //res.send('agregaste un producto ' + req.body.nombre);
     res.render('productsViews/list', {productsFile, toThousand}  );
     
    },
    edit: function(req, res, next){
      var idProduct= req.params.id;

      var productFound;
      for (var i=0; i <productsFile.length; i++){
          if(productsFile[i].id == idProduct){
            productFound=productsFile[i];
            break; 
          }
        }
     if (productFound){
       res.render('productsViews/edit',{productFound,toThousand } );  
     }else{
       //res.send('No se ha encontrado el producto con Id: '+ idProduct)
       res.render('productsViews/list', {productsFile, toThousand}  );
     };
    },
  
/*

    update: function(req, res, next) {
      res.send('hola');
    }
      
*/   update: function (req, res, next){
     var idProduct= req.params.id;
      var productFound =[];
      for (var i=0; i <productsFile.length; i++){
        if(productsFile[i].id == idProduct){
          let editProduct= {avatar: req.files[0].filename,
            ...req.body };
          editProduct.id = idProduct;
          productFound.push(editProduct);
          
         }else{
          productFound.push(productsFile[i]);
         }

      }
        editProductJson= JSON.stringify(productFound, null, 2);
        fs.writeFileSync(__dirname + '/../Data/productsFile.json' , editProductJson);
        //res.send("Modificaste el producto " + req.body.nombre);
        res.render('productsViews/list', {productsFile, toThousand}  );

    }, 

   
        destroy : function(req, res, next){
          var idProduct= req.params.id;
          var productDestroy = productsFile.filter(function(product){
            return product.id != idProduct;
          });
          productDestroyJson = JSON.stringify(productDestroy, null, 2);
          fs.writeFileSync(__dirname + "/../Data/productsFile.json", productDestroyJson);
          //res.send("Eliminaste un producto")
          res.render('productsViews/list', {productsFile, toThousand}  );
          },
    
       list: function(req, res, next){
         /*console.log({avatar: req.files[0].filename,
          ...req.body });*/
         res.render('productsViews/list', {productsFile, toThousand}  );
      
         
        
      }   

    } //cierre general
      module.exports=productController;

    