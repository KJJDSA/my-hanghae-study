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
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      kakaoId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  // User.associate = models => {
  //   /**
  //    *  Users모델 안에 "company_id라는 컬럼 이름"으로 CompanyInformation모델에 있는 "id값"을 새로운 컬럼으로 추가한다.
  //    */
  //   User.belongsTo(models.bankaccount, { foreignKey: "userId", sourceKey: "userId" });
  //   User.belongsTo(models.bankcard, { foreignKey: "userId", sourceKey: "userId" });
  //   User.belongsTo(models.matchuser, { foreignKey: "userId", sourceKey: "userId" });

  // };
  return Users;
};
