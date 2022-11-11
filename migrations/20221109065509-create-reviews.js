'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
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
      steamid: {
        type: Sequelize.STRING,
      },
      playtime_at_review: {
        type: Sequelize.INTEGER
      },
      recommendationid: {
        type: Sequelize.DOUBLE                      
      },
      language: {
        type: Sequelize.STRING
      },
      review: {
        type: Sequelize.STRING(8000)
      },
      timestamp_updated: {
        type: Sequelize.STRING
      },
      voted_up: {
        type: Sequelize.BOOLEAN
      },
      votes_up: {
        type: Sequelize.DOUBLE                      
      },
      votes_funny: {
        type: Sequelize.DOUBLE                      
      },
      weighted_vote_score: {
        type: Sequelize.STRING
      },
      written_during_early_access: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Reviews');
  }
};