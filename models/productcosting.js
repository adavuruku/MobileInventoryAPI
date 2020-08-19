'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCosting extends Model {
    static associate(models) {
      // example - (Retail, WholeSale, Rental) - wholesale cp - 20 , sp - 25
      ProductCosting.belongsTo(models.CompanyRecord, { as: 'company', foreignKey: 'companyId' });
      ProductCosting.belongsTo(models.SellingType, { as: 'sellingType', foreignKey: 'sellingType' });
      ProductCosting.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' });
    }
  };
  ProductCosting.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    costPrice: {type: Sequelize.DECIMAL(15, 2) ,allowNull: false},
    sellingPrice: {type: Sequelize.DECIMAL(15, 2) ,allowNull: false},
    sellingType: {type: Sequelize.INTEGER,allowNull: false},
    productId: {type: Sequelize.INTEGER,allowNull: false},
    companyId: {type: Sequelize.INTEGER,allowNull: false},
    regBy: {type: Sequelize.INTEGER,allowNull: false},
    updatedBy: {type: Sequelize.INTEGER,allowNull: false},
    createdAt: {allowNull: false,type: Sequelize.DATE},
    updatedAt: {allowNull: false,type: Sequelize.DATE},
  }, {
    sequelize,
    modelName: 'ProductCosting',
  });
  return ProductCosting;
};