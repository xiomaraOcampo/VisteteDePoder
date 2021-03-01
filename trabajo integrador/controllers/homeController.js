const homeController = {  
    home: function(req, res, next) {
      let usuarioAIngresar= req.session.usuarioIngresado;
        res.render('home', {usuarioAIngresar:usuarioAIngresar});
      }
}

module.exports = homeController;
