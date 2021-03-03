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
        raw: true,
        nest: true,
        include: [{ association: 'products' }]
      }).then(function (products) {
        items = products.map(function (producto) {
          
          return producto;
        })
        console.log(items);
        res.render('carritoViews/cart', { products: items, carrito: carrito, usuarioAIngresar: currentUser });
      })
    })
  },

  agregarProducto: function (req, res, next) {
    // ENCUENTRO EL CARRITO ABIERTO Y CON USUARIO
    currentUser = req.session.usuarioIngresado;
    db.Cart.findOne({
      raw: true,
      nest: true,
      where: {
        status: "open",
        User_id: currentUser.id
      }
    }).then(function (carrito) {
      carritoUsuario = carrito;
      console.log (carrito)
      if (carritoUsuario == undefined) {
        carritoUsuario = db.Cart.create({
          "User_id": req.session.usuarioIngresado.id,
          "status": "open"
        });
      }

      db.Cart_Product.findOne({
        where: {
          cart_id: carritoUsuario.id,
          product_id: req.params.id
        }
      }).then(function (cartProduct) {
        console.log(cartProduct);
        // si no esta , creame ese producto dentro de ese carrrito
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
          }).then(function() {
            // me muestra todos los productos en la vista
            db.Cart_Product.findAll({
              where: {
                cart_id: carritoUsuario.id,
                status: "open"
                // que el status sea open ponerlo dps
              },
              raw: true,
              nest: true,
              include: [{ association: 'products' }]
            }).then(function (products) {
              items = products.map(function (producto) {
                
                return producto;
              })
              res.render('carritoViews/cart', { products: items, carrito: carrito, usuarioAIngresar: currentUser });
            })
    
          })
        }
      });
    });
  },

   // eliminar productos carrito
  destroy: function (req,res) {
    var cartProductId = req.params.id;
    console.log (cartProductId);
    db.Cart_Product.destroy({
      where:{
      id:cartProductId
    }
    
    });
    res.send("Eliminaste el producto" + cartProductId);
  },
  vaciarCarrito: function (req, res, next) {
    db.Cart_Product.destroy({
      where:{
        cart_id: req.params.id
      }
    });
 
    res.send("Vaciaste el carrito");

  }

}


module.exports = carritoController;
