'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Suppliers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      supplierName: {type: Sequelize.STRING,allowNull: false},
      supplierAddress: {type: Sequelize.TEXT,allowNull: false},
      supplierPhone: {type: Sequelize.STRING(15),allowNull: false},
      supplierState: {type: Sequelize.STRING(100),allowNull: false},
      supplierLocalGov: {type: Sequelize.STRING(100),allowNull: false},
      supplierEmail: {type: Sequelize.STRING(150),allowNull: true},
      supplierActive: {type: Sequelize.BOOLEAN,defaultValue:true},
      companyId: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyRecords'},key: 'id'},allowNull: false},
      regBy: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyUsers'},key: 'id'},allowNull: false},
      updatedBy: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyUsers'},key: 'id'},allowNull: false},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE},
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Suppliers');
  }
};