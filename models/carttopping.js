"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartTopping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartTopping.belongsTo(models.Cart, {
        as: "cart",
        foreignKey: {
          name: "cartId",
        },
      });

      CartTopping.belongsTo(models.topping, {
        as: "topping",
        foreignKey: {
          name: "toppingId",
        },
      });
    }
  }
  CartTopping.init(
    {
      cartId: DataTypes.INTEGER,
      toppingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CartTopping",
    }
  );
  return CartTopping;
};
