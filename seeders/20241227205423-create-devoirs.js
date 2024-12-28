'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Devoirs', [
      {
        description: 'Réaliser les exercices 5 et 6 du chapitre 3',
        matiere: 'Mathématiques',
        dateLimite: '2024-12-10',
        classeId: 1,     // Mathématiques - 6e
        enseignantId: 1, // John Smith (enseignant #1)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Étude des ondes',
        matiere: 'Physique',
        dateLimite: '2024-12-25',
        classeId: 2,     // Physique - Terminale
        enseignantId: 2, // Alice Taylor (enseignant #2)
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Devoirs', null, {});
  }
};
