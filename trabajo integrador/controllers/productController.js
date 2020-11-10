let productController = {

    producto: function(req, res, next) {
        res.render('productsViews/producto');
      }, 
      //esta función es para el formulario de creación de productos// 
    
    create: function(req, res, next) {
      res.render('productsViews/create');
    }, 
    store: function(req, res, next) {
      res.send('productooo');
    }, 
  
    }
      module.exports=productController;

    