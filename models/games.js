'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Games.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    appId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    review_score: DataTypes.INTEGER,
    review_score_desc: DataTypes.INTEGER,
    total_postive: DataTypes.INTEGER,
    total_negative: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Games',
  });
  return Games;
};