function adminMiddleware(req,res,next){
    if (req.session.usuarioIngresado != undefined &&req.session.usuarioIngresado.type==1){
        next();
     }else{
         res.render('usersViews/mensajeSoloAdministrador');

    
    }
}
module.exports=adminMiddleware;