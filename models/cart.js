"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });

      Cart.belongsTo(models.product, {
        as: "product",
        foreignKey: {
          name: "productId",
        },
      });

      Cart.hasMany(models.CartTopping, {
        as: "carttopping",
        foreignKey: {
          name: "cartId",
        },
      });
    }
  }
  Cart.init(
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
