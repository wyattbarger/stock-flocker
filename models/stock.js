const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Stock extends Model {}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    ticker: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    company: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    currentPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    comments: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      refrences: {
        model: "comment",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "stock",
  }
);

module.exports = Stock;
