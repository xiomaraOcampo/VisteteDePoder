const fs = require("fs");
//fs.writeFileSync(__dirname + '/../Data/productsFile.json' , []);
function leerJSON() {
  return JSON.parse(
    fs.readFileSync(__dirname + "/../Data/productsFile.json", {
      encoding: "utf-8",
    })
  );
}
let productsFile = leerJSON();
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//let productsJson= JSON.parse(productsFile);
let { check, validationResult, body } = require("express-validator");
const { decodeBase64 } = require("bcryptjs");

let db = require("../database/models");


let productController = {

  detailAdm: function (req, res, next) {


    let usuarioAIngresar= req.session.usuarioIngresado;
    db.Product.findByPk(req.params.id, {
      include: [{ association: "designs" }, { association: "sizes" }, { association: "subcat" }],
      raw: true,
      nest: true,
    })
      .then(function (product) {
        if (product) {
          console.log(product);
          return res.render("productsViews/detailProductAdm", {
            product: product, usuarioAIngresar
          });
        } else {
          return res.render("productsViews/mensajeNoEncontrado");
        }
      })
      .catch(function (error) {
        console.log(error);
        res.send("Error");
      });
  },
 
  detailUs: function (req, res, next) {

   

    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    db.Product.findByPk(req.params.id, {
      include: [{ association: "designs" }, { association: "sizes" }, { association: "subcat" }],
      raw: true,
      nest: true,
    })
      .then(function (product) {
        if (product) {
          return res.render("productsViews/detailProductsUs", {
            product: product
          });
        } else {
          return res.render("productsViews/mensajeNoEncontrado");
        }
      })
      .catch(function (error) {
        console.log(error);
        res.send("Error");
      });




  
  },
  search: function (req, res, next) {
    db.Product.findAll({
      where: { name: req.body.busqueda },
      include: [{ association: "designs" }, { association: "sizes" }, { association: "subcat" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        //  res.send(products)
        if (products.length > 0) {
          // return res.render("productsViews/listSearch")
          return res.render("productsViews/listSearch", {
            products: products,
          });
          //  res.send(products[1])
        } else {
          return res.render("productsViews/mensajeNoEncontrado");
        }
      })
      .catch(function (error) {
        console.log(error);
        res.send("error");
      });
  },

  pruebas: function (req, res, next) {
    // console.log(req.body.busqueda)
 
    
  },

  create: function (req, res, next)   {
    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    let pedidoDesigns = db.Design.findAll();
    // let pedidoSizes = db.Size.findAll();
    let pedidoSubcategories = db.Subcategory.findAll();

    console.log();

    Promise.all([pedidoDesigns, pedidoSubcategories])
      .then(function ([designs, subcat]) {
        return res.render("productsViews/create", {
          designs: designs,
          subcat: subcat
        });

      })
      .catch(function (error) {
        console.log(error);
      });
  },
  store: function (req, res, next) {
    let errors = validationResult(req);
    let subcat = db.Subcategory.findAll();
    let designs =db.Design.findAll();
    // isEmpty= esta vacia
    if (errors.isEmpty()) {
    console.log(validationResult(req));
    db.Product.create({
      name: req.body.nombre,
      price: req.body.precio,
      description: req.body.descripcion,
      image: req.files.length > 0 ? req.files[0].filename : null, //o la imagen x defecto
      subcategory_id: req.body.subcategoria,
    })
      .then(function (product) {
        // console.log(product)
        db.Design_Product.create({
          design_id: req.body.disenio,
          product_id: product.id,
        });
        // db.Product_Size.create({
        //   size_id: req.body.talle,
        //   product_id: product.id,
        // });
      })
      .catch(function (error) {
        console.log(error);
      });

    // res.redirect("/products/list", { product: product });
    // res.send('creaste un producto')
    return res.render('productsViews/productCreated')

    } else {
    return res.render("productsViews/create",  { errors: errors.errors, subcat:subcat, designs:designs });
    }
  },
  edit: function (req, res, next) {
    
    let pedidoProduct = db.Product.findByPk(req.params.id )
    let pedidoDesigns = db.Design.findAll();

    let pedidoSubcategories = db.Subcategory.findAll();
    
    
    Promise.all([pedidoProduct, pedidoDesigns, pedidoSubcategories])
      
    
    .then(function ([product, designs, subcategories]) {
      // .then(function(product){

        
        if(product){
        //  res.send([product, designs, subcategories])
          res.render("productsViews/edit", { product: product, designs:designs, subcategories:subcategories})
        }else {
           res.render("productsViews/mensajeNoEncontrado"); 

        }
        }
       );
  

  },
  update: function (req, res, next) {
    
    db.Product.update({
      name: req.body.nombre,
      price: req.body.precio,
      description: req.body.descripcion,
      image: req.files.length > 0 ? req.files[0].filename : null, //o la imagen x defecto
      subcategory_id: req.body.subCategoria,

      design: req.body.disenio,
      size: req.body.talle
    }, {
      where: {
        id: req.params.id
      }

    }); res.redirect("/products/detailProductAdm/" + req.params.id)
  },

  delete: function (req, res, next) {
   
    db.Product.destroy({
      where: { id: req.params.id }
    })
    res.render("productsViews/mensajeProdEliminado")
  },

  listIndumentaria: function (req, res) {

  
    db.Product.findAll({
        
        include: [{ association: "designs" }, {association: "subcat"}],
        raw: true,
        nest: true,
      })

      .then(function (prods) {
        
         let products = [];
          // res.send(prods)
         for (let i=0; i<prods.length; i++){
          
        console.log(prods[i].subcat);
        if(prods[i].subcat.category_id == 1){
         products.push(prods[i])

        }
       
         }
      res.render("productsViews/listSearch", { products: products });
      })

      // .catch(function (error) {
      //   console.log(error);
      //   res.send("error");
      // })
  },
  listMerchandising: function (req, res) {

  
    db.Product.findAll({
        
        include: [{ association: "designs" }, {association: "subcat"}],
        raw: true,
        nest: true,
      })

      .then(function (prods) {
        
        let products = [];

        for (let i=0; i<prods.length; i++){
          
      //  console.log(prods[i].subcat.category_id);
       if(prods[i].subcat.category_id == 2){
          products.push(prods[i])
       }
        
      }

      res.render("productsViews/listSearch", { products: products });
      })

      .catch(function (error) {
        console.log(error);
        res.send("error");
      })
  },

  listAccesorios: function (req, res) {

  
      db.Product.findAll({
        
        include: [{ association: "designs" }, {association: "subcat"}],
        raw: true,
        nest: true,
      })

      .then(function (prods) {
        
        let products = [];

        for (let i=0; i<prods.length; i++){
          
      //  console.log(prods[i].subcat.category_id);
       if(prods[i].subcat.category_id == 3){
          products.push(prods[i])

       }
        
      }

      res.render("productsViews/listSearch", { products: products});
      })

      .catch(function (error) {
        console.log(error);
        res.send("error");
      })
  },
  listProductsUs: function (req, res, next) {
  
    db.Subcategory.findAll({

      include: [{ association: "categorias" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products)
        res.render("productsViews/listProductsUs", { products: products })
         
          .catch(function (error) {
            console.log(error);
            res.send("error");
          })

      })
  },

  listProductsAdm: function (req, res, next) {
  
    
    db.Product.findAll({

      // include: [{ association: "categorias", association: "subcategory", association: "size" }],
      include: [{ association: "designs" }, { association: "sizes" }, { association: "subcat" }],
      raw: true,
      nest: true,
    })

      .then(function (product) {
        console.log(product)
        res.render("productsViews/list", { product: product })
         
          .catch(function (error) {
            console.log(error);
            res.send("error");
          })

      })
  },

  Tshirt: function (req, res, next) {
    // res.send('ruta')
    // PROBARLO BUSCANDO POR SUBCATEGORIA?
    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    db.Product.findAll({
      where: { name: "Remera" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })
      // db.Product.findAll({
      //   where: { subcategory_id: "1" },
      //   include: [{ association: "designs" },{ association: "subcat"}],
      //   raw: true,
      //   nest: true,
      // })

      .then(function (products) {

        if (products.length > 0) {


          // return res.render("productsViews/listSearch")
          return res.render("productsViews/listSearch", {
            products: products,
          });
          //  res.send(products[1])
        } else {
          return res.render("productsViews/mensajeNoEncontrado");
        }
      })
      .catch(function (error) {
        console.log(error);
        res.send("error");
      });
  },
  masc: function (req, res, next) {
   
    db.Product.findAll({
      where: { name: "Barbijo" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        //  res.send(products[1].designs.design)
        if (products.length > 0) {
          // return res.render("productsViews/listSearch")
          return res.render("productsViews/listSearch", {
            products: products,
          });
          //  res.send(products[1])
        } else {
          return res.render("productsViews/mensajeNoEncontrado");
        }
      })
      .catch(function (error) {
        console.log(error);
        res.send("error");
      });
  },
  cap: function (req, res, next) {
   
    db.Product.findAll({
      where: { name: "Gorra" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products )
        if (products.length > 0) {
          return res.render("productsViews/listSearch", {
            products: products,
          });
        } else {
          return res.render("productsViews/mensajeNoEncontrado");
        }
      })
      .catch(function (error) {
        console.log(error);
        res.send("error");
      });
  },
  cup: function (req, res, next) {

    db.Product.findAll({
      where: { name: "Taza" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products )
        if (products.length > 0) {
          return res.render("productsViews/listSearch", {
            products: products,
          });
        } else {
          return res.render("productsViews/mensajeNoEncontrado");
        }
      })
      .catch(function (error) {
        console.log(error);
        res.send("error");
      });
  },
  thermo: function (req, res, next) {
 
    db.Product.findAll({
      where: { name: "Termo" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products )
        if (products.length > 0) {
          return res.render("productsViews/listSearch", {
            products: products,
          });
        } else {
          return res.render("productsViews/mensajeNoEncontrado");
        }
      })
      .catch(function (error) {
        console.log(error);
        res.send("error");
      });
  },
  bottle: function (req, res, next) {
   
    db.Product.findAll({
      where: { name: "Botella" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products )
        if (products.length > 0) {
          return res.render("productsViews/listSearch", {
            products: products,
          });
        } else {
          return res.render("productsViews/mensajeNoEncontrado");
        }
      })
      .catch(function (error) {
        console.log(error);
        res.send("error");
      });
  },
  handbag: function (req, res, next) {
   
    db.Product.findAll({
      where: { name: "Bolso" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products )
        if (products.length > 0) {
          return res.render("productsViews/listSearch", {
            products: products,
          });
        } else {
          return res.render("productsViews/mensajeNoEncontrado");
        }
      })
      .catch(function (error) {
        console.log(error);
        res.send("error");
      });
  },
  pencilCase: function (req, res, next) {
   
    db.Product.findAll({
      where: { name: "Cartuchera" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products )
        if (products.length > 0) {
          return res.render("productsViews/listSearch", {
            products: products,
          });
        } else {
          return res.render("productsViews/mensajeNoEncontrado");
        }
      })
      .catch(function (error) {
        console.log(error);
        res.send("error");
      });
  },
  backpack: function (req, res, next) {
    
    db.Product.findAll({
      where: { name: "Mochila" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products )
        if (products.length > 0) {
          return res.render("productsViews/listSearch", {
            products: products,
          });
        } else {
          return res.render("productsViews/mensajeNoEncontrado");
        }
      })
      .catch(function (error) {
        console.log(error);
        res.send("error");
      });
  },
  productCreated: function (req, res, next) {
    // res.send('anda la ruta')
    return res.render('productsViews/productCreated')
  }
}; //cierre general
module.exports = productController;
