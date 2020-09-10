'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Creditor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Creditor.belongsTo(models.CompanyRecord, { as: 'company', foreignKey: 'companyId' });
    }
  };
  Creditor.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    creditorName: {type: DataTypes.STRING,allowNull: false},
    creditorPhone: {type: DataTypes.STRING,allowNull: false},
    creditDescription: {type: DataTypes.TEXT,allowNull: true},
    creditAmount: {type: DataTypes.DECIMAL(15, 2) ,allowNull: true},
    creditDate: {type: DataTypes.DATEONLY,allowNull: true},
    creditTime: {type: DataTypes.STRING,allowNull: true},
    creditActive: {type: DataTypes.BOOLEAN,defaultValue:true},
    companyId: {type: DataTypes.INTEGER,allowNull: false},
    regBy: {type: DataTypes.INTEGER,allowNull: false},
    updatedBy: {type: DataTypes.INTEGER,allowNull: false},
    createdAt: {allowNull: false,type: DataTypes.DATE},
    updatedAt: {allowNull: false,type: DataTypes.DATE},
  }, {
    sequelize,
    modelName: 'Creditor',
    tableName: "Creditors",
    timestamps:true,
  });
  return Creditor;
};