'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersRight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UsersRight.belongsTo(models.CompanyUser, { as: 'user', foreignKey: 'userId' });
    }
  };
  UsersRight.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    pos: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    suppliers: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    customers: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    expense: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    debtors: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    adduser: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    creditors: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    reports: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    products: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    settings: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    regBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UsersRight',
    tableName: "UsersRights",
    timestamps:true,
  });
  return UsersRight;
};