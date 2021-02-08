
const db = require('../database/models');

function recordameMiddleware(req, res, next) {
    //next();
    if (req.cookies.recordame != undefined &&
        req.session.usuarioIngresado == undefined) {
        db.User.findAll()
            .then(function (users) {
                for (let i = 0; i < users.length && req.session.usuarioIngresado == undefined; i++) {
                    if (users[i].email == req.cookies.recordame) {
                        req.session.usuarioIngresado = users[i];
                        console.log (users[i])
                    }
                }

                // for (let i = 0; i < usersFile.length; i++){
                //     if (usersFile[i].email == req.cookies.recordame){
                //         usuarioAIngresar = usersFile[i];
                //         break;
                //     }
                // }
                next();
            });
    }
}

module.exports = recordameMiddleware;