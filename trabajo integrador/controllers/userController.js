const fs = require ('fs');
//fs.writeFileSync(__dirname + '/../Data/productsFile.json' , []);
function leerJSON(){
  return  JSON.parse(fs.readFileSync(__dirname + '/../Data/usersFile.json' ,{encoding: "utf-8"}));
}
let usersFile= leerJSON();


let userController = {

    ingreso: function(req, res, next) {
        res.render('usersViews/ingreso');
},
    registro: function(req, res, next) {
        res.render('usersViews/registro');
      },

 //------ver que pasa cpon el encriptado de la contraseña----
    edit: function(req, res, next){
      //  res.render('usersViews/edit');
    
        
        var idUser= req.params.id;
  
        var userFound;
        for (var i=0; i <usersFile.length; i++){
            if(usersFile[i].id == idUser){
              userFound=usersFile[i];
              break; 
            }
          }
       if (userFound){
         res.render('usersViews/editU',{userFound } );  
       }else{
         res.send('No se ha encontrado el usuario con Id: '+ idUser)
         //res.render('usersViews/list', {usersFile}  );
       };
      },
    
    /*update: function(req, res, next) {
      res.send('update funcionando');
    }*/
      
   update: function (req, res, next){
     var idUser= req.params.id;
    
     var userFound =[];
     for (var i=0; i <usersFile.length; i++){
       if(usersFile[i].id == idUser){
       
         let editUser= {avatar: 
           req.body,
           delete: false};
           
         editUser.id = idUser;
         userFound.push(editUser);
         
        }else{
         userFound.push(usersFile[i]);
        }

     }
       editUserJson= JSON.stringify(userFound, null, 2);
       fs.writeFileSync(__dirname + '/../Data/usersFile.json' , editUserJson);
       res.send("Modificaste el usuario " + req.body.nombre);
       //res.render('productsViews/list', {productsFile, toThousand}  );
       //res.redirect('/products/list');

   }

};//cierre controller

module.exports = userController ;