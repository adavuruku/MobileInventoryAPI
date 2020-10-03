'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OtherIncomes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      incomeName: {type: Sequelize.STRING,allowNull: false},
      incomeDescription: {type: Sequelize.TEXT,allowNull: true},
      incomeAmount: {type: Sequelize.DECIMAL(15, 2) ,allowNull: true},
      incomeDate: {type: Sequelize.DATEONLY,allowNull: true},
      incomeTime: {type: Sequelize.STRING,allowNull: true},
      incomeActive: {type: Sequelize.BOOLEAN,defaultValue:true},
      companyId: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyRecords'},key: 'id'},allowNull: false},
      regBy: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyUsers'},key: 'id'},allowNull: false},
      updatedBy: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyUsers'},key: 'id'},allowNull: false},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE},
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OtherIncomes');
  }
};