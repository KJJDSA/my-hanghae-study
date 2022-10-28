'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class matchroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  matchroom.init({
    ottService: DataTypes.STRING,
    ID: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'matchroom',
  });
  return matchroom;
};