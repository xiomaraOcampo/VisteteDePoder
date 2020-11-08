const homeController = {  
    home: function(req, res, next) {
        res.render('homeViews/home');
      }
}

module.exports = homeController;
