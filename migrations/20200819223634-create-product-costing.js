'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductCostings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      costPrice: {type: Sequelize.DECIMAL(15, 2) ,allowNull: false},
      sellingPrice: {type: Sequelize.DECIMAL(15, 2) ,allowNull: false},
      
      sellingTypeId: {type: Sequelize.INTEGER,references: {model: {tableName: 'SellingTypes'},key: 'id'},allowNull: false},
      productId: {type: Sequelize.INTEGER,references: {model: {tableName: 'Products'},key: 'id'},allowNull: false},
      
      companyId: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyRecords'},key: 'id'},allowNull: false},
      regBy: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyUsers'},key: 'id'},allowNull: false},
      updatedBy: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyUsers'},key: 'id'},allowNull: false},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE},
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProductCostings');
  }
};