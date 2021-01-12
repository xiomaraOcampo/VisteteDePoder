
module.exports = (sequelize, dataTypes) => {
  
    let alias = "Design_Product";
   
    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        design_id:{
            type:dataTypes.INTEGER,
        },
        product_id:{
            type:dataTypes.INTEGER,
        },
        
    };
    
    let config = {
        tableName:"design_product",
        timestamps:false
       };
   
    const Design_Product = sequelize.define(alias, cols, config);


    // ver como es la relacion de uno a mucho hacia producto y design
    // Design_Product.associate = function(models){
    //     Design_Product.belongsToMany(models.Design,{
    //         as:"design",
    //         through:"design_product",
    //         foreignKey:"product_id",
    //         otherKey:"design_id",
    //         timestamps:false
    //     })
    // }

    // MUCHOS PERTENECE A UN DISEÑO
    Design_Product.associate = function(models){
        Design_Product.belongsTo(models.Design,{
            as:"designs",
            foreignKey:"design_id"
        })
    }

    // MUCHOS PERTENECE A UN PRODUCTO
    Design_Product.associate = function(models){
        Design_Product.belongsTo(models.Product,{
            as:"products",
            foreignKey:"product_id"
        })
    }

    return Design_Product;
}