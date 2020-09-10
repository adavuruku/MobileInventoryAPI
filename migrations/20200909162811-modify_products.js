'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
        'Products',
        'costPrice',Sequelize.DECIMAL(15, 2),{allowNull: false}
      ),
      await queryInterface.addColumn(
        'Products',
        'sellingPrice',Sequelize.DECIMAL(15, 2) ,{allowNull: false}
      ),
      await queryInterface.addColumn(
        'Products',
        'sellingTypeId',Sequelize.INTEGER,{allowNull: false}
      ),
      await queryInterface.addConstraint(
        'Products',
        {
          fields:['sellingTypeId'],
          type:'foreign key',
          references: {
            table: 'SellingTypes',
            field: 'id'
          }
        }
      )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products','costPrice'),
    await queryInterface.removeColumn('Products','sellingPrice'),
    await queryInterface.removeColumn('Products','sellingTypeId'),
    await queryInterface.removeColumn('Products','measureTypeId')
  }
};
