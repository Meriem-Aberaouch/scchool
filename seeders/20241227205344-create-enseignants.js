'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Enseignants', [
      {
        nom: 'Smith',
        prenom: 'John',
        email: 'john.smith@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Taylor',
        prenom: 'Alice',
        email: 'alice.taylor@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Enseignants', null, {});
  }
};
