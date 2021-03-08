var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var session=require('express-session');
var cors=require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var carritoRouter = require('./routes/carrito');
var carritoRouter3 = require('./routes/carrito3');
var apiUsersRouter = require('./routes/api/users');
var apiProductsRouter = require('./routes/api/products');
var apiSalesRouter = require('./routes/api/sales');
var recordameMiddleware= require('./Middleware/recordameMiddleware');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({secret:'secreto'}));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter);
app.use('/api/sales', apiSalesRouter);
app.use('/carrito', carritoRouter);
app.use('/carrito3', carritoRouter3);
app.use(recordameMiddleware);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(function (req, res, next) {
  if(req.session.usuarioIngresado != undefined){
    res.locals.user = req.session.usuarioIngresado;
  } else{
    res.locals.user = {id:0};
  }
  next();
});


module.exports = app;
