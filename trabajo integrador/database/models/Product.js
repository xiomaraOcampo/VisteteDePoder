
module.exports = (sequelize, dataTypes) => {
  
    let alias = "Product";
   
    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        name:{
            type:dataTypes.STRING(255)

        },
        price:{
            type:dataTypes.DECIMAL

        },
        description:{
            type:dataTypes.STRING(255)

        },
        image:{
            type:dataTypes.STRING(255)
        },
        subcategory_id:{
            type:dataTypes.INTEGER
        }
    };
    
    let config = {
        tableName:"products",
        timestamps:false
       };
   
    const Product = sequelize.define(alias, cols, config);

      // TIENE MUCHOS DISEÑOS EN LA TABLA INTERMEDIA
    //  ASOCIACION A LA TABLA INETERMEDIA
    Product.associate = function(models){
        Product.hasMany(models.Design_Product,{
            as:"design_product",
            foreignKey:"product_id"
        })
    }

    // FUNCION PARA ASOCIAR DE MUCHOS A MUCHOS SIN TABLA INTERMEDIA
    Product.associate = function(models){
        Product.belongsToMany(models.Design,{
            as:"designs",
            through:"design_product",
            foreignKey:"product_id",
            otherKey:"design_id",
            timestamps:false
        })
    }
    return Product;
}