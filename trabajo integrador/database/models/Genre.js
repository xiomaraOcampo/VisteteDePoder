module.exports = function (sequelize, dataType){
     
    let alias = "Genre";

    let cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        genre: {
            type: dataType.STRING
        }
    };
    let config = {
        tableName: "genres",
        timestamps: false
    };

    let Genre = sequelize.define(alias, cols, config);

    
    Genre.associate = function(models){
        Genre.hasMany(models.Genre_Product, {
            as: "genres",
            foreignKey: "genre_id"
        });
    }
    
    return Genre;
    
}