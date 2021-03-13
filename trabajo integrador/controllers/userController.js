const fs = require('fs');
let { check, validationResult, body } = require('express-validator');
let bcryptjs = require('bcryptjs');
const db = require("../database/models");


let userController = {
  index: function (req, res) {
    db.User.findAll()
      .then(function (result) {
        res.send(result)
      }).catch(function (error) {
        console.log(error)
        res.send("Error")
      })
  },

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
      userAvatar: req.files.length > 0 ? req.files[0].filename : null,
      delete: false

    };
    let errors = validationResult(req);
    if (errors.isEmpty()) {

      db.User.create({
        "name": registroUser.nombre,
        "email": registroUser.email,
        "password": registroUser.contrasenia,
        "image": registroUser.userAvatar,
        "type": 0
      });
      res.render("usersViews/ingreso");
    } else {
      return res.render('usersViews/registro', { errors: errors.errors });
    }

  },


  ingreso: function (req, res, next) {

    res.render("usersViews/ingreso");

  },

  storeIngreso: function (req, res, next) {
    console.log(res.locals.user);
    let errors = validationResult(req);
    console.log(errors);
    let usuarioAIngresar;
    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          email: req.body.email
        }
      })
      .then((resultado) => {
        //si el resultado es ind. o si no coincide con la contrase;a ingresada
        let existe = resultado != undefined;
        if (!existe) {
          return res.render('usersViews/ingreso', {
            errors: [
              { msg: 'No existe el usuario' }
            ]
          });
        }


        console.log(resultado);

        let contraseniaValida = bcryptjs.compareSync(req.body.contrasenia, resultado.getDataValue('password'));
        if (!contraseniaValida) {
          return res.render('usersViews/ingreso', {
            errors: [
              { msg: 'Credenciales invalidas' }
            ]
          });
        }

        console.log(resultado);

        usuarioAIngresar = {
          id: resultado.getDataValue('id'),
          name: resultado.getDataValue('name'),
          email: resultado.getDataValue('email'),
          image: resultado.getDataValue('image'),
          type: resultado.getDataValue('type')
        };
        
        req.session.usuarioIngresado = usuarioAIngresar;

        if (req.body.recordame != undefined) {
          res.cookie('recordame',
            usuarioAIngresar.email, { maxAge: 180000 })
        }

        if (req.session.usuarioIngresado.type == 1) {
          res.render('usersViews/perfilAdm', { usuarioAIngresar: usuarioAIngresar });
        }

        res.render('usersViews/perfil', { usuarioAIngresar: usuarioAIngresar });

      }).catch(function (error) {
        console.log(error)
        res.send("Error")
      });

    } else {
      return res.render('usersViews/ingreso', { errors: errors.errors });
    }
  },

  logout: function (req, res, next) {
    req.session.destroy();
    res.render("home");
  },

  edit: function (req, res, next) {

    db.User.findByPk(req.params.id)
      .then(function (usuarioAIngresar) {

        if (usuarioAIngresar == undefined) {
          res.render("usersViews/mensajeNoEncontrado")

        } else {
          res.render('usersViews/editU', { usuarioAIngresar });
        }
      }).catch(function (error) {
        console.log(error)
        res.send("Error en encontrar al usuario x ruta")
      });

  },


  update: function (req, res, next) {
    var idUser = req.params.id;
    let errors = validationResult(req);
    let usuarioAIngresar;

    if (errors.isEmpty()) {
      db.User.update({
        "name": req.body.nombre,
        "email": req.body.email,
      
      }, {
        where: {
          id: idUser
        }
      }).then(function (resultado) {

        db.User.findByPk(idUser)
        .then(function (usuarioActualizado) {
          req.session.usuarioIngresado = usuarioActualizado;
            if (usuarioActualizado.type == 1) {
              res.render('usersViews/perfilAdm', { usuarioAIngresar: usuarioActualizado });
            } else {
              res.render('usersViews/perfil', { usuarioAIngresar: usuarioActualizado });

            }
          });
        }).catch(function (error) {
          console.log(error)
          res.send("Error en actualizar al usuario")
        });
    } else {
      db.User.findByPk(idUser)
        .then(function (user) {
          usuarioAIngresar=user;
          res.render('usersViews/editU', { usuarioAIngresar: usuarioAIngresar, errors: errors.errors });
        }).catch(function (error) {
          console.log(error)
          res.send("Error")
        });

    }
  },

  destroy: function (req, res) {
    let usuarioAIngresar;
    var idUser = req.params.id;
    console.log(idUser);
    db.User.destroy({
      where: {
        id: idUser
      }

    });
    res.send("Eliminaste el Usuario " + idUser);
  },

  list: function (req, res, next) {
    db.User.findAll()
    .then(function (result) {
      res.render('usersViews/uList', { usersFile: result });
    }).catch(function (error) {
      console.log(error)
      res.send("Error")
    });
  },

  detail: function (req, res, next) {

    var idUser = req.session.usuarioIngresado.id;
    // var idUser = req.params.id;
    let usuarioAIngresar;
    db.User.findByPk(idUser)
      .then(function (usuarioAIngresar) {
        //     // console.log(usuarioAIngresar);

        if (req.session.usuarioIngresado.type == 1) {
         
          res.render('usersViews/perfilAdm', { usuarioAIngresar: usuarioAIngresar });
        } else {
          
          res.render('usersViews/perfil', { usuarioAIngresar: usuarioAIngresar });

        }
      })
      .catch(function (error) {
        console.log(error)
        res.send("Error")
      });
  }

};//cierre controller

module.exports = userController;