const db = require("../../database/models");
let usersAPIController = {
  
 list: function (req, res, next) {
    db.User.findAll()
    .then(function (users){
      for (let i=0; i<users.length; i++){
        users[i].setDataValue("endpoint", "/api/user/" +users[i].id)
      }
      let respuesta={
        meta:{
          status:200,
          total:users.length,
          url:"/api/users"
        },
        data:users
      };
       res.json(respuesta);
    })
  
  }

};

module.exports = usersAPIController;