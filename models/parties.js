'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Parties.init({
    partyId: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ottService: DataTypes.STRING,
    numOfMembers: DataTypes.INTEGER,
    ID: DataTypes.STRING,
    password: DataTypes.STRING,
    hasLeader: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Parties',
  });
  return Parties;
};