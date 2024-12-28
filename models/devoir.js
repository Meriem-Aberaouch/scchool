'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Devoir extends Model {
    static associate(models) {
      // in index.js
    }
  }
  Devoir.init(
    {
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La description du devoir est obligatoire."
          }
        }
      },
      matiere: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La matière du devoir est obligatoire."
          }
        }
      },
      dateLimite: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Devoir',
      tableName: 'Devoirs',
      timestamps: true
    }
  );
  return Devoir;
};
