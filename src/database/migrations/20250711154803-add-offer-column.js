"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("products", "offer", {
      type: Sequelize.STRING,
      defaultValue: false,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("products", "offer");
  },
};
