'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productName: {type: Sequelize.STRING,allowNull: false},
      productCode: {type: Sequelize.STRING,allowNull: false},
      productImage: {type: Sequelize.TEXT,allowNull: true},
      productDescription: {type: Sequelize.TEXT,allowNull: true},
      totalStock: {type: Sequelize.DECIMAL(10, 2) ,allowNull: false},
      reorderLevel: {type: Sequelize.DECIMAL(10, 2) ,allowNull: false},
      productActive: {type: Sequelize.BOOLEAN,defaultValue:true},
      measureTypeId: {type: Sequelize.INTEGER,references: {model: {tableName: 'MeasureTypes'},key: 'id'},allowNull: false},
      companyId: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyRecords'},key: 'id'},allowNull: false},
      regBy: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyUsers'},key: 'id'},allowNull: false},
      updatedBy: {type: Sequelize.INTEGER,references: {model: {tableName: 'CompanyUsers'},key: 'id'},allowNull: false},
      createdAt: {allowNull: false,type: Sequelize.DATE},
      updatedAt: {allowNull: false,type: Sequelize.DATE},
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};