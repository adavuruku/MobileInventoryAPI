'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Debtor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Debtor.belongsTo(models.CompanyRecord, { as: 'company', foreignKey: 'companyId' });
    }
  };
  Debtor.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    debtorName: {type: DataTypes.STRING,allowNull: false},
    debtorPhone: {type: DataTypes.STRING,allowNull: false},
    debtDescription: {type: DataTypes.TEXT,allowNull: true},
    debtAmount: {type: DataTypes.DECIMAL(15, 2) ,allowNull: true},
    debtDate: {type: DataTypes.DATEONLY,allowNull: true},
    debtTime: {type: DataTypes.STRING,allowNull: true},
    debtActive: {type: DataTypes.BOOLEAN,defaultValue:true},
    companyId: {type: DataTypes.INTEGER,allowNull: false},
    regBy: {type: DataTypes.INTEGER,allowNull: false},
    updatedBy: {type: DataTypes.INTEGER,allowNull: false},
    createdAt: {allowNull: false,type: DataTypes.DATE},
    updatedAt: {allowNull: false,type: DataTypes.DATE},
  }, {
    sequelize,
    modelName: 'Debtor',
    tableName: "Debtors",
    timestamps:true,
  });
  return Debtor;
};