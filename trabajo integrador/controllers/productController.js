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
  // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
  detailAdm: function (req, res, next) {
    db.Product.findByPk(req.params.id, {
      include: [{ association: "designs" }, { association: "sizes" }, { association: "subcat" }],
      raw: true,
      nest: true,
    })
      .then(function (product) {
        if (product) {
          console.log(product);
          return res.render("productsViews/detailProductAdm", {
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
  // detailAdm: function (req, res, next) {
  //   var idProduct = req.params.id;

  //   var productFound;
  //   for (var i = 0; i < productsFile.length; i++) {
  //     if (productsFile[i].id == idProduct) {
  //       productFound = productsFile[i];
  //       break;
  //     }
  //   }
  //   if (productFound) {
  //     res.render("productsViews/detailProductAdm", { productFound });
  //   } else {
  //     res.send("No se ha encontrado el producto con Id: " + idProduct);
  //   }
  //   /*
  //       res.render('productsViews/detailProducts');*/
  // },
  detailUs: function (req, res, next) {
    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    db.Product.findByPk(req.params.id, {
      include: [{ association: "designs" }, { association: "sizes" },{ association: "subcat" }],
      raw: true,
      nest: true,
    })
      .then(function (product) {
        if (product) {
          return res.render("productsViews/detailProductsUs", {
            product: product,
          });
        } else {
          return res.render("productsViews/mensajeNoEncontrado");
        }
      })
      .catch(function (error) {
        console.log(error);
        res.send("Error");
      });
    // var idProduct = req.params.id;

    // var productFound;
    // for (var i = 0; i < productsFile.length; i++) {
    //   if (productsFile[i].id == idProduct) {
    //     productFound = productsFile[i];
    //     break;
    //   }
    // }
    // if (productFound) {
    //   res.render("productsViews/detailProductsUs", { productFound });
    // } else {
    //   res.send("No se ha encontrado el producto con Id: " + idProduct);
    // }
  },
  search: function (req, res, next) {
    // PROBARLO BUSCANDO POR SUBCATEGORIA?
    // PROBAR POR RAW QUERY SI SE PUEDE GENERAR LA BUSQUEDA CON %LIKE%
    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    db.Product.findAll({
      where: { name: req.body.busqueda },
      include: [{ association: "designs" }, { association: "sizes" }, { association: "subcat" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        //  res.send(products[1].designs.design)
        if (products) {
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
    // db.Product.findOne({
    //   where:{name: req.body.busqueda
    //   }
    // })
    //   .then(function (product) {
    //     if(product){
    //       return res.render("productsViews/detailProductAdm", {
    //         product: product,
    //       });
    //     }else{
    //       return res.render("productsViews/mensajeNoEncontrado");
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     res.send("error")
    //   });
    // let ultimoId;
    // db.Product.findAll()
    //   .then(function (products) {
    //     ultimoId = products[products.length - 1].id;
    //     console.log(ultimoId);
    //     // return res.send (ultimoId )
    //     res.send("lo encontro");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

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
  },

  create: function (req, res, next) {
    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    let pedidoDesigns = db.Design.findAll();
    // let pedidoSizes = db.Size.findAll();
    let pedidoSubcategories = db.Subcategory.findAll();


   
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
    //isEmpty= esta vacia
    if (errors.isEmpty()) {
      console.log(req.body);
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
      res.send('creaste un producto')

    } else {
      return res.render("productsViews/create", { errors: errors.errors });
    }
  },
  edit: function (req, res, next) {
    // var idProduct = req.params.id;

    // var productFound;
    // for (var i = 0; i < productsFile.length; i++) {
    //   if (productsFile[i].id == idProduct) {
    //     productFound = productsFile[i];
    //     break;
    //   }
    // }
    // if (productFound) {
    //   res.render("productsViews/edit", { productFound, toThousand });
    // } else {
    //   //res.send('No se ha encontrado el producto con Id: '+ idProduct)
    //   res.render("productsViews/list", { productsFile, toThousand });
    // }

    let pedidoProduct = db.Product.findByPk(req.params.id);
    let pedidoDesigns = db.Design.findAll();
    let pedidoSizes = db.Size.findAll();
    let pedidoSubcategories = db.Subcategory.findAll();
  
    Promise.all([pedidoProduct, pedidoDesigns, pedidoSizes, pedidoSubcategories])
    .then(function([product, design, size, subcategory]){
            // console.log([product, design, size, subcategory])
            res.render("productsViews/edit", {product:product, design:design, size:size, subcategory:subcategory })
    })

  },
  update: function (req, res, next) {
    // var idProduct = req.params.id;

    // var productFound = [];
    // for (var i = 0; i < productsFile.length; i++) {
    //   if (productsFile[i].id == idProduct) {
    //     let editProduct = {
    //       avatar:
    //         req.files.length > 0
    //           ? req.files[0].filename
    //           : productsFile[i].avatar,
    //       ...req.body,
    //       delete: false,
    //     };

    //     editProduct.id = idProduct;
    //     productFound.push(editProduct);
    //   } else {
    //     productFound.push(productsFile[i]);
    //   }
    // }
    // editProductJson = JSON.stringify(productFound, null, 2);
    // fs.writeFileSync(__dirname + "/../Data/productsFile.json", editProductJson);
    // //res.send("Modificaste el producto " + req.body.nombre);
    // //res.render('productsViews/list', {productsFile, toThousand}  );
    // res.redirect("/products/detailProductUs/" + req.params.id);
  
    db.Product.update({
      name: req.body.nombre,
      price: req.body.precio,
      description: req.body.descripcion,
      image: req.files.length > 0 ? req.files[0].filename : null, //o la imagen x defecto
      subcategory_id: req.body.subCategoria,
      
      design: req.body.disenio,
      size: req.body.talle
    },{
      where: {
          id: req.params.id
      }
  
  });res.redirect("/products/detailProductAdm/" + req.params.id )
},
  // destroy: function (req, res) {
  //   db.Product.destroy({
  //     where: {
  //       id: req.params.id,
  //     },
  //   });
  //   return res.redirect("/products/list");
  // },

  destroy: function (req, res, next) {
    var idProduct = req.params.id;

    /*var productDestroy = productsFile.find(function(product){
            return product.id == idProduct;
          });
         
          productDestroy.delete=true;*/

    var productDeleteTrue = productsFile.map(function (product) {
      if (product.id == idProduct) {
        product.delete = true;
      }
      return product;
    });

    /*var productDestroy = productsFile.filter(function(product){
            return product.id != idProduct;
          });*/

    productDestroyJson = JSON.stringify(productDeleteTrue, null, 2);
    fs.writeFileSync(
      __dirname + "/../Data/productsFile.json",
      productDestroyJson
    );
    //res.send("Eliminaste un producto")
    //res.render('productsViews/list', {productsFile, toThousand}  );
    res.redirect("/products/list");
  },

  list: function (req, res) {

    /*console.log({avatar: req.files[0].filename,
          ...req.body });*/

    // let lectura = leerJSON();

    // var productList = lectura.filter(function (product) {
    //   return product.delete == false;
    // });

    // res.render("productsViews/list", { productsFile: productList, toThousand });

    let pedidoProduct = db.Product.findAll();
    let pedidoDesigns = db.Design.findAll();
    let pedidoSizes = db.Size.findAll();
    let pedidoSubcategories = db.Subcategory.findAll();
  
    Promise.all([pedidoProduct, pedidoDesigns, pedidoSizes, pedidoSubcategories])
    .then(function([product, design, size, subcategory]){
            // console.log([product, design, size, subcategory])
            res.send("productsViews/list", {product:product, design:design, size:size, subcategory:subcategory })
    })
    


  },
  listProductsUs: function (req, res, next) {
    /*console.log({avatar: req.files[0].filename,
         ...req.body });*/

    let lectura = leerJSON();

    var productList = lectura.filter(function (product) {
      return product.delete == false;
    });

    res.render("productsViews/listProductsUs", {
      productsFile: productList,
      toThousand,
    });
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

      .then(function (products) {
        //  res.send(products[1].designs.design)
        if (products) {
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
    // res.send('ruta')
    // PROBARLO BUSCANDO POR SUBCATEGORIA?
    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    db.Product.findAll({
      where: { name: "Barbijo" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        //  res.send(products[1].designs.design)
        if (products) {
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
    // res.send('ruta')
    // PROBARLO BUSCANDO POR SUBCATEGORIA?
    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    db.Product.findAll({
      where: { name: "Gorra" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products )
        if (products !== []) {
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
    // res.send('ruta')
    // PROBARLO BUSCANDO POR SUBCATEGORIA?
    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    db.Product.findAll({
      where: { name: "Taza" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products )
        if (products !== []) {
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
    // res.send('ruta')
    // PROBARLO BUSCANDO POR SUBCATEGORIA?
    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    db.Product.findAll({
      where: { name: "Termo" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products )
        if (products !== []) {
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
    // res.send('ruta')
    // PROBARLO BUSCANDO POR SUBCATEGORIA?
    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    db.Product.findAll({
      where: { name: "Botella" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products )
        if (products !== []) {
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
    // res.send('ruta')
    // PROBARLO BUSCANDO POR SUBCATEGORIA?
    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    db.Product.findAll({
      where: { name: "Bolso" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products )
        if (products !== []) {
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
    // res.send('ruta')
    // PROBARLO BUSCANDO POR SUBCATEGORIA?
    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    db.Product.findAll({
      where: { name: "Cartuchera" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products )
        if (products !== []) {
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
    // res.send('ruta')
    // PROBARLO BUSCANDO POR SUBCATEGORIA?
    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    db.Product.findAll({
      where: { name: "Mochila" },
      include: [{ association: "designs" }],
      raw: true,
      nest: true,
    })

      .then(function (products) {
        // console.log(products )
        if (products !== []) {
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
}; //cierre general
module.exports = productController;
