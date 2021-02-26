module.exports= function(sequelize,dataTypes){
    let Cart_Product= sequelize.define("Cart_Product",{
        "id":{
            "type":dataTypes.INTEGER,
            "autoIncrement":true,
            "primaryKey":true
        },
        "cart_id":{
            "type":dataTypes.INTEGER,
            "allowNull":false
         },
         "product_id":{
            "type":dataTypes.INTEGER,
            "allowNull":false
         },
         "quantity":{
            "type":dataTypes.INTEGER,
            "allowNull":false
         },
         "safeprice":{
             "type":dataTypes.DECIMAL,
             "allowNull":false
         }
     },{
         "tableName":"cart_product",
         "createdAt": "created_at",
         "updatedAt":"updated_at"
     
       })
       Cart_Product.associate = function(models){
        Cart_Product.belongsTo(models.Product,{
            as:"products",
            foreignKey:"product_id"
        })
    }
 
 
    return Cart_Product;
 }