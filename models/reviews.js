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
      // define association here
    }
  }
  Reviews.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    appid: DataTypes.INTEGER,
    steamid: DataTypes.STRING,
    playtime_at_review: DataTypes.INTEGER,
    recommendationid: DataTypes.INTEGER,
    language: DataTypes.STRING,
    review: DataTypes.TEXT,
    timestamp_updated: DataTypes.DATE,
    voted_up: DataTypes.BOOLEAN,
    votes_up: DataTypes.INTEGER,
    votes_funny: DataTypes.INTEGER,
    weigthed_vote_score: DataTypes.STRING,
    written_during_early_access: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};