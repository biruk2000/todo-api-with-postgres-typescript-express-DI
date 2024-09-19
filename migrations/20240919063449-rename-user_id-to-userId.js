'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Todos', 'user_id', 'userId');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Todos', 'userId', 'user_id');
  }
};
