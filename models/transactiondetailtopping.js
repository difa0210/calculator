"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transactionDetailTopping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactionDetailTopping.belongsTo(models.transactionDetail, {
        as: "transactionDetail",
        foreignKey: {
          name: "transactionDetailId",
        },
      });
      transactionDetailTopping.belongsTo(models.topping, {
        as: "topping",
        foreignKey: {
          name: "toppingId",
        },
      });
    }
  }
  transactionDetailTopping.init(
    {
      transactionDetailId: DataTypes.INTEGER,
      toppingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transactionDetailTopping",
    }
  );
  return transactionDetailTopping;
};
