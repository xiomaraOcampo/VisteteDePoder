function guestMiddleware(req, rest, next) {
    if (req.session.usuarioIngresado == undefined) {
        next();
    } else {
        res.send('Esta pagina es solo para invitados');


    }
}
module.exports = guestMiddleware;