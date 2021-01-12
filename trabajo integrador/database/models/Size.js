
module.exports = (sequelize, dataTypes) => {
    
    let alias = "Size";
   
    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        size:{
            type:dataTypes.STRING(255)

        }
    };
   
    let config = {
        tableName:"sizes",
        // timestamps:false
        createdAt: "created_at",
        updatedAt:"updated_at"
    
       };

    const Size = sequelize.define(alias, cols, config);
    
     // TIENE MUCHOS PRODUCTOS EN LA TABLA INTERMEDIA
    //  ASOCIACION A LA TABLA INETERMEDIA
    Size.associate = function(models){
         Size.hasMany(models.Product_Size,{
            as:"product_size",
            foreignKey:"size_id"
        })
    }
    
    // // ASOCIACION CON PRODUCTOS 
     Size.associate = function(models){
         Size.belongsToMany(models.Product,{
            as:"products",
            through:"product_size",
            foreignKey:"size_id",
            otherKey:"product_id",
            timestamps:false
        })
    }
   
    return Size;
}