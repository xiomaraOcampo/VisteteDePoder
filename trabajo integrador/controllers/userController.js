const fs = require('fs');
//fs.writeFileSync(__dirname + '/../Data/productsFile.json' , []);
function leerJSON() {
  return JSON.parse(fs.readFileSync(__dirname + '/../Data/usersFile.json', { encoding: "utf-8" }));
}
let usersFile = leerJSON();
let { check, validationResult, body } = require('express-validator');
let bcryptjs = require('bcryptjs');


let userController = {

  registro: function (req, res, next) {
    res.render('usersViews/registro');
  },
  storeRegistro: function (req, res, next) {
    //alert("Se ha registrado un usuario");
    let registroUser = {
      id: req.body.id,
      nombre: req.body.nombre,
      email: req.body.email,
      contrasenia: bcryptjs.hashSync(req.body.contrasenia, 10),
      userAvatar: req.files.length>0 ? req.files[0].filename : null,
      delete: false
      //  cambie el ...req para qu no tome laconfimacion contraseña n el jason 
    };

    let errors = validationResult(req);
    if (errors.isEmpty()) {
      usersFile.push(registroUser);
      userJson = JSON.stringify(usersFile, null, 2);
      fs.writeFileSync(__dirname + '/../Data/usersFile.json', userJson);

      res.render('home');
    } else {
      return res.render('usersViews/registro', { errors: errors.errors });
    }
  },



  ingreso: function (req, res, next) {
    res.render('usersViews/ingreso');
  },
  storeIngreso: function (req, res, next) {
    let errors = validationResult(req);
    console.log(errors);
    let usuarioAIngresar;
    if (errors.isEmpty()) {


      /*recorro el array*/

      for (let i = 0; i < usersFile.length; i++) {
        if (usersFile[i].email == req.body.email) {
          if (bcryptjs.compareSync(req.body.contrasenia, usersFile[i].contrasenia)) {
            usuarioAIngresar = usersFile[i];
            break;
          }
        }

      }

      if (usuarioAIngresar == undefined) {
        return res.render('usersViews/ingreso', {
          errors: [
            { msg: 'Credenciales invalidas' }
          ]
        });
      }
      req.session.usuarioIngresado = usuarioAIngresar;
      res.render('home');
 
    } else {
      return res.render('usersViews/ingreso', { errors: errors.errors });
    }
  },

  edit: function (req,res,next) {
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
    var userAEditar = [];
    let errors = validationResult(req);
    console.log(errors);
       //isEmpty= esta vacia
    if (errors.isEmpty()) {
    

    for (var i = 0; i < usersFile.length; i++) {
      if (usersFile[i].id == idUser) {

        let editUser = {
          id: idUser,
          nombre: req.body.nombre,
          email: req.body.email,
          contrasenia: bcryptjs.hashSync(req.body.contrasenia, 10),
          delete: false
        };
        userAEditar.push(editUser);
      } else {
        userAEditar.push(usersFile[i]);
      }
    }
    editUserJson = JSON.stringify(userAEditar, null, 2);
    fs.writeFileSync(__dirname + '/../Data/usersFile.json', editUserJson);
    res.send("Modificaste el usuario " + req.body.nombre);
    //res.render('productsViews/list', {productsFile, toThousand}  );
    //res.redirect('/products/list');
  }else{
    var userFound;
    for (var i = 0; i < usersFile.length; i++) {
      if (usersFile[i].id == idUser) {
        userFound = usersFile[i];
        break;
      }
    }
    console.log(userFound)
    res.render('usersViews/editU', { userFound, errors: errors.errors });
    //me devuelve la vista con errores y el usuario pero ya no me deja editar
    //res.redirect( '/users/edit/' + idUser,{userFound});
    //asi redirecciona pero no manda los errores a la vista
    //res.redirect( '/users/edit/' + idUser,{userFound:userFound, errors: errors.errors});
    //cuando agrego los errores no redirecciona y devuelve este cartel: undefined. Redirecting to /users/edit/1
  
  }
  },

  destroy: function (req, res, next) {

    var idUser = req.params.id;

    var userDeleteTrue = usersFile.map(function (user) {
      if (user.id == idUser) {
        user.delete = true;
      }

      console.log(userDeleteTrue);
      return user;
    });


    userDestroyJson = JSON.stringify(userDeleteTrue, null, 2);
    fs.writeFileSync(__dirname + "/../Data/usersFile.json", userDestroyJson);

    res.send("Eliminaste el Usuario " + idUser);
    // res.redirect('usersViews/ulist');


  },

  list: function (req, res, next) {


    let lectura = leerJSON();

    var userList = lectura.filter(function (user) {
      return user.delete == false;
    });


    res.render('usersViews/uList', { usersFile: userList });
  }

};//cierre controller

module.exports = userController;