'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Metascores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Metascores.belongsTo(models.Games, {
        foreignKey: "appid",
        sourceKey: "appid",
      });
    }
  }
  Metascores.init({
    appid: DataTypes.INTEGER,
    metacritic_name: DataTypes.STRING,
    platform: DataTypes.STRING,
    release_date: DataTypes.STRING,
    summary: DataTypes.TEXT,
    meta_score: DataTypes.INTEGER,
    user_review: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Metascores',
  });
  return Metascores;
};