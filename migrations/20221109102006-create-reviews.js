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
        type: Sequelize.INTEGER
      },
      steamid: {
        type: Sequelize.STRING
      },
      playtime_at_review: {
        type: Sequelize.INTEGER
      },
      recommendationid: {
        type: Sequelize.INTEGER
      },
      language: {
        type: Sequelize.STRING
      },
      review: {
        type: Sequelize.TEXT
      },
      timestamp_updated: {
        type: Sequelize.DATE
      },
      voted_up: {
        type: Sequelize.BOOLEAN
      },
      votes_up: {
        type: Sequelize.INTEGER
      },
      votes_funny: {
        type: Sequelize.INTEGER
      },
      weigthed_vote_score: {
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