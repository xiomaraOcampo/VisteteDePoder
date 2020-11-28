const fs = require('fs');
//fs.writeFileSync(__dirname + '/../Data/productsFile.json' , []);
function leerJSON() {
  return JSON.parse(fs.readFileSync(__dirname + '/../Data/usersFile.json', { encoding: "utf-8" }));
}
let usersFile = leerJSON();


let userController = {

  registro: function (req, res, next) {
    res.render('usersViews/registro');
  },
  storeRegistro: function (req, res, next) {
    //alert("Se ha registrado un usuario");
    usersFile.push(req.body);
    userJson = JSON.stringify(usersFile, null, 2);
    fs.writeFileSync(__dirname + '/../Data/usersFile.json', userJson);

    res.render('home');
  },
  //probar el jueves 26  porque no puedo editar el usuario qu cree//


  ingreso: function (req, res, next) {
    res.render('usersViews/ingreso');
  },
  storeIngreso: function (req, res, next) {
    console.log(req.body.name + " " + req.body.contrasenia);
    for (var i = 0; i < usersFile.length; i++) {
      if (usersFile[i].name == req.body.name && usersFile[i].contrasenia == req.body.contrasenia) {
        res.render('home');
      }
    }
    res.send("usuario invalido");

  },

  //------ver que pasa con el encriptado de la contraseña----
  edit: function (req, res, next) {
    //  res.render('usersViews/edit');


    var idUser = req.params.id;

    var userFound;
    for (var i = 0; i < usersFile.length; i++) {
      if (usersFile[i].id == idUser) {
        userFound = usersFile[i];
        break;
      }
    }
    if (userFound) {
      res.render('usersViews/editU', { userFound });
    } else {
      res.send('No se ha encontrado el usuario con Id: ' + idUser)
      //res.render('usersViews/list', {usersFile}  );
    };
  },

  /*update: function(req, res, next) {
    res.send('update funcionando');
  }*/

  update: function (req, res, next) {
    var idUser = req.params.id;
    var userFound = [];

    for (var i = 0; i < usersFile.length; i++) {
      if (usersFile[i].id == idUser) {

        let editUser = {
          id: idUser,
          ...req.body,
          delete: false
        };
        //editUser.id = idUser;

        userFound.push(editUser);

      } else {
        userFound.push(usersFile[i]);
      }

    }
    editUserJson = JSON.stringify(userFound, null, 2);
    fs.writeFileSync(__dirname + '/../Data/usersFile.json', editUserJson);
    res.send("Modificaste el usuario " + req.body.nombre);
    //res.render('productsViews/list', {productsFile, toThousand}  );
    //res.redirect('/products/list');
  },

  destroy: {function(req, res, next){
    var idUser = req.params.id;
    var userDeleteTrue = usersFile.map(function(user){
      if(user.id ==idUser){
        user.detele=true;
      }
      return user;
    });
    userDestroyJson = JSON.stringify(userDeleteTrue, null, 2);
    fs.writeFileSync(__dirname + "/../Data/usersFile.json", userDestroyJson);
    res.send("sisiisii");
  }
    
  }
  
  ,
  list: {
  
  }

};//cierre controller

module.exports = userController;