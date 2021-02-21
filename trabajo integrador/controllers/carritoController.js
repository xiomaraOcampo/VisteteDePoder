let db = require("../database/models");
const Cart_Product = require("../database/models/Cart_Product");
let carritoUsuario = null;
let productos=null;


const carritoController = {

  carrito2: function (req, res, next) {
    res.render('carritoViews/carrito2');

  },
  //   // CRUD  de carrito

  cargaCarrito: function (req, res, next) {
    //cargar productos desde la base
    db.Product.findAll()
      .then(function (products) {
        productos=products
        //cargar carrito sin finalizar,que este abierto
        let currentUser = req.session.usuarioIngresado;
        db.Cart.findOne({
          where: {
            status: "open",
            User_id: currentUser.id
          }
        }).then(function (carrito) {
          console.log(carrito);
          carritoUsuario = carrito;
          if (carritoUsuario == undefined) {
            carritoUsuario = db.Cart.create({
              "user_id": req.session.usuarioIngresado.id,
              "status": "open"
            });
          }

          res.render('carritoViews/cart', { products: products, carrito: carritoUsuario });
        })
          .catch(function (error) {
            console.log(error);
            res.send("error");
          });

      }).catch(function (error) {
        console.log(error);
        res.send("Error");
      });

  },

  agregarProducto: function (req, res, next) {
    // si existe un carrito abierto,agregarle producto
    console.log("prodid "); 
    console.log(req.body);
    console.log(req.params);
    db.Cart_Product.findOne({
      where: {
        cart_id: carritoUsuario.id,
        product_id: req.body.productid
      }
    }).then(function (cartProduct) {
      console.log(cartProduct);
      if (cartProduct == undefined) {
        db.Cart_Product.create({
          cart_id: carritoUsuario.id,
          product_id: req.body.productid,
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

      res.render('carritoViews/cart', { products: productos, carrito: carritoUsuario });

    });


    //si no existe un carrito abierto, crear uno para ese usuario y luego agregar el producto

  },
  vaciarCarrito: function (req, res, next) {
    // eliminar productos carrito
    res.render('carritoViews/cart');

  }

}

module.exports = carritoController;
