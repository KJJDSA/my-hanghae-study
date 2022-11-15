'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Metascores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      appid: {
        type: Sequelize.INTEGER,
        references: {
          model: "Games", // Users 모델에서
          key: "appid", // 그 아이디 값을 참고합니다.
        },
      },
      name: {
        type: Sequelize.STRING
      },
      platform: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.STRING
      },
      summary: {
        type: Sequelize.TEXT
      },
      meta_score: {
        type: Sequelize.INTEGER
      },
      user_review: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Metascores');
  }
};