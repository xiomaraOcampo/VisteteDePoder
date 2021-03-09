const db = require("../../database/models");
let salesAPIController = {
  
 list: function (req, res, next) {
     db.Cart.findAll({
      include: [{ association: "users" },{ association: "products" }],
        where:{
            status:'closed'
        }
    })
     .then(function(carts){

       let totalSales = 0;
      for (let i=0; i < carts.length; i++){
        totalSales += carts[ i ].price

        console.log(totalSales)
      }



      
      let respuesta=
      
      {
        meta:{
          status:200,
          total:carts.length,
          url:"/api/sales"
        },
        data: carts,
        totalSales

      };
       res.json(respuesta);
      
      

     }
     )
      
  
    }

};

module.exports = salesAPIController;