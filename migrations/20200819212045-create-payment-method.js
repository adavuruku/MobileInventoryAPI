'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PaymentMethods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      payType: {type: Sequelize.STRING,allowNull: false},
      isActive: {type: Sequelize.BOOLEAN,defaultValue:true},
      companyId: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyRecords'},key: 'id'},allowNull: false},
      regBy: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyUsers'},key: 'id'},allowNull: false},
      updatedBy: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyUsers'},key: 'id'},allowNull: false},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE},
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PaymentMethods');
  }
};