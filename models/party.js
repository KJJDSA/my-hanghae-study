"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Parties.hasMany(models.Members, {
        foreignKey: "partyId",
        sourceKey: "partyId",
      });
    }
  }
  Parties.init(
    {
      partyId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      ottService: DataTypes.STRING,
      numOfMembers: DataTypes.INTEGER,
      ID: DataTypes.STRING,
      password: DataTypes.STRING,
      hasLeader: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Parties",
    }
  );

  // matchroom.associate = models => {
  //   /**
  //    *  Users모델 안에 "company_id라는 컬럼 이름"으로 CompanyInformation모델에 있는 "id값"을 새로운 컬럼으로 추가한다.
  //    */
  //   matchroom.belongsTo(models.matchuser, { foreignKey: "matchroomId", sourceKey: "matchroomId" });

  // };
  return Parties;
};
