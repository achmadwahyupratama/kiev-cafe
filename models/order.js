'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Customer, {foreignKey: "CustomerId"})
      this.belongsTo(models.Food, {foreignKey: "FoodId"})
    }

    
  };
  Order.init({
    CustomerId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};