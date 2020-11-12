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
    let product= req.body; 
    productsFile.push(product);
    let productsFileJson= JSON.stringify(productsFile);
    fs.writeFileSync(__dirname + '/../Data/productsFile.json' , productsFileJson);

     res.send('agregaste un producto ' + req.body.nombre);
     
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
       res.render('productsViews/edit',{productFound,toThousand } ); //el toThousand no sé por qué lo pongo acá si ya va en la vista 
     }else{
       res.send('No se ha encontrado el producto con Id: '+ idProduct)
     };
    },
  
/*

    update: function(req, res, next) {
      res.send('hola');
    }
      
*/
    update: function (req, res, next){
     var idProduct= req.params.id;
      var productFound ;
      for (var i=0; i <productsFile.length; i++){
        if(productsFile[i].id == idProduct){
          let editProduct= req.body;
          editProduct = idProduct;
          productFound.push(editProduct);
          
         }else{
          productFound.push(productsFile[i]);
         }

      }
        editProductJson= JSON.stringify(productFound);
        fs.writeFileSync(__dirname + '/../Data/productsFile.json' , editProductJson);
        res.send("Modificaste el producto " + req.body.nombre);

    }
    /*,
    update: function (req, res, next){
      var idProduct= req.params.id;
      var editProduct= productsFile.map(function(product){
        if(product.id == idProduct){
          product= req.body;

          
        }
      return product;
      console.log(product)
       
      });



    }
    */
  
    } //cierre general
      module.exports=productController;

    