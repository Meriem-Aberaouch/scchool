'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Soumissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateSoumission: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      reponse: {
        type: Sequelize.TEXT
      },
      note: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      eleveId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Eleves',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      devoirId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Devoirs',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Soumissions');
  }
};
