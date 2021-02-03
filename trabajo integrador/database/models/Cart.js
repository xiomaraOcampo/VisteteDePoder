module.exports= function(sequelize,dataTypes){
    let Cart= sequelize.define("Cart",{
        "id":{
            "type":dataTypes.INTEGER,
            "autoIncrement":true,
            "primaryKey":true
        },
        "user_id":{
            "type":dataTypes.INTEGER,
            "allowNull":false
            
         },
         "status":{
             "type":dataTypes.STRING(255),
             "allowNull":false
         }
     },{
         "tableName":"Carts",
         "createdAt": "created_at",
         "updatedAt":"updated_at"
     
       })
 
    return Cart;
 }
       