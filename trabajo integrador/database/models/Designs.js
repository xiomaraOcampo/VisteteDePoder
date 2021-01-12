
module.exports = (sequelize, dataTypes) => {
    
    let alias = "Designs";
   
    let cols = {
        id:{
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        design:{
            type:dataTypes.STRING(255)

        }
    };
   
    let config = {
        tableName:"designs",
        timestamps:false
       };

    const Designs = sequelize.define(alias, cols, config);

    // Designs.associate = function(models){
    //     Designs.hasMany(models.Design_Product,{
    //         as:"design_product",
    //         foreignKey:"designs_id"
    //     })
    // }

    /*Designs.associate = function(models){
        Designs.belongsToMany(models.Products,{
            as:"products",
            through:"design_product",
            foreignKey:"design_id",
            otherKey:"product_id",
            timestamps:false
        })
    }*/

    return Designs;
}