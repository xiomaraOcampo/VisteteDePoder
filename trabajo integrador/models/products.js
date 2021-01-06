// ESQUEMA PARA CUALQUIER ARCHIVO DE MODELO
// todos los modelos deben hacer un module.exports de una funcion
//parametro sequelize es la coneccion con la base de datos
// parametro dataTypes, es el tipo de datos con el que vamos a trabajar
module.exports = (sequelize, dataTypes) => {
    // nombre del archivo del modelo en plural
    let alias = "Product";
    // especificar las columnas de la base de datos en un objeto literal
    // no es necesario poner todas las columnas de la tabla, pero si las que queremos tener disponibles
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
    // definir el nombre de la TABLA que vamos a usar
    // sequeleize infiere que el nombre de la tabla es el nombre del archivo en plural, pero en este casoe sta en ingles
    // definirle a sequelize que no tenemos las columnas createdAt/updatedAt
    let config = {
        tableName:"products",
        // timestamps:false
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
       };
    // constante con el nombre dl archivo con los ters parametros ALIAS/COLUMNAS/CONFIGURACION
    const Pelicula = sequelize.define(alias, cols, config);
     
    Pelicula.associate = function(models){
        Pelicula.belongsTo(models.Genero,{
            as:"genero",
            foreignKey:"genre_id"
        })

        Pelicula.belongsToMany(models.Actor,{
            as:"actores",
            through:"actor_movie",
            foreignKey:"movie_id",
            otherKey:"actor_id",
            timestamps:false
        })

    }


   
    return Pelicula;
}