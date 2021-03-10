const fs = require('fs');
//fs.writeFileSync(__dirname + '/../Data/productsFile.json' , []);
function leerJSON() {
  return JSON.parse(fs.readFileSync(__dirname + '/../Data/usersFile.json', { encoding: "utf-8" }));
}
let usersFile = leerJSON();
let { check, validationResult, body } = require('express-validator');
let bcryptjs = require('bcryptjs');
const db = require("../database/models");


let userController = {
  index: function (req, res) {
    db.User.findAll().then(function (result) {
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
      //  cambie el ...req para qu no tome laconfimacion contraseña n el jason 
    };
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      /*  usersFile.push(registroUser);
       db.User
  */
      /* userJson = JSON.stringify(usersFile, null, 2);
      fs.writeFileSync(__dirname + '/../Data/usersFile.json', userJson); */
      db.User.create({
        "name": registroUser.nombre,
        "email":registroUser.email,
        "password": registroUser.contrasenia,
        "image": registroUser.userAvatar,
        "type": 0
      });
      res.render('home');
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
      .then((resultado)=>{
        console.log(resultado);
        if (bcryptjs.compareSync(req.body.contrasenia, resultado.getDataValue('password'))) {
          usuarioAIngresar = {
            id:resultado.getDataValue('id'), 
            name:resultado.getDataValue('name'), 
            email: resultado.getDataValue('email'),
            image:resultado.getDataValue('image'),
            type: resultado.getDataValue('type')
          };
          
        }
        // .then((resultado)=>{
          
        // if(bcryptjs.compareSync(req.body.contrasenia, usuarioAIngresar.password)){
        // console.log(resultado)
        //   ;
        // }
        if (usuarioAIngresar == undefined ) {
          return res.render('usersViews/ingreso', {
            errors: [
              { msg: 'Credenciales invalidas' }
            ]
          });
        }
        req.session.usuarioIngresado = usuarioAIngresar;
        
        if (req.body.recordame != undefined) {
          res.cookie('recordame',
            usuarioAIngresar.email, { maxAge: 180000 })
        }
        // res.send(usuarioAIngresar.email)
        // res.render("usersViews/detailUser", {usuarioAIngresar:usuarioAIngresar})
        
        if(req.session.usuarioIngresado.type==1){
          res.render('usersViews/perfilAdm', {usuarioAIngresar:usuarioAIngresar});
        }else{
          res.render('usersViews/perfil', {usuarioAIngresar:usuarioAIngresar});

        }
        
        
        
      })

        //xio, por qué no va el .catch???
      // .catch(function(error){
      //   console.log(error)
      // });


      // for (let i = 0; i < usersFile.length; i++) {
      //   if (usersFile[i].email == req.body.email) {
      //     if (bcryptjs.compareSync(req.body.contrasenia, usersFile[i].contrasenia)) {
      //       usuarioAIngresar = usersFile[i];
      //       break;
      //     }
      //   }
      // }

    } else {
      return res.render('usersViews/ingreso', { errors: errors.errors });
    }
  },
  logout: function (req, res, next) {
    req.session.destroy();
    res.render("home");
  },

  edit: function (req, res, next) {
    let usuarioAIngresar;
    //  res.render('usersViews/edit');
    db.User.findByPk(req.params.id)
      .then(function (usuarioAIngresar) {
        if (usuarioAIngresar == undefined){
          res.render("usersViews/mensajeNoEncontrado")
          // res.send('No se ha encontrado el usuario ')
        }else{
          console.log (usuarioAIngresar);
          res.render('usersViews/editU', {usuarioAIngresar});
        }
      });
 /* 
        db.User.findByPk(req.params.id)
      .then(function (user) {
        if (user == undefined){
          res.send('No se ha encontrado el usuario ')
        }else{
          console.log (user);
          res.render('usersViews/editU', { user:user });
        }
      }) */;
  },


  update: function (req, res, next) {
    var idUser = req.params.id;
    let errors = validationResult(req);
    let usuarioAIngresar;
    
    //isEmpty= esta vacia
    if (errors.isEmpty()) {
  
  
  
         
      db.User.update({
        "name": req.body.nombre,
        "email": req.body.email,
        "password":bcryptjs.hashSync(req.body.contrasenia, 10),
        "image": req.body.userAvatar  
      }, {
        where: {
          id: idUser
        }
      })

      .then(function(resultado){
        if (bcryptjs.compareSync(req.body.contrasenia, resultado.getDataValue('password'))) {
          usuarioAIngresar = {
            id:resultado.getDataValue('id'), 
            name:resultado.getDataValue('name'), 
            email: resultado.getDataValue('email'),
            image:resultado.getDataValue('image'),
            type: resultado.getDataValue('type')
          }
        }
        return usuarioAIngresar

      })

   
      console.log(usuarioAIngresar)
      // res.send("Modificaste el usuario " + req.body.nombre);
      // res.render('usersViews/perfil', {usuarioAIngresar});
      if(req.session.usuarioIngresado.type==1){
        res.render('usersViews/perfilAdm', {usuarioAIngresar:usuarioAIngresar});
      }else{
        res.render('usersViews/perfil', {usuarioAIngresar:usuarioAIngresar});

      }
      

      
    } else {
      db.User.findByPk(idUser)
      .then(function (user){
        res.render('usersViews/editU', { user, errors: errors.errors });
      });
      
    }
  },

destroy: function (req,res) {
  let usuarioAIngresar;
  var idUser = req.params.id;
  console.log (idUser);
  db.User.destroy({
     where:{
     id:idUser
   }
  
  });
  res.send("Eliminaste el Usuario " + idUser);

  /* var userDeleteTrue = usersFile.map(function (user) {
    if (user.id == idUser) {
      user.delete = true;
    }

    console.log(userDeleteTrue);
    return user;
  }); */


 /*  userDestroyJson = JSON.stringify(userDeleteTrue, null, 2);
  fs.writeFileSync(__dirname + "/../Data/usersFile.json", userDestroyJson); */

  
  // res.redirect('usersViews/ulist');


},

list: function (req, res, next) {
    db.User.findAll().then(function (result) {
      res.render('usersViews/uList', { usersFile: result});
    }).catch(function (error) {
      console.log(error)
      res.send("Error")
    });
  

  // let lectura = leerJSON();

  // var userList = lectura.filter(function (user) {
  //   return user.delete == false;
  // });


  //res.render('usersViews/uList', { usersFile: userList });
},
detail:function(req,res,next){

  var idUser = req.session.usuarioIngresado.id;
  // var idUser = req.params.id;
  let usuarioAIngresar;
   db.User.findByPk(idUser)
    .then(function (usuarioAIngresar){
  //     // console.log(usuarioAIngresar);
      res.render('usersViews/perfil', {usuarioAIngresar:usuarioAIngresar});
    })
    .catch(function (error) {
      console.log(error)
      res.send("Error")
    });
}

};//cierre controller

module.exports = userController;