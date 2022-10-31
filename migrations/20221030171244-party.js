"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Parties", {
      partyId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ottService: {
        type: Sequelize.STRING,
      },
      numOfMembers: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      ID: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      hasLeader: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Parties");
  },
};
