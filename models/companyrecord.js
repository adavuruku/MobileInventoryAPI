'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CompanyRecord.hasMany(models.CompanyUser,{
          foreignKey : 'companyId',
          as : 'users'
      });
      CompanyRecord.hasMany(models.Supplier,{
        foreignKey : 'companyId',
        as : 'supplier'
      });
      CompanyRecord.hasMany(models.Customer,{
        foreignKey : 'companyId',
        as : 'customer'
      });
    }
  };
  CompanyRecord.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    companyName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    companyAddress: {
      allowNull: false,
      type: DataTypes.STRING
    },
    companyPhone: {
      allowNull: false,
      type: DataTypes.STRING,
      unique:true
    },
    companyEmail: {
      allowNull: false,
      type: DataTypes.STRING,
      unique:true,
      isEmail: true
    },
    companyState: {
      allowNull: false,
      type: DataTypes.STRING
    },
    companyLocalGov: {
      allowNull: false,
      type: DataTypes.STRING
    },
    companyActive: {
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    tableName: "CompanyRecords",
    timestamps:true,
    modelName: 'CompanyRecord'
  });
  return CompanyRecord;
};