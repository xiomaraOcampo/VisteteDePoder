module.exports = function (sequelize, dataTypes) {
    let Cart = sequelize.define("Cart", {
        "id": {
            "type": dataTypes.INTEGER,
            "autoIncrement": true,
            "primaryKey": true
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
    
        Cart.belongsToMany(models.Product, {
            as: "products",
            through: "Cart_Product",
            foreignKey: "cart_id",
            otherKey: "product_id",
            timestamps: false
        })
       
          

    }
    return Cart;
}
