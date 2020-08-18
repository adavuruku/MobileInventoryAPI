'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CompanyRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      companyAddress: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      companyPhone: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(15)
      },
      companyEmail: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(150)
      },
      companyState: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      companyLocalGov: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      companyActive: {
        defaultValue: true,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CompanyRecords');
  }
};