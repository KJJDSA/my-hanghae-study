"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BankCards", {
      bankCardId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users", // Users 모델에서
          key: "userId", // 그 아이디 값을 참고합니다.
        },
      },
      bank: {
        type: Sequelize.STRING,
      },
      card: {
        type: Sequelize.STRING,
      },
      MMYY: {
        type: Sequelize.STRING,
      },
      birth: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("BankÇards");
  },
};
