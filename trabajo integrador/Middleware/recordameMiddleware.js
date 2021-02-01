const fs = require('fs');
 function leerJSON() {
    return JSON.parse(fs.readFileSync(__dirname + '/../Data/usersFile.json', { encoding: "utf-8" }));
  }
  let usersFile = leerJSON();

function recordameMiddleware(req,res,next){

    if (req.cookies.recordame!=undefined &&
        req.session.usuarioIngresado == undefined){
        for (let i = 0; i < usersFile.length; i++){
            if (usersFile[i].email == req.cookies.recordame){
                usuarioAIngresar = usersFile[i];
                break;
            }
        }
        req.session.usuarioIngresado = usuarioAIngresar;
    }
    next();

} 



module.exports=recordameMiddleware;