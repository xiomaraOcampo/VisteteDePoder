function authMiddleware(req,res,next){
    if (req.session.usuarioIngresado != undefined){
        next();
     }else{

         /* res.send('Esta pagina es solo para usuarios');
         Lo cambie para que renderice al ingreso,ya que es mejor para ahorrar tiempo,xio */
         res.render("usersViews/ingreso")

        // res.redirect("registro")
         ;
    }



}
module.exports=authMiddleware;