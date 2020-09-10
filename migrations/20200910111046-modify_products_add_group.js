'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Products',
      'groupTitleId',Sequelize.INTEGER,{allowNull: false}
    ),
    await queryInterface.addConstraint(
      'Products',
      {
        fields:['groupTitleId'],
        type:'foreign key',
        references: {
          table: 'ProductGroups',
          field: 'id'
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products','groupTitleId')
  }
};
