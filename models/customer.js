'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Food, {through: models.Order})
      Customer.hasMany(models.Order)
    }
  };
  Customer.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    money: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Customer',
  });

  Customer.beforeCreate((newCustomer)=>{
    let hash = bcrypt.hashSync(newCustomer.password, salt);
    newCustomer.password = hash
  })
  return Customer;
};