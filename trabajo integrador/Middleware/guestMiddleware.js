function guestMiddleware(req, res, next) {
    if (req.session.usuarioIngresado == undefined) {
        next();
    } else {
        
        res.render('middlewaresViews/guestView');
        // res.render("/home")
    }


}
module.exports = guestMiddleware;