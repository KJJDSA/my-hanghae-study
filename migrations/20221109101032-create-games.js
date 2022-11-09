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
      appId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      review_score: {
        type: Sequelize.INTEGER
      },
      review_score_desc: {
        type: Sequelize.INTEGER
      },
      total_postive: {
        type: Sequelize.INTEGER
      },
      total_negative: {
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