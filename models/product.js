'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
      Product.belongsTo(models.CompanyRecord, { as: 'company', foreignKey: 'companyId' });
      Product.belongsTo(models.MeasureType, { as: 'measure', foreignKey: 'measureTypeId' });
      Product.belongsTo(models.SellingType, { as: 'sellingType', foreignKey: 'sellingTypeId' });
      Product.belongsTo(models.ProductGroup, { as: 'group', foreignKey: 'groupTitleId' });
      Product.hasMany(models.ProductCosting,{
        foreignKey : 'productId',
        as : 'productcost'
      });
    }
  };
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productName: {type: DataTypes.STRING,allowNull: false},
    productCode: {type: DataTypes.STRING,allowNull: false},
    productImage: {type: DataTypes.TEXT,allowNull: true},
    productDescription: {type: DataTypes.TEXT,allowNull: true},
    totalStock: {type: DataTypes.DECIMAL(10, 2) ,allowNull: false},
    reorderLevel: {type: DataTypes.DECIMAL(10, 2) ,allowNull: false},
    productActive: {type: DataTypes.BOOLEAN,defaultValue:true},
    measureTypeId: {type: DataTypes.INTEGER,allowNull: false},

    sellingTypeId: {type: DataTypes.INTEGER,allowNull: false},
    groupTitleId: {type: DataTypes.INTEGER,allowNull: false},
    costPrice: {type: DataTypes.DECIMAL(10, 2),allowNull: false},
    sellingPrice: {type: DataTypes.DECIMAL(10, 2),allowNull: false},

    companyId: {type: DataTypes.INTEGER,allowNull: false},
    regBy: {type: DataTypes.INTEGER,allowNull: false},
    updatedBy: {type: DataTypes.INTEGER,allowNull: false},
    createdAt: {allowNull: false,type: DataTypes.DATE},
    updatedAt: {allowNull: false,type: DataTypes.DATE},
  }, {
    sequelize,
    tableName: 'Products',
    timestamps:true,
    modelName: 'Product'
  });
  return Product;
};