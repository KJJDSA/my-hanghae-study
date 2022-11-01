"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BankCards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BankCards.belongsTo(models.Users, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
    }
  }
  BankCards.init(
    {
      bankcardId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: DataTypes.INTEGER,
      bank: DataTypes.STRING,
      card: DataTypes.STRING,
      MMYY: DataTypes.STRING,
      birth: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BankCards",
    }
  );

  // bankcard.associate = models => {

  //   /**
  //    * CompanyInformation안에 있는 "id값"을 "company_id라는 컬럼 이름"으로 Users모델에 새로운 컬럼으로 추가한다.
  //    */
  //   bankcard.hasMany(models.User, {foreignKey : "userId", sourceKey:"userId"});
  // };
  return BankCards;
};
