'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class matchuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      matchuser.hasMany(models.User, { foreignKey: "userId", sourceKey: "userId" });
      matchuser.hasMany(models.matchroom, { foreignKey: "matchroomId", sourceKey: "matchroomId" });
    }
  }
  matchuser.init({
    matchroomId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isLeader: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'matchuser',
  });

  // matchuser.associate = models => {
  //   /**
  //    * CompanyInformation안에 있는 "id값"을 "company_id라는 컬럼 이름"으로 Users모델에 새로운 컬럼으로 추가한다.
  //    */
  //   matchuser.hasMany(models.User, { foreignKey: "userId", sourceKey: "userId" });
  //   matchuser.hasMany(models.matchroom, { foreignKey: "matchroomId", sourceKey: "matchroomId" });
  // };
  return matchuser;
};