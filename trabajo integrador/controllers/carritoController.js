let db = require("../database/models");



const carritoController = {
    
    carrito2: function(req,res, next){
        res.render('carritoViews/carrito2');
    
    },
    // CRUD  de carrito
    cargaCarrito: function(req,res, next){
        //cargar productos desde la base
        db.Product.findAll().then(function (result) {
            res.render('carritoViews/cart', { products: result});
          }).catch(function (error) {
            console.log(error);
            res.send("Error")
          });
        //cargar carrito sin finalizar,que este abierto
       
    
    },
    agregarProducto: function(req,res, next){
        // si existe un carrito abierto,agregarle producto
        //si no existe un carrito abierto, crear uno para ese usuario y luego agregar el producto
        res.render('carritoViews/cart');
    
    },
    vaciarCarrito: function(req,res, next){
        // eliminar productos carrito
        res.render('carritoViews/cart');
    
    }
       
}

module.exports = carritoController;
