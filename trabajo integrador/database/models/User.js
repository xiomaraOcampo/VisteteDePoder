module.exports= function(sequelize,dataTypes){
   let User= sequelize.define("User",{
       "id":{
           "type":dataTypes.INTEGER,
           "autoIncrement":true,
           "primaryKey":true
       },
       "name":{
           "type":dataTypes.STRING(255),
           "allowNull":false
        },
        "email":{
            "type":dataTypes.STRING(255),
            "allowNull":false
         },
         "password":{
            "type":dataTypes.STRING(255),
            "allowNull":false
         },
         "image":{
            "type":dataTypes.STRING(255),
            "allowNull":true
         },
         "userTypes_id":{
            "type":dataTypes.INTEGER,
            "allowNull":false
         }
    },{
        "tableName":"Users",
        "createdAt": "created_at",
        "updatedAt":"updated_at"
    
      })

   return User;
}
      
    

    
    
    
  