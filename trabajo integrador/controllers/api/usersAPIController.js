
const db = require("../../database/models");


let usersAPIController = {
  

list: function (req, res, next) {
    db.User.findAll()
    .then(function (respuesta) {
      // res.render('usersViews/uList', { usersFile: result});
      let respuesta=usuarios;
      return res.json(respuesta);
    })

    // .catch(function (error) {
    //   console.log(error)
    //   res.send("Error")
    // });
  
}

};//cierre controller

module.exports = usersAPIController;