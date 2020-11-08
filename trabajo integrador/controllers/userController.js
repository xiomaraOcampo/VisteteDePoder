let userController = {

    ingreso: function(req, res, next) {
        res.render('usersViews/ingreso');
},
    registro: function(req, res, next) {
        res.render('usersViews/registro');
      }
};

module.exports = userController ;