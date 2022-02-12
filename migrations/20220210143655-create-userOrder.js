"use strict";

const { Model } = require("sequelize/types");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("userOrders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING,
        references: {
          model: "user",
          key: "fullName",
        },
        onUpdate: CASCADE,
        onDelete: CASCADE,
      },
      location: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        references: {
          model: "user",
          key: "email",
        },
        onUpdate: CASCADE,
        onDelete: CASCADE,
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
    await queryInterface.dropTable("userOrders");
  },
};
