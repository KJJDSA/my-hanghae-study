'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bankcard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bankcard.init({
    userId: DataTypes.INTEGER,
    bank: DataTypes.STRING,
    card: DataTypes.STRING,
    MMYY: DataTypes.STRING,
    birth: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bankcard',
  });
  return bankcard;
};