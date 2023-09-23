const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class HistoricalPrice extends Model {}

HistoricalPrice.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  stock_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'stock',
      key: 'id',
    },
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  date: {  // Optional, in case you want to store the date of each price
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'historical_price',
});

module.exports = HistoricalPrice;
