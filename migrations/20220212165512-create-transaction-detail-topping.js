"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactionDetailToppings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      transactionDetailId: {
        type: Sequelize.INTEGER,
        references: {
          model: "transactionDetails",
          key: "id",
        },
        // onUpdate: "CASCADE",
        // onDelete: "CASCADE",
      },
      toppingId: {
        type: Sequelize.INTEGER,
        references: {
          model: "toppings",
          key: "id",
        },
        // onUpdate: "CASCADE",
        // onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transactionDetailToppings");
  },
};
