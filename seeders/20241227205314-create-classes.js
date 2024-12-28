'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Classes', [
      {
        nom: 'Mathématiques - 6e',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Physique - Terminale',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Classes', null, {});
  }
};
