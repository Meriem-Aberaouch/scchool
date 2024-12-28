'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Eleves', [
      {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont.eleve@example.com',
        classeId: 1, // references the first class (Mathématiques - 6e)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nom: 'Curie',
        prenom: 'Marie',
        email: 'marie.curie.eleve@example.com',
        classeId: 1, // also Mathématiques - 6e
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Eleves', null, {});
  }
};
