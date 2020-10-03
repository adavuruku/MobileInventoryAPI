'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OtherIncome extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OtherIncome.belongsTo(models.CompanyRecord, { as: 'otherincome', foreignKey: 'companyId' });
    }
  };
  OtherIncome.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    incomeName: {type: DataTypes.STRING,allowNull: false},
    incomeDescription: {type: DataTypes.TEXT,allowNull: true},
    incomeAmount: {type: DataTypes.DECIMAL(15, 2) ,allowNull: true},
    incomeDate: {type: DataTypes.DATEONLY,allowNull: true},
    incomeTime: {type: DataTypes.STRING,allowNull: true},
    incomeActive: {type: DataTypes.BOOLEAN,defaultValue:true},
    companyId: {type: DataTypes.INTEGER,allowNull: false},
    regBy: {type: DataTypes.INTEGER,allowNull: false},
    updatedBy: {type: DataTypes.INTEGER,allowNull: false},
    createdAt: {allowNull: false,type: DataTypes.DATE},
    updatedAt: {allowNull: false,type: DataTypes.DATE},
  }, {
    sequelize,
    modelName: 'OtherIncome',
    tableName: "OtherIncomes",
    timestamps:true,
  });
  return OtherIncome;
};