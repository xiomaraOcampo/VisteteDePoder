module.exports = function (sequelize, dataType){
     
    let alias = "Genre_Product";

    let cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        genre_id: {
            type: dataType.INTEGER,
        },
        
        product_id: {
            type: dataType.INTEGER,
        }
    };
    let config = {
        tableName: "genre_product",
        timestamps: false
    };

    let Genre_Product = sequelize.define(alias, cols, config);

    Genre_Product.associate = function (models) {
        Genre_Product.belongsTo(models.Genre, {
            as: "generos",
            foreignKey: "genre_id"
        }),
        Genre_Product.belongsTo(models.Product,{
            as: "productos",
            foreignKey: "product_id"
    })   
    }

   
    
    return Genre_Product;
    
}