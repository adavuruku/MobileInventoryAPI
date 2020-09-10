'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Debtors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      debtorName: {type: Sequelize.STRING,allowNull: false},
      debtorPhone: {type: Sequelize.STRING,allowNull: false},
      debtDescription: {type: Sequelize.TEXT,allowNull: true},
      debtAmount: {type: Sequelize.DECIMAL(15, 2) ,allowNull: true},
      debtDate: {type: Sequelize.DATEONLY,allowNull: true},
      debtTime: {type: Sequelize.STRING,allowNull: true},
      debtActive: {type: Sequelize.BOOLEAN,defaultValue:true},
      companyId: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyRecords'},key: 'id'},allowNull: false},
      regBy: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyUsers'},key: 'id'},allowNull: false},
      updatedBy: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyUsers'},key: 'id'},allowNull: false},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE},
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Debtors');
  }
};