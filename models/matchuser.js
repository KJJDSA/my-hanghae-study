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
      // define association here
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
  return matchuser;
};