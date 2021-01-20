module.exports = function (sequelize, dataType){
     
    let alias = "Category";

    let cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        category: {
            type: dataType.STRING
        }
    };
    let config = {
        tableName: "categories",
        timestamps: false
    };

    let Category = sequelize.define(alias, cols, config);

    Category.associate = function(models){
        Category.hasMany(models.Subcategory, {
            as: "categorias",
            foreignKey: "category_id"
        })};

    
    return Category;
    
}