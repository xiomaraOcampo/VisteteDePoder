const fs = require ('fs');
//fs.writeFileSync(__dirname + '/../Data/productsFile.json' , []);
function leerJSON(){
  return  JSON.parse(fs.readFileSync(__dirname + '/../Data/productsFile.json' ,{encoding: "utf-8"}));
}
let productsFile= leerJSON();
const toThousand = n =>n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
//let productsJson= JSON.parse(productsFile);
let { check, validationResult, body } = require('express-validator');
const { decodeBase64 } = require('bcryptjs');

let db = require('../database/models');


let productController = {

    detailAdm: function(req, res, next) {

      var idProduct= req.params.id;
      
      var productFound;
        for(var i=0; i< productsFile.length; i++){
          if(productsFile[i].id == idProduct){
            productFound=productsFile[i];
            break;
          };
        };
          if(productFound){
         res.render('productsViews/detailProductsAdm', {productFound});
        }else{
          res.send('No se ha encontrado el producto con Id: '+ idProduct)
        }
      /*
        res.render('productsViews/detailProducts');*/
      }, 
      detailUs: function(req, res, next) {

        var idProduct= req.params.id;
        
        var productFound;
          for(var i=0; i< productsFile.length; i++){
            if(productsFile[i].id == idProduct){
              productFound=productsFile[i];
              break;
            };
          };
            if(productFound){
           res.render('productsViews/detailProductsUs', {productFound});
          }else{
            res.send('No se ha encontrado el producto con Id: '+ idProduct)
          }
        /*
          res.render('productsViews/detailProducts');*/
        },
     pruebas:function(req, res, next) {
  
      let ultimoId;
      db.Product.findAll()
     .then(function (products){
      ultimoId =  products[products.length-1].id;
         //  return res.send(product [product.length - 1])
      console.log(ultimoId)
      res.send ("lo encontro")
      })
      .catch(function(error){
       console.log(error);   
     })
      // db.Product.findAll()
      //  .then(function (products){
      //   let ultimoId =  products[products.length-1].id;
      //      //  return res.send(product [product.length - 1])
      //   console.log(ultimoId)
      //   res.send ("lo encontro")
      // })
      // .catch(function(error){
      //  console.log(error);
      //  res.send("Error")    
      // })
      //  TRAE EL DISEÑO DE UN PRODUCTO ESPECIFICO
      // db.Product.findAll({
      //   include: [ {association: "designs"} ]
      // })
      //  .then(function (products){
      //   res.send(products[2].designs[0].design)
      // })
      // .catch(function(error){
      //  console.log(error);
      //  res.send("Error")    
      // })
      // TRAE LOS DISEÑOS ASOCIADOS CON PRODUCTOS
      // db.Design.findAll({
      //      include: [ {association: "products"} ]
      //    })
      // .then(function (designs){  
      //      res.send(designs)
      // })
      // .catch(function(error){
      //     console.log(error);
      //     res.send("Error")    
      // })

      // TRAE LA TABLA INTERMEDIA CON LOS PRODUCTOS. LOS DISEÑOS NO ANDAN
    //  db.Design_Product.findAll({
    //   include: [ {association: "products"} ]
    // })
    //    .then(function (result){
    //    return res.send(result)
    //    })
    //   .catch(function(error){
    //    console.log(error);
    //    res.send("Error")
    //    })
          // res.send("anda")
    }, 
    
    create: function(req, res, next) {
      let pedidoDesigns = db.Design.findAll()
      let pedidoSizes =  db.Size.findAll()
    
      Promise.all([pedidoDesigns,pedidoSizes])
      .then(function ([designs, sizes]){
           return res.render('productsViews/create', {designs:designs, sizes:sizes});
      })
      .catch(function(error){
          console.log(error);
      })
      
    }, 
    store: function(req, res, next) {
      let errors = validationResult(req);
         //isEmpty= esta vacia
      if (errors.isEmpty()) {

        console.log(req.body)
        db.Product.create(
           {
            name: req.body.nombre,
            price: req.body.precio,
            description: req.body.descripcion,
            image: req.files.length>0 ? req.files[0].filename : null, //o la imagen x defecto
            subcategory_id: req.body.subcategoria
        })
        // DESAFIO: COMO LEVANTAR EL ID DEL PRODUCTO QUE ESTAMOS CREANDO.
        var ultimoId;
        db.Product.findAll()
          .then(function (products){
          ultimoId =  products[products.length-1].id;
          console.log(ultimoId)
          return ultimoId;
          })
        .catch(function(error){
         console.log(error);   
       })
        
        // CREATE PARA LAS TABLAS PIVOT
          db.Design_Product.create(
            {design_id: req.body.disenio,
             product_id: ultimoId
            });
          db.Product_Size.create(
            {size_id: req.body.talle,
             product_id: ultimoId
            });

          res.redirect('/products/list')

     }else {

     return res.render('productsViews/create', {errors: errors.errors});
    } ;
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
    }
    ,
  
/*
    update: function(req, res, next) {
      res.send('hola');
    }
      
*/   update: function (req, res, next){
     var idProduct= req.params.id;
    
      var productFound =[];
      for (var i=0; i <productsFile.length; i++){
        if(productsFile[i].id == idProduct){
        
          let editProduct= {avatar: 
            req.files.length>0 ? req.files[0].filename : productsFile[i].avatar,
            ...req.body,
            delete: false};
            
          editProduct.id = idProduct;
          productFound.push(editProduct);
          
         }else{
          productFound.push(productsFile[i]);
         }

      }
        editProductJson= JSON.stringify(productFound, null, 2);
        fs.writeFileSync(__dirname + '/../Data/productsFile.json' , editProductJson);
        //res.send("Modificaste el producto " + req.body.nombre);
        //res.render('productsViews/list', {productsFile, toThousand}  );
        res.redirect('/products/detailProductUs/' +req.params.id);

    }, 

   
        destroy : function(req, res, next){
          var idProduct= req.params.id;

          /*var productDestroy = productsFile.find(function(product){
            return product.id == idProduct;
          });
         
          productDestroy.delete=true;*/

          var productDeleteTrue = productsFile.map(function(product){
            if(product.id == idProduct){
              product.delete=true;
            }
            return product;
          });

          /*var productDestroy = productsFile.filter(function(product){
            return product.id != idProduct;
          });*/


          productDestroyJson = JSON.stringify(productDeleteTrue, null, 2);
          fs.writeFileSync(__dirname + "/../Data/productsFile.json", productDestroyJson);
          //res.send("Eliminaste un producto")
          //res.render('productsViews/list', {productsFile, toThousand}  );
          res.redirect('/products/list');
          },
    
       list: function(req, res, next){
         /*console.log({avatar: req.files[0].filename,
          ...req.body });*/
    
          let lectura = leerJSON();

          var productList = lectura.filter(function(product){
            return product.delete == false;
          });

    
         res.render('productsViews/list', {productsFile:productList, toThousand}  );
        
      }   ,
      listProductsUs: function(req, res, next){
        /*console.log({avatar: req.files[0].filename,
         ...req.body });*/
   
         let lectura = leerJSON();

         var productList = lectura.filter(function(product){
           return product.delete == false;
         });

   
        res.render('productsViews/listProductsUs', {productsFile:productList, toThousand}  );
       
     } 

    } //cierre general
      module.exports=productController;
