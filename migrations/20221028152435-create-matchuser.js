'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matchusers', {
      matchuserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      matchroomId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'matchrooms', // Users 모델에서
          key: 'matchroomId', // 그 아이디 값을 참고합니다.
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Users 모델에서
          key: 'userId', // 그 아이디 값을 참고합니다.
        }
      },
      isLeader: {
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
    await queryInterface.dropTable('matchusers');
  }
};