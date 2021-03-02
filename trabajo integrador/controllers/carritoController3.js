let db = require("../database/models");
// const Cart_Product = require("../database/models/Cart_Product");
let carritoUsuario = null;
let productos = null;
let currentUser = null;

const carritoController = {

  carrito3: function (req, res, next) {
    // res.send('carrito 3');
    return res.render("carritoViews/carrito3");
  },

  agregarProducto3:function (req, res, next) {
    // res.send('agregar producto')
    // CHEQUEO SI EL USUARIO LOGUEADO TIENE UN CARRITO ABIERTO

// let usuarioLogueado = req.session.usuarioIngresado;
 let usuarioLogueado = 8;
 let carritoId;

      db.Cart.findOne({
        where:{
          // user_id:usuarioLogueado.id,
          user_id: usuarioLogueado,
          status: "open"
        }
      })
      .then(function(carrito){
        // res.send(carrito)
         // SI TIENE LO TOMO 
        if(carrito){
          // console.log(carrito.id)
          carritoId = carrito.id
           res.send (" carrito recien creado con carritoId: " + carritoId)
          // SI NO LO TIENE 
        }else{
          // CREO UN CARRITO NUEVO
          db.Cart.create({
            user_id: usuarioLogueado,
            status: "open"
          })
          .then(function(carrito){
            // console.log(carrito.id)
            carritoId = carrito.id
            // res.send ("carritoId: " + carritoId)     
          })
        }
      })  
      .catch(function (error) {
         console.log(error);
         res.send("error"); 
         }); 
  
      //NO ESTOY PUDIENDO DESDE ACA TOMAR EN carritoId
      //  console.log(carritoId)

      // db.Cart_Product.create({
      //   product_id: req.params.id,
      //   cart_id:carritoId,
      //   quantity: 1,
      //   // safeprice:0
      // })


        // this.productos.push(producto)  asociandolo con un producto
        // guardar cantidad
        // guardar el precio actual

        // sera que ahora con el id del carrito puedo guardar el dato en la tabla inetrmedia de carrito producto?
        // como me llega el id del produto? sera por params a traves de la ruta?
  },
     

  cargaCarrito: function (req, res, next) {
    // console.log("hola")  
    // //cargar productos desde la base
    // currentUser = req.session.usuarioIngresado;
    
      
       
    // //cargar carrito sin finalizar,que este abierto
    //     db.Cart.findOne({
    //       // include: [{association: 'products'}],
    //       raw: true,
    //       nest: true,
    //       where: {
    //         status: "open",
    //         User_id: currentUser.id
    //       }
    //     }).then(function (carrito) {
          
    //       db.Cart_Product.findAll({
    //         where: {
    //           cart_id: carrito.id
    //         },
    //         include: [{association: 'products'}]
    //       }).then(function (products){
    //        products.map(function (producto){
    //          console.log(producto.products);
    //        })
           
    //         res.render('carritoViews/cart', { products: products, carrito: carritoUsuario, usuarioAIngresar: currentUser});

    //       })
    //       })


          
    //       /* carritoUsuario = carrito;
    //       if (carritoUsuario == undefined) {
    //         carritoUsuario = db.Cart.create({
    //           "User_id": req.session.usuarioIngresado.id,
    //           "status": "open"
    //         }); 
    //       }*/

    //       res.render('carritoViews/cart', { products: products, carrito: carritoUsuario, currentUser:usuarioAIngresar });
    //     })
    //       .catch(function (error) {
    //         console.log(error);
    //         res.send("error"); 
    //       }); */

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
