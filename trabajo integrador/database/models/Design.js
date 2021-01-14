
module.exports = (sequelize, dataTypes) => {
    
    let alias = "Design";
   
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

    const Design = sequelize.define(alias, cols, config);
    
     // TIENE MUCHOS PRODUCTOS EN LA TABLA INTERMEDIA
    //  ASOCIACION A LA TABLA INETERMEDIA
    Design.associate = function(models){
        Design.hasMany(models.Design_Product,{
            as:"design_product",
            foreignKey:"design_id"
        })
    }
    
    // FUNCION PARA ASOCIAR DE MUCHOS A MUCHOS SIN TABLA INTERMEDIA 
    Design.associate = function(models){
        Design.belongsToMany(models.Product,{
            as:"products",
            through:"design_product",
            foreignKey:"design_id",
            otherKey:"product_id",
            timestamps:false
        })
    }
   
    return Design;
}