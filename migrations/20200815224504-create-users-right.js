'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UsersRights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pos: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      suppliers: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      customers: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      expense: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      debtors: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      creditors: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      reports: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      products: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      adduser: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      settings: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'CompanyUsers'
          },
          key: 'id'
        },
        allowNull: false
      },
      regBy: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'CompanyUsers'
          },
          key: 'id'
        },
        allowNull: false
      },
      updatedBy: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'CompanyUsers'
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
    await queryInterface.dropTable('UsersRights');
  }
};