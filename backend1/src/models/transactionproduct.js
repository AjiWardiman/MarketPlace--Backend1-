'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactionProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.transactionProduct.belongsTo(models.transactions, {
      //   foreignKey: 'transactions_id', as: "id_transactions"
      // })
      // models.transactionProduct.belongsTo(models.product, {
      //   foreignKey: 'product_id', as: "id_product"
      // })
    }
  }
  transactionProduct.init({
    transactions_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transactionProduct',
  });
  return transactionProduct;
};