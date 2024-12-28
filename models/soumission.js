'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Soumission extends Model {
    static associate(models) {
      // in index.js
    }
  }
  Soumission.init(
    {
      dateSoumission: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      reponse: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      note: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
          max: 20
        }
      }
    },
    {
      sequelize,
      modelName: 'Soumission',
      tableName: 'Soumissions',
      timestamps: true
    }
  );
  return Soumission;
};
