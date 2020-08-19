'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    static associate(models) {
      Supplier.belongsTo(models.CompanyRecord, { as: 'company', foreignKey: 'companyId' });
    }
  };
  Supplier.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    supplierName: {type: DataTypes.STRING,allowNull: false},
    supplierAddress: {type: DataTypes.TEXT,allowNull: false},
    supplierPhone: {type: DataTypes.STRING,allowNull: false},
    supplierState: {type: DataTypes.STRING,allowNull: false},
    supplierLocalGov: {type: DataTypes.STRING,allowNull: false},
    supplierEmail: {type: DataTypes.STRING,allowNull: true},
    supplierActive: {type: DataTypes.BOOLEAN,defaultValue:true},
    companyId: {type: DataTypes.INTEGER,allowNull: false},
    regBy: {type: DataTypes.INTEGER,allowNull: false},
    updatedBy: {type: DataTypes.INTEGER,allowNull: false},
  }, {
    sequelize,
    modelName: 'Supplier',
    tableName: "Suppliers",
    timestamps:true,
  });
  return Supplier;
};