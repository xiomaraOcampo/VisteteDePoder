module.exports = function (sequelize, dataTypes) {
    let Cart = sequelize.define("Cart", {
        "id": {
            "type": dataTypes.INTEGER,
            "autoIncrement": true,
            "primaryKey": true
        },
        "user_id": {
            "type": dataTypes.INTEGER,
            "allowNull": false

        },
        "status": {
            "type": dataTypes.STRING(255),
            "allowNull": false
        }
    }, {
        "tableName": "Carts",
        "createdAt": "created_at",
        "updatedAt": "updated_at"

    })
     // FUNCION PARA ASOCIAR DE MUCHOS A UNO
    Cart.associate = function (models) {
        Cart.belongsTo(models.User, {
            as: "users",
            foreignKey: "User_id"
        })
    };

    // FUNCION PARA ASOCIAR DE MUCHOS A MUCHOS SIN TABLA INTERMEDIA 
    Cart.associate = function (models) {
        Cart.belongsToMany(models.Product, {
            as: "products",
            through: "cart_product",
            foreignKey: "cart_id",
            otherKey: "product_id",
            timestamps: false
        })
    }
    //asociacion tabla intermedia
   /*  Cart.associate = function(models){
        Cart.hasMany(models.Cart_Product,{
            as:"cart_product",
            foreignKey:"cart_id"
        })
    } */
    return Cart;
}
