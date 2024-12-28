'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// ***ALL ASSOCIATIONS DEFINED HERE***
db.Classe.hasMany(db.Eleve, {
  foreignKey: 'classeId',
  as: 'eleves',
  onDelete: 'CASCADE'
});
db.Eleve.belongsTo(db.Classe, {
  foreignKey: 'classeId',
  as: 'classe'
});

db.Enseignant.hasMany(db.Devoir, {
  foreignKey: 'enseignantId',
  as: 'devoirs',
  onDelete: 'CASCADE'
});
db.Devoir.belongsTo(db.Enseignant, {
  foreignKey: 'enseignantId',
  as: 'enseignant'
});

db.Classe.hasMany(db.Devoir, {
  foreignKey: 'classeId',
  as: 'devoirsClasse',
  onDelete: 'CASCADE'
});
db.Devoir.belongsTo(db.Classe, {
  foreignKey: 'classeId',
  as: 'classe'
});

db.Eleve.hasMany(db.Soumission, {
  foreignKey: 'eleveId',
  as: 'soumissions',
  onDelete: 'CASCADE'
});
db.Soumission.belongsTo(db.Eleve, {
  foreignKey: 'eleveId',
  as: 'eleve'
});

db.Devoir.hasMany(db.Soumission, {
  foreignKey: 'devoirId',
  as: 'soumissions',
  onDelete: 'CASCADE'
});
db.Soumission.belongsTo(db.Devoir, {
  foreignKey: 'devoirId',
  as: 'devoir'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
