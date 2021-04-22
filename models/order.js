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

    static addToList(CustomerId, FoodId) {
      Order.findOne({where: {CustomerId: CustomerId, FoodId: FoodId}})
        .then(data => {
          if (!data) {
            return Order.create({CustomerId: CustomerId, FoodId: FoodId, orderedQty: 1})
          } else {
            return Order.update({orderedQty: data.orderedQty + 1}, {where: {CustomerId: CustomerId, FoodId: FoodId}})
          }
        })
        .catch(err => {
          throw err
        })
    }
  };
  Order.init({
    CustomerId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    orderedQty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders'
  });
  Order.beforeCreate((instance)=>{
    instance.date= new Date()
  })
  return Order;
};