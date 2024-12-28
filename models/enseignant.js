'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enseignant extends Model {
    static associate(models) {
      // in index.js
    }
  }
  Enseignant.init(
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le nom de l'enseignant est obligatoire."
          }
        }
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le prénom de l'enseignant est obligatoire."
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
      modelName: 'Enseignant',
      tableName: 'Enseignants',
      timestamps: true
    }
  );
  return Enseignant;
};
