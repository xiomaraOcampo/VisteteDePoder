// ESQUEMA PARA CUALQUIER ARCHIVO DE MODELO
// todos los modelos deben hacer un module.exports de una funcion
//parametro sequelize es la coneccion con la base de datos
// parametro dataTypes, es el tipo de datos con el que vamos a trabajar
module.exports = (sequelize, dataTypes) => {
    // nombre del archivo del modelo en plural
    let alias = "Designs";
    // especificar las columnas de la base de datos en un objeto literal
    // no es necesario poner todas las columnas de la tabla, pero si las que queremos tener disponibles
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

    return Designs;
}