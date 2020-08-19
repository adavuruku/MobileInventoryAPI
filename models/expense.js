'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      Expense.belongsTo(models.CompanyRecord, { as: 'company', foreignKey: 'companyId' });
    }
  };
  Expense.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    expenseName: {type: DataTypes.STRING,allowNull: false},
    expenseDescription: {type: DataTypes.TEXT,allowNull: true},
    expenseAmount: {type: DataTypes.DECIMAL(15, 2) ,allowNull: true},
    expenseDate: {type: DataTypes.DATEONLY,allowNull: true},
    expenseTime: {type: DataTypes.STRING,allowNull: true},
    expenseActive: {type: DataTypes.BOOLEAN,defaultValue:true},
    companyId: {type: DataTypes.INTEGER,allowNull: false},
    regBy: {type: DataTypes.INTEGER,allowNull: false},
    updatedBy: {type: DataTypes.INTEGER,allowNull: false},
    createdAt: {allowNull: false,type: DataTypes.DATE},
    updatedAt: {allowNull: false,type: DataTypes.DATE},
  }, {
    sequelize,
    modelName: 'Expense',
    tableName: "Expenses",
    timestamps:true,
  });
  return Expense;
};