'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Creditors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      creditorName: {type: Sequelize.STRING,allowNull: false},
      creditorPhone: {type: Sequelize.STRING,allowNull: false},
      creditDescription: {type: Sequelize.TEXT,allowNull: true},
      creditAmount: {type: Sequelize.DECIMAL(15, 2) ,allowNull: true},
      creditDate: {type: Sequelize.DATEONLY,allowNull: true},
      creditTime: {type: Sequelize.STRING,allowNull: true},
      creditActive: {type: Sequelize.BOOLEAN,defaultValue:true},
      companyId: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyRecords'},key: 'id'},allowNull: false},
      regBy: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyUsers'},key: 'id'},allowNull: false},
      updatedBy: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyUsers'},key: 'id'},allowNull: false},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE},
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Creditors');
  }
};