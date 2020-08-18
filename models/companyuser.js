'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyUser extends Model {
    static associate(models) {
      CompanyUser.belongsTo(models.CompanyRecord, { as: 'company', foreignKey: 'companyId' });
      CompanyUser.hasOne(models.UsersRight,{
        foreignKey : 'userId',
        as : 'right'
      });
    }
  };
  CompanyUser.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userFullName: {type: DataTypes.STRING,allowNull: false},
    userAddress: {type: DataTypes.TEXT,allowNull: false},
    userPhone: {type: DataTypes.STRING(15),allowNull: false},
    userEmail: {type: DataTypes.STRING(150),allowNull: false},
    userPassword: {type: DataTypes.TEXT,allowNull: false},
    userActive: {type: DataTypes.BOOLEAN, defaultValue:true},
    changePassword: {type: DataTypes.BOOLEAN, defaultValue:false},
    userName: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CompanyUser',
    tableName: "CompanyUsers",
    timestamps:true
  });
  return CompanyUser;
};