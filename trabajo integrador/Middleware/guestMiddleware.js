function guestMiddleware(req, res, next) {
    if (req.session.usuarioIngresado == undefined) {
        next();
    } else {
        res.send('Esta pagina es solo para invitados')
        // res.render("/home")
    }


}
module.exports = guestMiddleware;