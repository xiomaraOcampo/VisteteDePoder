function adminMiddleware(req,res,next){
    if (req.session.usuarioIngresado != undefined &&req.session.usuarioIngresado.type==1){
        next();
     }else{
         res.send('Esta pagina es solo para administradores');

    
    }
}
module.exports=adminMiddleware;