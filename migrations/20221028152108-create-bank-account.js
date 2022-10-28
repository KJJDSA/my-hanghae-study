'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bankAccounts', {
      bankaccountId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      bank: {
        type: Sequelize.STRING
      },
      account: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bankAccounts');
  }
};