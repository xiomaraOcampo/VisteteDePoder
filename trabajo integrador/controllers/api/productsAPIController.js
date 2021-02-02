
const db = require("../../database/models");


let productsAPIController = {
  
 list: function (req, res, next) {
    db.Product.findAll()
    .then(function (products){ 

      for (let i=0; i< products.length; i++){
        products[i].setDataValue("endpoint", "/api/user/" + products[i].id)
      }
      let respuesta={
        meta:{
          status:200,
          total: products.length,
          url:"/api/products"
        },
        data:products
      };
       res.json(respuesta);
    })
    // res.send('api products')
  },
  find: function (req, res, next) {
   
    // INCORPORAR LAS ASOCIACIONES DE CATEGORIA Y SUBCATEGIRIA
    db.Product.findByPk(req.params.id, {
     include: [{ association: "designs" }, { association: "sizes" },{ association: "subcat" }],
     raw: true,
     nest: true,
   })
     .then(function (product) {
       if (product) {
        let respuesta={
          meta:{
            status:200,
            url:"/api/products/"+ product.id
          },
          data:product
        };
         res.json(respuesta);
    
       } else {
        return res.send('producto no encontrado')
        //  return res.render("productsViews/mensajeNoEncontrado");
       }
     })
     .catch(function (error) {
       console.log(error);
       res.send("Error");
     });
   }

};//cierre controller

module.exports = productsAPIController;