
const db = require("../../database/models");


let usersAPIController = {
  

 list: function (req, res, next) {
    db.User.findAll()
    .then(function (usuarios) {
      let respuesta=usuarios;
       res.send(respuesta);
    })
  
  }

};

module.exports = usersAPIController;