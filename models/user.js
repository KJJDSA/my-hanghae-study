"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.BankAccount, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
      Users.hasMany(models.BankCard, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
      Users.hasMany(models.Member, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
    }
  }
  Users.init({
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    kakaoId: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return Users;
};
