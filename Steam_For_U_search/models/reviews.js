'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reviews.belongsTo(models.Games, {
        foreignKey: "appid",
        sourceKey: "appid",
      });

    }
  }
  Reviews.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    appid: DataTypes.INTEGER,
    steamid: DataTypes.STRING,
    playtime_at_review: DataTypes.DOUBLE,
    recommendationid: DataTypes.DOUBLE,
    language: DataTypes.STRING,
    review: DataTypes.STRING(8000),
    timestamp_updated: DataTypes.STRING,
    voted_up: DataTypes.BOOLEAN,
    votes_up: DataTypes.DOUBLE,
    votes_funny: DataTypes.DOUBLE,
    weighted_vote_score: DataTypes.STRING,
    written_during_early_access: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};