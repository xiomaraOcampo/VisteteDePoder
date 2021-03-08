const db = require("../../database/models");
let salesAPIController = {
  
 list: function (req, res, next) {
     db.Cart.findAll({
        where:{
            status:'closed'
        }
    })
     .then(function(carts){
      let respuesta=
      
      {
        meta:{
          status:200,
          total:carts.length,
          url:"/api/sales"
        },
        data:carts
      };
       res.json(respuesta);
      
      

     }
     )
      
  
    }

};

module.exports = salesAPIController;