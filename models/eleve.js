'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Eleve extends Model {
    static associate(models) {
      // in index.js
    }
  }
  Eleve.init(
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le nom de l'élève est obligatoire."
          }
        }
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le prénom de l'élève est obligatoire."
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Cet email est déjà utilisé.'
        },
        validate: {
          isEmail: {
            msg: "L'email n'est pas valide."
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Eleve',
      tableName: 'Eleves',
      timestamps: true
    }
  );
  return Eleve;
};
