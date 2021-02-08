
module.exports = (sequelize, dataTypes) => {
  
    let alias = "Product_Size";
   
    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        size_id:{
            type:dataTypes.INTEGER,
        },
        product_id:{
            type:dataTypes.INTEGER,
        },
        
    };
    
    let config = {
        tableName:"product_size",
        timestamps:false
       };
   
    const Product_Size = sequelize.define(alias, cols, config);


    // ver como es la relacion de uno a mucho hacia producto y design
    Product_Size.associate = function(models){
        Product_Size.belongsToMany(models.Size,{
            as:"design",
            through:"product_size",
            foreignKey:"product_id",
            otherKey:"size_id",
            timestamps:false
        })
    }

    // MUCHOS PERTENECE A UN SIZE
    Product_Size.associate = function(models){
        Product_Size.belongsTo(models.Size,{
            as:"sizes",
            foreignKey:"size_id"
        })
    }

    // // MUCHOS PERTENECE A UN PRODUCTO
    Product_Size.associate = function(models){
        Product_Size.belongsTo(models.Product,{
            as:"products",
            foreignKey:"product_id"
        })
    }
    

    return Product_Size;
}