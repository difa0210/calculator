"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // TransactionCart.hasMany(models.Cart, {
      //   as: "cart",
      //   foreignKey: {
      //     name: "id",
      //   },
      // });
    }
  }
  TransactionCart.init(
    {
      cartId: DataTypes.STRING,
      total: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      posCode: DataTypes.INTEGER,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TransactionCart",
    }
  );
  return TransactionCart;
};
