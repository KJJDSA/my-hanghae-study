'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      appid: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      name: {
        type: Sequelize.STRING
      },
      review_score: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      review_score_desc: {
        allowNull: true,
        type: Sequelize.STRING
      },
      total_positive: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      total_negative: {
        allowNull: true,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Games');
  }
};