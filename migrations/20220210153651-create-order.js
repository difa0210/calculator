"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        references: {
          model: "products",
          key: "title",
        },
        onUpdate: CASCADE,
        onDelete: CASCADE,
      },
      price: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "price",
        },
        onUpdate: CASCADE,
        onDelete: CASCADE,
      },
      image: {
        type: Sequelize.STRING,
        references: {
          model: "products",
          key: "image",
        },
        onUpdate: CASCADE,
        onDelete: CASCADE,
      },
      qty: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "quantity",
        },
        onUpdate: CASCADE,
        onDelete: CASCADE,
      },
      toppings: {
        type: Sequelize.STRING,
        references: {
          model: "topping",
          key: "id",
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
    await queryInterface.dropTable("orders");
  },
};
