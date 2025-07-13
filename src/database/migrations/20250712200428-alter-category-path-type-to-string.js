'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('categories', 'path', {
      type: Sequelize.STRING,
     
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('categories', 'path', {
      type: Sequelize.INTEGER,
     
    });
  },
};
