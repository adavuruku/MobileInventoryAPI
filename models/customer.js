'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // define association here
      Customer.belongsTo(models.CompanyRecord, { as: 'company', foreignKey: 'companyId' });
    }
  };
  Customer.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    customerName: {type: DataTypes.STRING,allowNull: false},
    customerAddress: {type: DataTypes.TEXT,allowNull: true},
    customerPhone: {type: DataTypes.STRING,allowNull: true},
    customerEmail: {type: DataTypes.STRING,allowNull: true},
    customerActive: {type: DataTypes.BOOLEAN,defaultValue:true},
    companyId: {type: DataTypes.INTEGER,allowNull: false},
    regBy: {type: DataTypes.INTEGER,allowNull: false},
    updatedBy: {type: DataTypes.INTEGER,allowNull: false},
    createdAt: {allowNull: false,type: DataTypes.DATE},
    updatedAt: {allowNull: false,type: DataTypes.DATE}
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: "Customers",
    timestamps:true,
  });
  return Customer;
};