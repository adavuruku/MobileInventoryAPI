'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCosting extends Model {
    static associate(models) {
      // example - (Retail, WholeSale, Rental) - wholesale cp - 20 , sp - 25
      ProductCosting.belongsTo(models.CompanyRecord, { as: 'company', foreignKey: 'companyId' });
      ProductCosting.belongsTo(models.SellingType, { as: 'sellingType', foreignKey: 'sellingTypeId' });
      ProductCosting.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' });
    }
  };
  ProductCosting.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    costPrice: {type: DataTypes.DECIMAL(15, 2) ,allowNull: false},
    sellingPrice: {type: DataTypes.DECIMAL(15, 2) ,allowNull: false},
    sellingTypeId: {type: DataTypes.INTEGER,allowNull: false},
    productId: {type: DataTypes.INTEGER,allowNull: false},
    companyId: {type: DataTypes.INTEGER,allowNull: false},
    regBy: {type: DataTypes.INTEGER,allowNull: false},
    updatedBy: {type: DataTypes.INTEGER,allowNull: false},
    createdAt: {allowNull: false,type: DataTypes.DATE},
    updatedAt: {allowNull: false,type: DataTypes.DATE},
  }, {
    sequelize,
    modelName: 'ProductCosting',
  });
  return ProductCosting;
};