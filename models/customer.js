'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const toRupiah = require('../helper/toRupiah')
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
      Customer.belongsToMany(models.Food, {through: models.Order, foreignKey: 'FoodId'})
      Customer.hasMany(models.Order)
    }

    currency() {
      return toRupiah(this.money)
    }
  };
  Customer.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'name is require !'
        }
      }
    },
    
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'please enter your username!'
        }
      }
    },

    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'password is required !'
        }
      }
    },
  
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'please enter your valid email address !'
        }
      }
    },

    money: {
      type:  DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'please enter valid number !'
        }
      }
    }
   
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: 'Customers'
  });

  Customer.beforeCreate((newCustomer)=>{
    let hash = bcrypt.hashSync(newCustomer.password, salt);
    newCustomer.password = hash
  })
  return Customer;
};