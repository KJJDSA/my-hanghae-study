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
      Users.hasMany(models.BankAccounts, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
      Users.hasMany(models.BankCards, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
      Users.hasMany(models.Members, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      kakaoId: DataTypes.STRING,
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
