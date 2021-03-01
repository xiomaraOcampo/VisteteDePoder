let db = require("../database/models");
const Cart_Product = require("../database/models/Cart_Product");
let carritoUsuario = null;
let productos = null;
let currentUser = null;

const carritoController = {

  carrito2: function (req, res, next) {
    res.render('carritoViews/carrito2');

  },
  //   // CRUD  de carrito

  cargaCarrito: function (req, res, next) {
    //cargar productos desde la base
    currentUser = req.session.usuarioIngresado;
    
      
       
    //cargar carrito sin finalizar,que este abierto
        db.Cart.findOne({
          // include: [{association: 'products'}],
          raw: true,
          nest: true,
          where: {
            status: "open",
            User_id: currentUser.id
          }
        }).then(function (carrito) {
          
          db.Cart_Product.findAll({
            where: {
              cart_id: carrito.id
            },
            include: [{association: 'products'}]
          }).then(function (products){
           products.map(function (producto){
             console.log(producto.products);
           })
           
            res.render('carritoViews/cart', { products: products, carrito: carritoUsuario, usuarioAIngresar: currentUser});

          })
          })


          
          /* carritoUsuario = carrito;
          if (carritoUsuario == undefined) {
            carritoUsuario = db.Cart.create({
              "User_id": req.session.usuarioIngresado.id,
              "status": "open"
            }); 
          }*/

<<<<<<< HEAD
          res.render('carritoViews/cart', { products: products, carrito: carritoUsuario, currentUser:usuarioAIngresar });
        })
          .catch(function (error) {
=======
         
    
          /* .catch(function (error) {
>>>>>>> e5a5cc1a73cee0b7394ad630f53a5bdfe1db3e46
            console.log(error);
            res.send("error"); 
          }); */

  },

  agregarProducto: function (req, res, next) {
    // si existe un carrito abierto,agregarle producto
    console.log("prodid ");
    console.log(req.params);
    db.Cart_Product.findOne({
      where: {
        cart_id: carritoUsuario.id,
        product_id: req.params.id
      }
    }).then(function (cartProduct) {
      console.log(cartProduct);
      if (cartProduct == undefined) {
        db.Cart_Product.create({
          cart_id: carritoUsuario.id,
          product_id: req.params.id,
          quantity: 1,
          safeprice: 0
        })
      } else {
        db.Cart_Product.update({
          quantity: cartProduct.quantity + 1
        }, {
          where: {
            id: cartProduct.id
          }
        })
      }

      res.render('carritoViews/cart', { products: productos, carrito: carritoUsuario, usuarioAIngresar:currentUser });

    });

  },
  vaciarCarrito: function (req, res, next) {
    // eliminar productos carrito
    res.render('carritoViews/cart');

  }

}


module.exports = carritoController;
