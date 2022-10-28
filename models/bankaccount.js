'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bankaccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bankaccount.hasMany(models.User, { foreignKey: "userId", sourceKey: "userId" });
    }
  }
  bankaccount.init({
    userId: DataTypes.INTEGER,
    bank: DataTypes.STRING,
    account: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bankaccount',
  });

  // bankaccount.associate = models => {

  //   /**
  //    * CompanyInformation안에 있는 "id값"을 "company_id라는 컬럼 이름"으로 Users모델에 새로운 컬럼으로 추가한다.
  //    */
  //   bankaccount.hasMany(models.User, { foreignKey: "userId", sourceKey: "userId" });
  // };
  return bankaccount;
};