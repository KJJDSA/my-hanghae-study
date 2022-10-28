'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bankAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bankAccount.init({
    userId: DataTypes.INTEGER,
    bank: DataTypes.STRING,
    account: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bankAccount',
  });
  return bankAccount;
};