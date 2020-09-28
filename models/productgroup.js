'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductGroup.belongsTo(models.CompanyRecord, { as: 'company', foreignKey: 'companyId' });
      ProductGroup.hasMany(models.Product,{
        foreignKey : 'groupTitleId',
        as : 'products'
      });
    }
  };
  ProductGroup.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    groupTitle: {type: DataTypes.STRING,allowNull: false},
    isActive: {type: DataTypes.BOOLEAN,defaultValue:true},
    companyId: {type: DataTypes.INTEGER,allowNull: false},
    regBy: {type: DataTypes.INTEGER,allowNull: false},
    updatedBy: {type: DataTypes.INTEGER,allowNull: false},
    createdAt: {allowNull: false,type: DataTypes.DATE},
    updatedAt: {allowNull: false,type: DataTypes.DATE}
  }, {
    sequelize,
    modelName: 'ProductGroup',
    tableName: 'ProductGroups',
    timestamps:true,
  });
  return ProductGroup;
};