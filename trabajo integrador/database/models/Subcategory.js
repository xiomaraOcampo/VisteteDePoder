module.exports = function (sequelize, dataType){
     
    let alias = "Subcategory";

    let cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        subcategory: {
            type: dataType.STRING
        },
        category_id: {
            type: dataType.INTEGER
        },
       

    };
    let config = {
        tableName: "subcategories",
        timestamps: false
    };

    let Subcategory = sequelize.define(alias, cols, config);

    
    Subcategory.associate = function(models){
        Subcategory.hasMany(models.Product, {
            as: "subcat",
            foreignKey: "subcategory_id"
        })};

    

    
    

    return Subcategory;
    
}