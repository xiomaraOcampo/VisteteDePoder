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

       // MUCHOS PERTENECE A UN CARRITO
    Cart_Product.associate = function(models){
        Cart_Product.belongsTo(models.Cart,{
            as:"carts",
            foreignKey:"cart_id"
        })
    }

    // MUCHOS PERTENECE A UN PRODUCTO
    Cart_Product.associate = function(models){
        Cart_Product.belongsTo(models.Product,{
            as:"products",
            foreignKey:"product_id"
        })
    }
 
    return Cart_Product;
 }