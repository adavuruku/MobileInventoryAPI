'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeasureType extends Model {
    static associate(models) {
      // bad, cup, carton, mudu, pack, kg, g, plate
      MeasureType.belongsTo(models.CompanyRecord, { as: 'company', foreignKey: 'companyId' });
      MeasureType.hasMany(models.Product,{
        foreignKey : 'measureTypeId',
        as : 'product'
      });
    }
  };
  MeasureType.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    measureType: {type: DataTypes.STRING,allowNull: false},
    isActive: {type: DataTypes.BOOLEAN,defaultValue:true},
    companyId: {type: DataTypes.INTEGER,allowNull: false},
    regBy: {type: DataTypes.INTEGER,allowNull: false},
    updatedBy: {type: DataTypes.INTEGER,allowNull: false},
    createdAt: {allowNull: false,type: DataTypes.DATE},
    updatedAt: {allowNull: false,type: DataTypes.DATE}
  }, {
    sequelize,
    tableName: 'MeasureTypes',
    timestamps:true,
    modelName: 'MeasureType'
  });
  return MeasureType;
};