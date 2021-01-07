
module.exports = (sequelize, dataTypes) => {
  
    let alias = "Products";
   
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
   
    const Products = sequelize.define(alias, cols, config);
    
    return Products;
}