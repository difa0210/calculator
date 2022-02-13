"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactionDetail.belongsTo(models.transaction, {
        as: "transaction",
        foreignKey: {
          name: "transactionId",
        },
      });
      transactionDetail.belongsTo(models.product, {
        as: "product",
        foreignKey: {
          name: "productId",
        },
      });
      transactionDetail.hasMany(models.transactionDetailTopping, {
        as: "transactionDetailTopping",
        foreignKey: {
          name: "transactionDetailId",
        },
      });
    }
  }
  transactionDetail.init(
    {
      transactionId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transactionDetail",
    }
  );
  return transactionDetail;
};
