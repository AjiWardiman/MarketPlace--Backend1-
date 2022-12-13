'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.product.belongsTo(models.category, {
      //   foreignKey: 'category_id', as: "product"
      // })
      // models.product.belongsToMany(models.transactions, { 
      //   through: "transactionProducts",
      //   foreignKey: 'transactions_id', as: "id_transactions"
      // })
    }
  }
  product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};