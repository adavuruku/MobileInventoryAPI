'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CompanyUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userFullName: {type: Sequelize.STRING,allowNull: false},
      userAddress: {type: Sequelize.TEXT,allowNull: false},
      userPhone: {type: Sequelize.STRING(15),allowNull: false},
      userEmail: {type: Sequelize.STRING(150),allowNull: false},
      userPassword: {type: Sequelize.TEXT,allowNull: false},
      userActive: {type: Sequelize.BOOLEAN, defaultValue:true},
      changePassword: {type: Sequelize.BOOLEAN, defaultValue:false},
      userName: {
        type: Sequelize.STRING,
        unique:true,
        allowNull: false
      },
      companyId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'CompanyRecords'
          },
          key: 'id'
        },
        allowNull: false
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
    await queryInterface.dropTable('CompanyUsers');
  }
};