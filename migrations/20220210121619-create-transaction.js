"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userOrder: {
        type: Sequelize.STRING,
        references: {
          model: "UserOrder",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelte: "CASCADE",
      },
      status: {
        type: Sequelize.STRING,
      },
      order: {
        type: Sequelize.STRING,
        references: {
          model: "Order",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelte: "CASCADE",
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
    await queryInterface.dropTable("transactions");
  },
};
