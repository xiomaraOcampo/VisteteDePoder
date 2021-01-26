const carritoController = {
    cargaCarrito: function(req,res, next){
        res.render('carritoViews/carrito');
    
    },
    carrito2: function(req,res, next){
        res.render('carritoViews/carrito2');
    
    }
}

module.exports = carritoController;
