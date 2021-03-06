let db = require("../database/models");
const Cart_Product = require("../database/models/Cart_Product");
let carritoUsuario = null;
let currentUser = null;

function agregarProductoACarrito(productoId, res) {
  db.Cart_Product.findOne({
    where: {
      cart_id: carritoUsuario.id,
      product_id: productoId
    }
  }).then(function (cartProduct) {
    console.log(cartProduct);
    // si no esta , creame ese producto dentro de ese carrrito
    if (cartProduct == undefined) {
      db.Cart_Product.create({
        cart_id: carritoUsuario.id,
        product_id: productoId,
        quantity: 1,
        safeprice: 0
      }).then(function() {
        res.redirect("/carrito" );
      }).catch(function (error) {
        console.log(error)
        res.send("Error crear Producto")
      });
    } else {
      db.Cart_Product.update({
        quantity: cartProduct.quantity + 1
      }, {
        where: {
          id: cartProduct.id
        }
      }).then(function() {
        res.redirect("/carrito" );
      }).catch(function (error) {
        console.log(error)
        res.send("Error agregar Producto")
      });
    }
  }).catch(function (error) {
    console.log(error)
    res.send("Error Carrito")
  });
}

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
      }).catch(function (error) {
        console.log(error)
        res.send("Error")
      });
    }).catch(function (error) {
      console.log(error)
      res.send("Error")
    });
  },

  agregarProducto: function (req, res, next) {
    // ENCUENTRO EL CARRITO ABIERTO Y CON USUARIO
    currentUser = req.session.usuarioIngresado;
    let prod_id = req.params.id;
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
        db.Cart.create({
          "User_id": req.session.usuarioIngresado.id,
          "status": "open"
        })
        .then(function (newCart) {
          carritoUsuario = newCart;
          agregarProductoACarrito(prod_id, res);
        });
      }

      agregarProductoACarrito(prod_id, res);
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
   // res.send("Eliminaste el producto" + cartProductId);
    res.redirect("/carrito" );
  },
  vaciarCarrito: function (req, res, next) {
    db.Cart_Product.destroy({
      where:{
        cart_id: req.params.id
      }
    });
 
    //res.send("Vaciaste el carrito");
    res.redirect("/carrito" );

  },
  finalizarCompra: function (req, res, next) {
    db.Cart.update({
      
        status: "closed"
    },{
      where:{
        id: carritoUsuario.id
      }
    });
 
   res.send("finalizaste compra");
   // res.redirect("/carrito" );

  }

}

module.exports = carritoController;
