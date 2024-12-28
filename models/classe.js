'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Classe extends Model {
    static associate(models) {
      // We define associations in index.js for clarity
    }
  }
  Classe.init(
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le nom de la classe est obligatoire."
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Classe',
      tableName: 'Classes',
      timestamps: true
    }
  );
  return Classe;
};
