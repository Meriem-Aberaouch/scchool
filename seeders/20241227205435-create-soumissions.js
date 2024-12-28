'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Soumissions', [
      {
        devoirId: 1, // The math devoir (ID=1)
        eleveId: 1,  // Jean Dupont (eleveId=1)
        reponse: 'Voici ma réponse aux exercices.',
        dateSoumission: '2024-12-09',
        note: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // We won't create one for Marie Curie => "Non rendu" scenario
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Soumissions', null, {});
  }
};
