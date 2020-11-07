let userController = {

    ingreso: function(req, res, next) {
        res.render('usersVistas/ingreso');
},
    registro: function(req, res, next) {
        res.render('usersVistas/registro');
      }
};

module.exports = userController ;