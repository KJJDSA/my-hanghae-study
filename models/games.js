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
      Games.hasMany(models.Reviews, {
        foreignKey: "appid",
        sourceKey: "appid",
      });
      Games.hasMany(models.Metascores, {
        foreignKey: "appid",
        sourceKey: "appid",
      });
    }
  }
  Games.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    appid: {
      unique: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    review_score: DataTypes.INTEGER,
    review_score_desc: DataTypes.STRING,
    total_positive: DataTypes.INTEGER,
    total_negative: DataTypes.INTEGER,
    img_url: DataTypes.STRING(1000)
  }, {
    sequelize,
    modelName: 'Games',
  });
  return Games;
};