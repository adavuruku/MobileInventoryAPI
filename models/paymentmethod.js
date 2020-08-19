'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    // PayPal, Cash, Transfer, pos
    static associate(models) {
      PaymentMethod.belongsTo(models.CompanyRecord, { as: 'company', foreignKey: 'companyId' });
    }
  };
  PaymentMethod.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    payType: {type: DataTypes.STRING,allowNull: false},
    isActive: {type: DataTypes.BOOLEAN,defaultValue:true},
    companyId: {type: DataTypes.INTEGER,allowNull: false},
    regBy: {type: DataTypes.INTEGER,allowNull: false},
    updatedBy: {type: DataTypes.INTEGER,allowNull: false},
    createdAt: {allowNull: false,type: DataTypes.DATE},
    updatedAt: {allowNull: false,type: DataTypes.DATE}
  }, {
    sequelize,
    tableName: 'PaymentMethods',
    timestamps:true,
    modelName: 'PaymentMethod'
  });
  return PaymentMethod;
};