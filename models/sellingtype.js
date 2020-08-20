'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SellingType extends Model {
    static associate(models) {
      // example - (Retail, WholeSale, Rental)
      SellingType.belongsTo(models.CompanyRecord, { as: 'company', foreignKey: 'companyId' });
      SellingType.hasMany(models.ProductCosting,{
        foreignKey : 'sellingTypeId',
        as : 'productcost'
      });
    }
  };
  SellingType.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    sellingType: {type: DataTypes.STRING,allowNull: false},
    isActive: {type: DataTypes.BOOLEAN,defaultValue:true},
    companyId: {type: DataTypes.INTEGER,allowNull: false},
    regBy: {type: DataTypes.INTEGER,allowNull: false},
    updatedBy: {type: DataTypes.INTEGER,allowNull: false},
    createdAt: {allowNull: false,type: DataTypes.DATE},
    updatedAt: {allowNull: false,type: DataTypes.DATE}
  }, {
    sequelize,
    modelName: 'SellingType',
    tableName: 'SellingTypes',
    timestamps:true,
  });
  return SellingType;
};